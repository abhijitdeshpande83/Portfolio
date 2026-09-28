function getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}

// Enter key support
document.getElementById("msg").addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});

async function sendMessage(){
    const chat = document.getElementById("chatbox");
    const msgInput = document.getElementById("msg");
    const message = msgInput.value.trim();

    if(!message) return;

    // User Message
    chat.innerHTML += `
        <div class="usr">
            <div class="message-content">${message}</div>
            <i class="fa-solid fa-user-circle usr-img" style="color: #6366f1; font-size: 24px;"></i>
        </div>
    `;

    chat.scrollTop = chat.scrollHeight;
    msgInput.value = "";

    try {
        const res = await fetch("/projects/atlas_agent/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "X-CSRFToken": getCSRFToken()
            },
            body: JSON.stringify({usr_input: message})
        });
    
        const data = await res.json();
        const botResponse = (typeof data === 'object') ? (data.response || JSON.stringify(data)) : data;

        chat.innerHTML += `
            <div class="bot">
                <i class="fa-solid fa-robot bot-img" style="color: #22d3ee; font-size: 24px;"></i>
                <div class="message-content">${marked.parse(botResponse)}</div>
            </div>
        `;
    } catch(err) {
        chat.innerHTML += `<div class="bot"><div class="message-content">Error: ${err.message}</div></div>`;
    }
    chat.scrollTop = chat.scrollHeight;
}