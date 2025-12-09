// api/message/+server.js
import { json } from "@sveltejs/kit";
import { db } from "$lib/db.js";
import { withApiLogger } from "$lib/apiLogger/withApiLogger.js";

/**
 * GET /api/message?messageId=xxx&channelId=xxx
 */
export const GET = withApiLogger(
    {
        index: {
            request: ["messageId", "channelId"],
            response: ["status"]
        }
    },
    async function GET({ url, locals, fetch }) {
        if (!locals.user)
            return json({ error: "Unauthorized" }, { status: 401 });

        const messageId = url.searchParams.get('messageId');
        const channelId = url.searchParams.get('channelId');

        if (!messageId)
            return json({ error: "Message ID is required" }, { status: 400 });

        // Get bound encrypted key
        const { rows } = await db.query(`
            SELECT ak.encrypted_key
            FROM enabot_api_keys b
            JOIN api_keys ak ON ak.key_hash = b.key_hash
            WHERE ak.user_id = $1
            LIMIT 1
        `, [locals.user.id]);

        if (!rows.length)
            return json({ error: "No API key bound to bot" }, { status: 403 });

        const encrypted = rows[0].encrypted_key.toString("base64");

        // Forward to bot API
        const apiUrl = channelId 
            ? `https://enabot-production.up.railway.app/message/${messageId}?channelId=${channelId}`
            : `https://enabot-production.up.railway.app/message/${messageId}`;

        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "x-api-key-encrypted": encrypted
            }
        });

        const data = await res.json();

        return json(data, { status: res.status });
    }
);

/**
 * POST /api/message
 * Body: { messageId, channelId?, content?, embeds? }
 */
export const POST = withApiLogger(
    {
        index: {
            request: ["messageId", "content", "embeds"],
            response: ["status"]
        }
    },
    async function POST({ request, locals, fetch }) {
        if (!locals.user)
            return json({ error: "Unauthorized" }, { status: 401 });

        const { messageId, channelId, content, embeds } = await request.json();

        if (!messageId)
            return json({ error: "Message ID is required" }, { status: 400 });

        if (!content && (!embeds || embeds.length === 0))
            return json({ error: "Must provide content or embeds" }, { status: 400 });

        // Get bound encrypted key
        const { rows } = await db.query(`
            SELECT ak.encrypted_key
            FROM enabot_api_keys b
            JOIN api_keys ak ON ak.key_hash = b.key_hash
            WHERE ak.user_id = $1
            LIMIT 1
        `, [locals.user.id]);

        if (!rows.length)
            return json({ error: "No API key bound to bot" }, { status: 403 });

        const encrypted = rows[0].encrypted_key.toString("base64");

        // Convert line breaks in content
        let processedContent = content;
        if (content && typeof content === 'string') {
            processedContent = content.replace(/\\n/g, '\n');
        }

        // Convert line breaks in embeds
        let processedEmbeds = embeds;
        if (embeds && Array.isArray(embeds)) {
            processedEmbeds = embeds.map(embed => {
                const processedEmbed = { ...embed };
                
                if (embed.description && typeof embed.description === 'string') {
                    processedEmbed.description = embed.description.replace(/\\n/g, '\n');
                }
                
                if (embed.fields && Array.isArray(embed.fields)) {
                    processedEmbed.fields = embed.fields.map(field => ({
                        ...field,
                        value: typeof field.value === 'string' 
                            ? field.value.replace(/\\n/g, '\n') 
                            : field.value
                    }));
                }
                
                return processedEmbed;
            });
        }

        const payload = {};
        if (processedContent !== undefined) payload.content = processedContent;
        if (processedEmbeds !== undefined) payload.embeds = processedEmbeds;

        // Forward to bot API
        const apiUrl = `https://enabot-production.up.railway.app/message/${channelId}/${messageId}/edit`;

        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key-encrypted": encrypted
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        return json(data, { status: res.status });
    }
);