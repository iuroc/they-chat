import { Server } from 'ws'

const server = new Server({ port: 4000 })
server.on('connection', (socket) => {
    socket.on('message', (data) => {
        console.log(data)
    })
})

console.log('ws://127.0.0.1:4000')
