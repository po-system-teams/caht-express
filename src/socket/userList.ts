import { getBatchUser } from '../mysql';
import { ServerBehavior, ServerBehaviorType, SocketEventType } from '../types/chat';
import { RedisKey } from '../types/redis';
import { getRedis } from '../utils/redisUtils';

// 在线用户列表，默认调用一次
async function userListUpdate(io: any) {
  try {
    // get redis from RedisKey.CONNECT_USER_LIST
    let userList = await getRedis(RedisKey.CONNECT_USER_LIST);
    userList = JSON.parse(userList);
    userList = userList.map((ite) => ite.userId);
    // 查询数据库
    const data = await getBatchUser(userList);
    // 将socketId映射到data里
    for (let i = 0; i < data.length; i++) {
      const socketId = userList.find((ite) => ite === data[i].userId);
      if (socketId) {
        data[i].socketId = socketId;
      }
    }

    // 广播给所有用户
    io.emit(SocketEventType.SERVER_BEHAVIOR, {
      type: ServerBehaviorType.USERLISTUPDATE,
      data,
    } as ServerBehavior);
  } catch (err) {
    console.log(err);
  }
}

module.exports = userListUpdate;
