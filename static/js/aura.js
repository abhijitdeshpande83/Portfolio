const messageBox = document.querySelector(".message-container");
const userInput = document.getElementById("user-input");

async function sendMessage() {
    const message = userInput.value.trim();
    const sessionId = document.getElementById("session-id").innerText;

    if (!message) return;

    // Render user message
    messageBox.innerHTML += `
        <div class="user">
            <img src="/media/project/user-input.png" class="user-img" alt="">
            <div class="bubble">${message}</div>
        </div>
    `;

    messageBox.scrollTop = messageBox.scrollHeight;
    userInput.value = "";

    try {
        const response = await fetch(`/projects/aura_agent/${sessionId}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_input: message })
        });

        const data = await response.json();

        // Render bot message
        messageBox.innerHTML += `
            <div class="bot">
                <img src="/media/project/assistant.png" class="bot-img" alt="">
                <div class="bubble">${data.message}</div>
            </div>
        `;

        // Update UI state
        setValue("current-flow", data.active_flow);

        if (data.extracted_info) {
            updateInfo(data.extracted_info);
        }

    } catch (err) {
        console.error(err);

        messageBox.innerHTML += `
            <div class="bot">
                <img src="/media/project/assistant.png" class="bot-img" alt="">
                <div class="bubble">Error: ${err.message}</div>
            </div>
        `;
    }

    messageBox.scrollTop = messageBox.scrollHeight;
}

function updateInfo(value) {
    const formatted = Object.entries(value)
        .map(([key, val]) => `<strong>${key}</strong>: ${val}`)
        .join("<br>");

    document.querySelectorAll(".extracted-info")
        .forEach(el => {
            el.innerHTML = formatted;
        });
}

function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

function updateSession(value) {
    document.querySelectorAll(".session-id")
        .forEach(el => {
            el.textContent = value;
        });
}