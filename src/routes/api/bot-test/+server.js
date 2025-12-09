import { json } from "@sveltejs/kit";
import { db } from "$lib/db.js";
import { withApiLogger } from "$lib/apiLogger/withApiLogger.js"

/**
 * POST /api/bot-test
 * Body: { channelId, message }
 */

export const POST = withApiLogger(
    {
        index: {
            request: ["channelId", "message"],
            response: ["status"]
        }
    },
    async function POST({ request, locals, fetch }) {

        if (!locals.user)
            return json({ error: "Unauthorized" }, { status: 401 });

        const { channelId, message } = await request.json();

        if (!channelId)
            return json({ error: "Channel ID is required" }, { status: 400 });

        if (!message)
            return json({ error: "Message is required" }, { status: 400 });

        // 1) Get bound encrypted key
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

        // 2) Forward message + channel ID to bot API
        const res = await fetch("https://enabot-production.up.railway.app/test/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key-encrypted": encrypted
            },
            body: JSON.stringify({
                channelId,
                message
            })
        });

        const data = await res.json();

        return json(data, { status: res.status });
    }
)
