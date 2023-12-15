// 私聊
import { Socket } from "socket.io";
import { Message, MessageOrigin, MessageType, SocketEventType } from "../types/chat";
import { getSocket } from "./connectSocket";
export default function privateChat(socket: Socket) {
  socket.on("sendMessage", (data) => {
    console.log(data, "收到消息啦");
    if (!data.originSocketId || !data.targetSocketId) return;
    if (!data.originUserId || !data.targetUserId) return;
    if (data.originSocketId === data.targetSocketId) return;
    if (data.data.trim() === '') return;
    const targetSocket = getSocket(data.targetUserId);
    if (!targetSocket) return;
    const message: Message = {
      ...data,
      origin: MessageOrigin.OTHER,
      time: new Date().getTime(),
    };
    targetSocket.emit(SocketEventType.RECEIVE_MESSAGE, message);
  });
};
