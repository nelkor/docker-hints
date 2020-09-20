const { Server } = require('ws')

const port = 9001

const server = new Server({ port })

process.on('SIGTERM', () => process.exit(0))

server.on('connection', (socket, req) => {
    socket.on('message', message => {
        socket.send(`Получено: ${message}`);
        socket.send('Cookies ' + JSON.stringify(req.headers.cookie));
    })
})
