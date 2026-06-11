function getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}

const fileInput = document.getElementById("file-input");
const uploadBtn = document.getElementById("uploadBtn");
const chat = document.getElementById("chat");
const textInput = document.getElementById("msg");
const fileList = document.getElementById("file-list");

uploadBtn.addEventListener("click", function() {
    fileInput.click();
});

// Enter key support
textInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage(){
 
    const msgInput = document.getElementById("msg");
    const message = msgInput.value.trim();

    if(!message) return;

    try {
        const res = await fetch("/projects/rag_pipeline/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "X-CSRFToken": getCSRFToken()
            },
            body: JSON.stringify({user_input: message})
        });
    
        const data = await res.json();
        if (data.status === "not_ready") {
            showToast(data.message, data.status);
            msgInput.value = "";
            return;
        }
        const botResponse = data.message;

      // User Message
        chat.innerHTML += `
            <div class="usr">
                <img src="/media/project/user-input.png" class="usr-img" alt="">
                <div class="message-content">${message}</div>
            </div>
        `;
        // Bot Response
        chat.innerHTML += `
            <div class="bot">
                <img src="/media/project/IQ-bot.png" class="bot-img" alt="">
                <div class="message-content">${botResponse}</div>
            </div>
        `;

        msgInput.value = "";

    } catch(err) {
        chat.innerHTML += `<div class="bot"><div class="message-content">Error: ${err.message}</div></div>`;
    }
    chat.scrollTop = chat.scrollHeight;
}

async function uploadFile() {

    const fileData = new FormData();
    const file = fileInput.files[0];
    fileData.append('file', file);

    const embedded_data = await fetch("/projects/process_file/", 
        {
            method: "POST",
            headers: {
                "X-CSRFToken": getCSRFToken()
            },
            body: fileData
        }
    );
    const data = await embedded_data.json();

    showToast(data.message, data.status);
    if (data.status === "success") {
    addFileToDisplay(file);
    }
    return;
    }

function addFileToDisplay(file) {

    fileList.innerHTML += `
        <div class="file-item">
            <i class="fa-solid fa-file-lines"></i>
            <span class="file-name-text">${file.name}</span>
        </div>`;
}

fileInput.addEventListener("change", function() {
    if(fileInput.files.length > 0) {
        uploadFile();
        fileInput.value = ""; 
    }
});

function showToast(message, type = "success") {
    const toast = document.getElementById("toast");

    toast.innerText = message;

    // color based on type
    if (type === "success") {
        toast.style.background = "#22c55e";
    } else if (type === "duplicate") {
        toast.style.background = "#ef4444";
    } else if (type === "limit" || type === "not_ready") {
        toast.style.background = "#f59e0b";
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}       

