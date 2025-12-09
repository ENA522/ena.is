<script>
    let status = $state("");
    let loading = $state(false);
    let fetching = $state(false);
    let messageId = $state("");
    let channelId = $state("");
    let jsonInput = $state("");
    let fetchedMessage = $state(null);

    async function fetchMessage() {
        if (!messageId.trim()) {
            status = "❌ Message ID is required.";
            return;
        }

        status = "";
        fetching = true;
        fetchedMessage = null;

        try {
            const params = new URLSearchParams({ messageId: messageId.trim() });
            if (channelId.trim()) {
                params.append('channelId', channelId.trim());
            }

            const res = await fetch(`/api/message?${params}`);
            const data = await res.json();

            if (!res.ok) {
                status = "❌ " + (data.error || "Failed to fetch message");
            } else {
                fetchedMessage = data.message;
                
                // Build JSON with proper structure
                const messageJson = {};
                if (data.message.content) {
                    messageJson.content = data.message.content;
                }
                if (data.message.embeds && data.message.embeds.length > 0) {
                    messageJson.embeds = data.message.embeds;
                }
                
                jsonInput = JSON.stringify(messageJson, null, 2);
                status = "✅ Message fetched successfully.";
            }
        } catch (err) {
            status = "❌ Network error or internal failure.";
        } finally {
            fetching = false;
        }
    }

    async function editMessage() {
        if (!messageId.trim()) {
            status = "❌ Message ID is required.";
            return;
        }

        if (!jsonInput.trim()) {
            status = "❌ JSON input cannot be empty.";
            return;
        }

        status = "";
        loading = true;

        try {
            // Parse and validate JSON
            let parsedJson;
            try {
                parsedJson = JSON.parse(jsonInput);
            } catch (err) {
                status = "❌ Invalid JSON format.";
                loading = false;
                return;
            }

            const payload = {
                messageId: messageId.trim(),
                ...parsedJson
            };

            if (channelId.trim()) {
                payload.channelId = channelId.trim();
            }

            const res = await fetch('/api/message', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                status = "❌ " + (data.error || "Failed to edit message");
            } else {
                status = "✅ Message edited successfully.";
                
                // Update the displayed JSON with the edited version
                const updatedJson = {};
                if (data.message.content) {
                    updatedJson.content = data.message.content;
                }
                if (data.message.embeds && data.message.embeds.length > 0) {
                    updatedJson.embeds = data.message.embeds;
                }
                jsonInput = JSON.stringify(updatedJson, null, 2);
            }
        } catch (err) {
            status = "❌ Network error or internal failure.";
        } finally {
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Edit Message - Bot Dashboard</title>
</svelte:head>

<section class="max-w-2xl mx-auto px-6 py-16 space-y-6">

    <h1 class="text-2xl font-bold">Edit Message</h1>

    <p class="text-sm text-slate-600">
        Fetch and edit messages sent by your bot using JSON format.
    </p>

    <!-- Message ID -->
    <div class="space-y-2">
        <label for="messageId" class="text-sm font-medium text-slate-700">Message ID (required)</label>
        <input
            id="messageId"
            type="text"
            class="w-full border rounded-lg px-4 py-2"
            placeholder="Enter Message ID..."
            bind:value={messageId}
        />
    </div>
    <!-- Channel ID (optional) -->
    <div class="space-y-2">
        <label for="channelId" class="text-sm font-medium text-slate-700">Channel ID (optional, for faster lookup)</label>
        <input
            id="channelId"
            type="text"
            class="w-full border rounded-lg px-4 py-2"
            placeholder="Enter Channel ID (optional)..."
            bind:value={channelId}
        />
    </div>

    <!-- Fetch Button -->
    <button
        onclick={fetchMessage}
        disabled={fetching}
        class="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50">
        {fetching ? "Fetching..." : "Fetch Message"}
    </button>

    {#if fetchedMessage}
        <div class="p-4 bg-slate-50 rounded-lg border space-y-2">
            <p class="text-xs text-slate-500">Channel: {fetchedMessage.channelId}</p>
            <p class="text-xs text-slate-500">Created: {new Date(fetchedMessage.createdAt).toLocaleString()}</p>
            {#if fetchedMessage.editedAt}
                <p class="text-xs text-slate-500">Last edited: {new Date(fetchedMessage.editedAt).toLocaleString()}</p>
            {/if}
        </div>
    {/if}

    <!-- JSON Input -->
    <div class="space-y-2">
        <label for="jsonInput" class="text-sm font-medium text-slate-700">Message JSON</label>
        <textarea
            id="jsonInput"
            rows="12"
            class="w-full border rounded-lg px-4 py-2 font-mono text-sm"
            placeholder={`{"content": "Hello!", "embeds": [{"title": "Title", "description": "Description"}]}`}
            bind:value={jsonInput}
        ></textarea>
        <p class="text-xs text-slate-500">
            Use \n for line breaks in the JSON. They will be converted automatically.
        </p>
    </div>

    <!-- Edit Button -->
    <button
        onclick={editMessage}
        disabled={loading}
        class="bg-slate-900 text-white px-4 py-2 rounded-lg disabled:opacity-50">
        {loading ? "Saving..." : "Edit Message"}
    </button>

    {#if status}
        <p class="text-sm mt-4">{status}</p>
    {/if}

</section>