import { Socket, Server } from "socket.io";
import { Message, MessageOrigin, MessageType, UserBehavior, UserBehaviorType, connectUser } from "../types/socket";
import joinGroup from "./group";
const socket = require("socket.io")

const connectUserList: connectUser[] = [];
export default function consturctSocket(server: any) {
    const io = socket(server, {
        cors: {
            origin: '*'
        }
    })
    io.on("connection", (socket: Socket) => {
        console.log(socket.id, '成功链接');
        // 监听行为
        socket.on('behavior', (data: UserBehavior) => {
            console.log(socket.id, '加入聊天')
            // connectUserList.push({
            //     id: socket.id,
            //     name: `小明${connectUserList.length + 1}`
            // });
            socket.emit('receiveSystemMessage', connectUserList)
            if (data.type === UserBehaviorType.JOIN_GRPUP) {
                // 加入群聊
                joinGroup(socket);
            }
        });
    });
};