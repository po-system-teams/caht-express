export enum SocketEventType { // socket事件名称
    CLIENT_BEHAVIOR = 'clientBehavior', // 客户端行为
    SERVER_BEHAVIOR = 'serverBehavior', // 服务端行为
    SEND_MESSAGE = 'sendMessage', // 客户端发送消息给服务端
	RECEIVE_MESSAGE = 'receiveMessage', // 客户端接收服务端消息
}

export interface UserType {
    userId?: number, // 用户id
    name?: string, // 用户名称
    socketId?: string, // socketId
    create_time?: string, // 创建时间
    last_login_time?: string, // 最后登录时间
}

// 消息类型
export interface Message {
	type: MessageType; // 消息类型
	origin: MessageOrigin; // 消息来源
	data: string; // 消息内容
	time: number; // 消息时间
}

export enum MessageType {
	TEXT = 'text',
}

export enum MessageOrigin {
	ME = 'me',
	OTHER = 'other',
}


// 客户端行为
export interface ClientBehavior {
	type: BehaviorType,
	[key: string]: any
}

// 客户端私聊行为
export interface ClientBehaviorPrivateChat {
	type: BehaviorType.LAUNCHPRIVATECHAT,
	originUserId: number, // 来源用户id
	targetUserId: number, // 目标用户id
	data: Message, // 消息内容
}

export interface ClientBehaviorLogin {
	type: BehaviorType.LOGIN,
	userId: number, // 用户id
}

// 客户端群聊类型

// 行为类型
export enum BehaviorType {
	LOGIN = 'login', // 登录
	LAUNCHPRIVATECHAT = 'launch_private_chat', // 私聊
	LAUNCHGROUPCHAT = 'launch_group_chat', // 群聊
	USERLISTUPDATE = 'user_list_update', // 更新在线用户列表
}

// 服务端行为-更新在线用户列表
export interface ServerBehaviorUpdateUserList {
    type: BehaviorType.USERLISTUPDATE; // 行为类型
    data: any; // 数据
}

