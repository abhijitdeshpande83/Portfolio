const messageBox = document.querySelector(".message-container")
const userInput = document.getElementById("user-input")

async function sendMessage() {
    
<<<<<<< HEAD
    const message = userInput.value.trim()
    const sessionId = document.getElementById("session-id").innerText;
=======
    updateSession("72979e2")

    message = userInput.value.trim()
>>>>>>> 57a0f659 (feat(AURA): add UI to AURA project)
    if (!message) return

    messageBox.innerHTML +=  `
    <div class="user">
        <img src="/media/project/user-input.png" class="user-img" alt="">
        ${message}
    </div>
    `
<<<<<<< HEAD
    messageBox.scrollTop = messageBox.scrollHeight;
    
    try {const response = await fetch("/projects/aura_agent/", {
        method: "POST",
        // mode: "cors",
        headers: {
            "Content-Type":"application/json",
            // "X-CSRFToken": getCSRFToken()
        },
        body: JSON.stringify({
                user_input: message, 
                session_id: sessionId 
            })
        });
    
    const data = await response.json();
    console.log(data.message)
    console.log(data)
=======
>>>>>>> 57a0f659 (feat(AURA): add UI to AURA project)

    messageBox.innerHTML +=  `
    <div class="bot">
        <img src="/media/project/assistant.png" class="bot-img" alt="">
<<<<<<< HEAD
        ${data.message}
    </div>
    `
    setValue("current-flow", data.active_flow)

    if (data.extracted_info) {
        updateInfo(data.extracted_info)
    }
    }

    catch(err){
          messageBox.innerHTML +=  `
    <div class="bot">
        <img src="/media/project/assistant.png" class="bot-img" alt="">
        ${err.message}
    </div>
    `
    }
        
    messageBox.scrollTop = messageBox.scrollHeight;
    userInput.value = ""
}

function updateInfo(value) {

    const formatted= Object.entries(value)
        .map(([key,val])=> `<strong>${key}</strong>: ${val}`).join(`<br>`);
    document.querySelectorAll(".extracted-info").forEach(info=>
    {info.innerHTML=formatted;}
=======
        ${message}
    </div>
    `
    setValue("current-flow", 'active-flow')
    userInput.value = ""
}

function updateSession(value) {
    document.querySelectorAll(".session-id").forEach(session=>
    {session.textContent=value}
>>>>>>> 57a0f659 (feat(AURA): add UI to AURA project)
    )
}

function setValue(id, value) {
    document.getElementById(id).textContent = value
}