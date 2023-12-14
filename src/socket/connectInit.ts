import { UserType } from "../types/chat";
import { RedisKey } from "../types/redis";
import { ClientBehavior } from "../types/chat";
import { getRedis, setRedis } from "../utils/redisUtils";

// 连接初始化
export async function connectInit(data: ClientBehavior) {
    let userList = await getRedis(RedisKey.CONNECT_USER_LIST);
    if (userList === null) {
      userList = '[]';
    }
    userList = JSON.parse(userList);
    // 判断redis是否已有该用户
    const findIndex = userList.findIndex((item) => item.userId === data.userId);
    const user: UserType = {
      userId: data.userId,
      socketId: data.socketId,
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