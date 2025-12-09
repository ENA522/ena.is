import { enaHeader } from './header.js';
import { enaFooter } from './footer.js';
import { enaCard } from './body.js';

export function enaLayout(meta, body) {
    return `
        <div style="
            background:linear-gradient(#f8fafc, #ffffff);
            padding:32px;
            max-width:640px;
            margin:auto;
            font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color:#0f172a;
        ">

            ${enaHeader(meta)}

            ${enaCard(body)}

            ${enaFooter()}
        </div>
    `;
}