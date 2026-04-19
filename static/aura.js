const messageBox = document.querySelector(".message-container")
const userInput = document.getElementById("user-input")

async function sendMessage() {
    
    updateSession("72979e2")

    message = userInput.value.trim()
    if (!message) return

    messageBox.innerHTML +=  `
    <div class="user">
        <img src="/media/project/user-input.png" class="user-img" alt="">
        ${message}
    </div>
    `

    messageBox.innerHTML +=  `
    <div class="bot">
        <img src="/media/project/assistant.png" class="bot-img" alt="">
        ${message}
    </div>
    `
    setValue("current-flow", 'active-flow')
    userInput.value = ""
}

function updateSession(value) {
    document.querySelectorAll(".session-id").forEach(session=>
    {session.textContent=value}
    )
}

function setValue(id, value) {
    document.getElementById(id).textContent = value
}