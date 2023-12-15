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
    const userIdList = userList.map((ite) => ite.userId);
    // 查询数据库
    let data = await getBatchUser(userIdList);
    data = JSON.parse(JSON.stringify(data));
    // 将socketId映射到data里
    for (let i = 0; i < data.length; i++) {
      const target = userList.find((ite) => {
        if (ite.userId === data[i].userId) {
          return ite.socketId;
        }
        return null
      });
      if (target) {
        data[i].socketId = target.socketId;
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
