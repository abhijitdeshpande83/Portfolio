const chatBox = document.getElementById("chat");

async function sendMessage() {
    const msgInput = document.getElementById("msg");
    const message = msgInput.value.trim();
    const sessionId = document.getElementById("session-id").innerText;

    if (!message) return;

    chatBox.innerHTML += `
        <div class="user-row">
            <div class="bubble user">${message}</div>
        </div>`;
    
    msgInput.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
<<<<<<< HEAD
        const res = await fetch("https://www.theanalyticmind.com/rasa/webhooks/rest/webhook", {
=======
        const res = await fetch("https://analyticminds.com/rasa/webhooks/rest/webhook", {
>>>>>>> 23b97132 (fix(rasa-api): update endpoint URL from analyticnerds to theanalyticmind)
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sender: "user1", message: message })
        });
        const data = await res.json();
        
        data.forEach(r => {
            if (r.text) {
                chatBox.innerHTML += `
                    <div class="bot-row">
                        <div class="bubble bot">${r.text}</div>
                    </div>`;
            }
        
            if (r.image) {
                chatBox.innerHTML += `<div class="bot-row"><img src="${r.image}" class="chat-img" alt="Movie Poster"/></div>`;
            }
        });
    } catch (err) {
        chatBox.innerHTML += `<div class="bot-row"><div class="bubble bot error">System temporarily unavailable.</div></div>`;
    }
    
    chatBox.scrollTop = chatBox.scrollHeight;
}