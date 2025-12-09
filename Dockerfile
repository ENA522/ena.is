# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Accept build args from Railway
ARG DATABASE_URL
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG DISCORD_CLIENT_ID
ARG DISCORD_CLIENT_SECRET

# Install deps
COPY package.json package-lock.json* pnpm-lock.yaml* bun.lockb* ./
RUN if [ -f pnpm-lock.yaml ]; then corepack enable && corepack prepare pnpm@latest --activate && pnpm i --frozen-lockfile; \
    elif [ -f bun.lockb ]; then bun install --frozen-lockfile; \
    else npm ci; fi

# Copy Prisma schema BEFORE generating
COPY schema.prisma ./

# Generate Prisma client
RUN npx prisma generate

# Build
COPY . .
RUN if [ -f pnpm-lock.yaml ]; then pnpm build; \
    elif [ -f bun.lockb ]; then bun run build; \
    else npm run build; fi

# Set env vars from build args (with fallbacks)
ENV DATABASE_URL=${DATABASE_URL:-postgresql://build:build@localhost:5432/build}
ENV GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID:-build-placeholder}
ENV GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET:-build-placeholder}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID:-build-placeholder}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET:-build-placeholder}
ENV DISCORD_CLIENT_ID=${DISCORD_CLIENT_ID:-build-placeholder}
ENV DISCORD_CLIENT_SECRET=${DISCORD_CLIENT_SECRET:-build-placeholder}

# --- runtime stage ---
FROM node:20-alpine
# Nginx + PM2 + curl for healthcheck
RUN apk add --no-cache nginx curl gettext && npm i -g pm2

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV APP_PORT=3000

# Copy built app
COPY --from=build /app/build ./build
COPY package.json ./

# Install production deps for adapter-node output (often none, but safe)
RUN npm i --omit=dev || true

# Nginx + PM2 configs
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY ecosystem.config.cjs /app/ecosystem.config.cjs
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --retries=3 \
  CMD curl -fsS "http://127.0.0.1:${PORT}/" || exit 1

CMD ["/app/start.sh"]
