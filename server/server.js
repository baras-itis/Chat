const ws = require("ws");
const wss = new ws.WebSocketServer({port:5000});

const users = new Set;

console.log("Сервер запущен");
wss.on('connection', ws => {
    console.log('Новый клиент подключился')
    users.add(ws);
    ws.on('message', function(message) {
    const text = message.toString();
    for (let user of users) user.send(text);
});


    ws.on('close', ()=>{
        users.delete(ws);
        console.clear();
        console.log("клиент отключился");
    })

})
