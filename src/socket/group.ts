import { Socket } from "socket.io";
import { Message, MessageOrigin, MessageType } from "../types/socket";

// 群聊

export default function joinGroup(socket: Socket) {
  socket.join("chat room");
  socket.on("sendMessage", (data) => {
    console.log(data, "收到消息啦");
    const message: Message = {
      type: MessageType.TEXT,
      data: data?.message,
      origin: MessageOrigin.OTHER,
      time: new Date().getTime(),
      id: socket.id,
    };
    socket.to("chat room").emit("receiveMessage", message);
  });
};
