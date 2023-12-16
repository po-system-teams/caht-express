import { Socket } from 'socket.io';
import { ClientBehavior, ClientBehaviorPrivateChat, BehaviorType, SocketEventType, ClientBehaviorLogin } from '../types/chat';
import { saveUserRedisStorage } from '../redis/util';
import privateChat from './private';
const socket = require('socket.io');
export default function consturctSocket(server: any) {
  const userListUpdate = require('./userList');
  const io = socket(server, {
    cors: {
      origin: '*',
    },
  });
  io.on('connection', (socket: Socket) => {
    console.log(socket.id, '成功链接');
    // 监听客户端行为
    socket.on(SocketEventType.CLIENT_BEHAVIOR, async (data: ClientBehavior) => {
      switch (data.type) {
        case BehaviorType.LAUNCHPRIVATECHAT:
          // 私聊,处理私聊信息
          privateChat(data as ClientBehaviorPrivateChat);
          break;
        case BehaviorType.LOGIN:
          // 登录
          await saveUserRedisStorage(data as ClientBehaviorLogin, socket);
          // 登录之后主动返回一次用户列表给客户端
          userListUpdate(io);
          break;
        default:
          break;
      }
    });
  });
}

