// 私聊
import { Socket } from "socket.io";
import { Message, MessageOrigin, MessageType } from "../types/socket";
export default function privateChat(socket: Socket) {
  socket.on("sendMessage", (data) => {
    console.log(data, "收到消息啦");
    // const message: Message = {
    //   type: MessageType.TEXT,
    //   data: data?.message,
    //   origin: MessageOrigin.OTHER,
    //   time: new Date().getTime(),
    // };
    // console.log(message);
    // socket.to("chat room").emit("receiveMessage", message);
  });
};
