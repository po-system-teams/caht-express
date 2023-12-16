import { RedisConnectUserList, RedisKey } from "../types/redis";
import { ClientBehaviorLogin } from "../types/chat";
import { getRedis, setRedis } from "../utils/redisUtils";
import { Socket } from "socket.io";
import { addSocket } from "../socket/connectSocket";

// 插入用户信息存入redis
export async function saveUserRedisStorage(data: ClientBehaviorLogin, socket: Socket) {
    let userList = await getAllRedisStorage(RedisKey.CONNECT_USER_LIST);
    // 判断redis是否已有该用户
    const findIndex = userList.findIndex((item) => item.userId === data.userId);
    const user: RedisConnectUserList = {
      userId: data.userId,
      socketId: socket.id,
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
    addSocket(user.userId, socket);
}

// 查询redis中某个用户信息
export async function getUserRedisStorage(userId: number) {
    const userList = await getAllRedisStorage(RedisKey.CONNECT_USER_LIST);
    return userList.find((item) => item.userId === userId);
}

// 查询所有radis信息
export async function getAllRedisStorage(key) {
    let userList = await getRedis(RedisKey.CONNECT_USER_LIST);
    if (userList === null) {
      userList = '[]';
    }
    userList = JSON.parse(userList);
    return userList as RedisConnectUserList[];
}