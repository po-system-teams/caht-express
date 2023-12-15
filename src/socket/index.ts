import { Socket } from 'socket.io';
import { ClientBehavior, ClientBehaviorType, SocketEventType, UserType } from '../types/chat';
import { connectInit } from './connectInit';
import { addSocket } from './connectSocket';
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
          const user: UserType = await connectInit(data);
          // user是存入redis的信息，包括id和name
          // 用id作一个socket映射，用于对某个客户端发送消息
          addSocket(user.userId, socket);
          // 登录之后主动返回一次用户列表给客户端
          userListUpdate(io);
          break;
        default:
          break;
      }
    });
  });
}

