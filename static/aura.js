const messageBox = document.querySelector(".message-container")
const userInput = document.getElementById("user-input")

async function sendMessage() {
    const message = userInput.value.trim()
    // Grabbing the dynamic session ID from the HTML span
    const sessionId = document.getElementById("session-id").innerText;
    
    if (!message) return

    // User message logic (Original)
    messageBox.innerHTML += `
    <div class="user">
        <img src="/media/project/user-input.png" class="user-img" alt="">
        <div class="bubble">${message}</div>
    </div>`
    
    messageBox.scrollTop = messageBox.scrollHeight;
    userInput.value = "" 

    try {
        // Updated URL string to include the dynamic sessionId from your view
        const response = await fetch(`/projects/aura_agent/${sessionId}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_input: message })
        });
    
        const data = await response.json();
        console.log(data)

        // Bot response logic (Original)
        messageBox.innerHTML += `
        <div class="bot">
            <img src="/media/project/assistant.png" class="bot-img" alt="">
            <div class="bubble">${data.message}</div>
        </div>`
        
        setValue("current-flow", data.active_flow)
        
        if (data.extracted_info) {
            updateInfo(data.extracted_info)
        }
    } catch(err) {
        console.error(err);
    }
        
    messageBox.scrollTop = messageBox.scrollHeight;
}

function updateInfo(value) {
    const formatted = Object.entries(value)
        .map(([key, val]) => `<strong>${key}</strong>: ${val}`).join(`<br>`);
    document.querySelectorAll(".extracted-info").forEach(info => { 
        info.innerHTML = formatted; 
    });
}

function setValue(id, value) {
    document.getElementById(id).textContent = value
}