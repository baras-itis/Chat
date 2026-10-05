// В браузер уже встроен WebSocket
const ws = new WebSocket("ws://localhost:5000");  

const form = document.querySelector(".chat-create-message")
const message = document.getElementById("message");
// переделать в map
const messages = [];
const chat = document.querySelector(".chat")
let index = 0;

// Констурктор сообщения
class Message{
        constructor({user, text, time}){
            this.user = user;
            this.text = text;
            this.time = time ?? Date.now();
        }
        get formatted(){
            return `${this.user}: ${this.message}`;
        }
        
        isMine(myUser){
            user === myUser ? true : false
        }
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    const m = message.value.trim();
    if(m && ws.readyState === WebSocket.OPEN){
        ws.send(m);
        message.value = "";
        messages.set(`you: ${Date.now()}` , m);
    } else {
        console.warn("WS не готов или сооб пустое")
    }
})


ws.onmessage = function(event){
    let message = event.data;
    createMessage(message);
    console.log(event);    
}

function createMessage(message){
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.classList = "message";
    chat.appendChild(messageDiv);
    
}