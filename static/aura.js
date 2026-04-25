const messageBox = document.querySelector(".message-container")
const userInput = document.getElementById("user-input")

async function sendMessage() {
    
    message = userInput.value.trim()
    if (!message) return

    messageBox.innerHTML +=  `
    <div class="user">
        <img src="/media/project/user-input.png" class="user-img" alt="">
        ${message}
    </div>
    `

    try {const response = await fetch("/projects/aura_agent/", {
        method: "POST",
        // mode: "cors",
        headers: {
            "Content-Type":"application/json",
            // "X-CSRFToken": getCSRFToken()
        },
        body: JSON.stringify({user_input:message})
        });
    
    const data = await response.json();
    console.log(data.message)
    console.log(data)

    messageBox.innerHTML +=  `
    <div class="bot">
        <img src="/media/project/assistant.png" class="bot-img" alt="">
        ${data.message}
    </div>
    `
    setValue("current-flow", data.active_flow)

    if (data.active_flow ==='complaint_flow') {
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

    userInput.value = ""
}

function updateInfo(value) {

    const formatted= Object.entries(value)
        .map(([key,val])=> `<strong>${key}</strong>: ${val}`).join(`<br>`);
    document.querySelectorAll(".extracted-info").forEach(info=>
    {info.innerHTML=formatted;}
    )
}

function setValue(id, value) {
    document.getElementById(id).textContent = value
}