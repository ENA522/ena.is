// api/message/+server.js
import { json } from '@sveltejs/kit';

export async function GET({ url, cookies }) {
    const messageId = url.searchParams.get('messageId');
    const channelId = url.searchParams.get('channelId');

    if (!messageId) {
        return json({ error: "Message ID is required" }, { status: 400 });
    }

    // Get auth token from cookies
    const authToken = cookies.get('auth_token'); // or however you handle auth
    if (!authToken) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const apiUrl = channelId 
            ? `/message/${messageId}?channelId=${channelId}`
            : `/message/${messageId}`;

        const res = await fetch(`${process.env.BOT_API_URL}${apiUrl}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            return json({ error: data.error || "Failed to fetch message" }, { status: res.status });
        }

        return json(data);

    } catch (err) {
        console.error("Fetch message error:", err);
        return json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST({ request, cookies }) {
    const { messageId, channelId, content, embeds } = await request.json();

    if (!messageId) {
        return json({ error: "Message ID is required" }, { status: 400 });
    }

    if (!content && (!embeds || embeds.length === 0)) {
        return json({ error: "Must provide content or embeds" }, { status: 400 });
    }

    // Get auth token from cookies
    const authToken = cookies.get('auth_token');
    if (!authToken) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
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

        const apiUrl = `/message/${messageId}/edit`;

        const res = await fetch(`${process.env.BOT_API_URL}${apiUrl}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            return json({ error: data.error || "Failed to edit message" }, { status: res.status });
        }

        return json(data);

    } catch (err) {
        console.error("Edit message error:", err);
        return json({ error: "Internal server error" }, { status: 500 });
    }
}