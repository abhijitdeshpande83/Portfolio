const messageBox = document.querySelector(".message-container")
const userInput = document.getElementById("user-input")

async function sendMessage() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
    
<<<<<<< HEAD
>>>>>>> afeb74f4 (chore(aura): resolve rebase conflicts)
    const message = userInput.value.trim()
    // Grabbing the dynamic session ID from the HTML span
    const sessionId = document.getElementById("session-id").innerText;
<<<<<<< HEAD
    
=======
=======
    updateSession("72979e2")

    message = userInput.value.trim()
>>>>>>> 57a0f659 (feat(AURA): add UI to AURA project)
>>>>>>> afeb74f4 (chore(aura): resolve rebase conflicts)
=======
    const message = userInput.value.trim()
    // Grabbing the dynamic session ID from the HTML span
    const sessionId = document.getElementById("session-id").innerText;
    
>>>>>>> 7624b4b6 (chore(aura): resolve rebase conflicts)
    if (!message) return

    // User message logic (Original)
    messageBox.innerHTML += `
    <div class="user">
        <img src="/media/project/user-input.png" class="user-img" alt="">
<<<<<<< HEAD
<<<<<<< HEAD
        <div class="bubble">${message}</div>
    </div>`
=======
        ${message}
    </div>
    `
<<<<<<< HEAD
    messageBox.scrollTop = messageBox.scrollHeight;
>>>>>>> afeb74f4 (chore(aura): resolve rebase conflicts)
=======
        <div class="bubble">${message}</div>
    </div>`
>>>>>>> 7624b4b6 (chore(aura): resolve rebase conflicts)
    
    messageBox.scrollTop = messageBox.scrollHeight;
    userInput.value = "" 

    try {
        // Updated URL string to include the dynamic sessionId from your view
        const response = await fetch(`/projects/aura_agent/${sessionId}/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_input: message })
        });
    
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
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
>>>>>>> afeb74f4 (chore(aura): resolve rebase conflicts)
=======
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
>>>>>>> 7624b4b6 (chore(aura): resolve rebase conflicts)
    }
        
    messageBox.scrollTop = messageBox.scrollHeight;
}

function updateInfo(value) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 7624b4b6 (chore(aura): resolve rebase conflicts)
    const formatted = Object.entries(value)
        .map(([key, val]) => `<strong>${key}</strong>: ${val}`).join(`<br>`);
    document.querySelectorAll(".extracted-info").forEach(info => { 
        info.innerHTML = formatted; 
    });
<<<<<<< HEAD
=======

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
>>>>>>> afeb74f4 (chore(aura): resolve rebase conflicts)
=======
>>>>>>> 7624b4b6 (chore(aura): resolve rebase conflicts)
}

function setValue(id, value) {
    document.getElementById(id).textContent = value
}