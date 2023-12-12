import { Socket } from 'socket.io';
import { RedisKey } from '../types/redis';
import { UserBehavior, UserBehaviorType, connectUser } from '../types/socket';
import { getRedis, setRedis } from '../utils/redisUtils';
import joinGroup from './group';
const socket = require('socket.io');
export default function consturctSocket(server: any) {
  const io = socket(server, {
    cors: {
      origin: '*',
    },
  });
  io.on('connection', (socket: Socket) => {
    console.log(socket.id, '成功链接');
    // 监听行为
    socket.on('behavior', (data: UserBehavior) => {
      switch (data.type) {
        case UserBehaviorType.JOIN_PRIVATE:
          // 加入群聊
          joinGroup(socket);
          break;
        case UserBehaviorType.LOGIN:
          // 登录
          connectInit(data);
          break;
        default:
          break;
      }
    });
  });
}

// 连接初始化
async function connectInit(data: UserBehavior) {
  let userList = await getRedis(RedisKey.CONNECT_USER_LIST);
  if (userList === null) {
    userList = '[]';
  }
  userList = JSON.parse(userList);
  // 判断redis是否已有该用户
  const findIndex = userList.findIndex((item) => item.id === data.userId);
  const user: connectUser = {
    id: data.userId,
    socketId: data.socketId,
    name: data.name,
  };
  if (findIndex > -1) {
    // 已有该用户
    userList[findIndex] = user;
  } else {
    // 未有该用户
    userList.push(user);
  }
  // 存到redis里
  await setRedis(RedisKey.CONNECT_USER_LIST, JSON.stringify(userList));
}
