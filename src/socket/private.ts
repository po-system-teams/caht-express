// 私聊
import { getUserRedisStorage } from "../redis/util";
import { ClientBehaviorPrivateChat, Message, MessageOrigin, SocketEventType } from "../types/chat";
import { getSocket } from "./connectSocket";
export default async function privateChat(data: ClientBehaviorPrivateChat) {
    console.log(data, "收到消息啦");
    if (!data.originUserId || !data.targetUserId) return;
    if (data.originUserId === data.targetUserId) return;
    const targetUserData = await getUserRedisStorage(data.targetUserId);
    const targetSocket = getSocket(targetUserData.userId);
    if (!targetSocket) return;
    const message: Message = {
      ...data.data,
      time: new Date().getTime(),
      origin: MessageOrigin.OTHER
    };
    targetSocket.emit(SocketEventType.SERVER_BEHAVIOR, {...data, data: message});
};
