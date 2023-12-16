export enum RedisKey {
  CONNECT_USER_LIST = 'connect_user_list', // 当前用户连接的列表key
}

// redis存储的用户类型数据
export interface RedisConnectUserList {
  userId: number,
  socketId: string,
}