import { Message, MessageOrigin, MessageType } from "../types/socket";

function consturctSocket(io) {
    io.on("connection", (socket) => {
        console.log(socket.id, '成功链接');
        socket.join('chat room');
        socket.on('sendMessage', (data) => {
            console.log(data, '收到消息啦');
            const message: Message = {
                type: MessageType.TEXT,
                data,
                origin: MessageOrigin.OTHER,
                time: new Date().getTime(),
            };
            socket.to('chat room').emit('receiveMessage', message)
        });
    });
}

module.exports = consturctSocket;