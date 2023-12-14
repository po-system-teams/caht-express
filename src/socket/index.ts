import { Socket } from 'socket.io';
import { ClientBehavior, ClientBehaviorType, SocketEventType } from '../types/chat';
import { connectInit } from './connectInit';
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
        case ClientBehaviorType.LAUNCHPRIVATECHAT:
          // 创建私聊,监听该用户的sendMessage事件
          privateChat(socket);
          break;
        case ClientBehaviorType.LOGIN:
          // 登录
          await connectInit(data);
          // 登录之后主动返回一次用户列表给客户端
          userListUpdate(io);
          break;
        default:
          break;
      }
    });
  });
}

