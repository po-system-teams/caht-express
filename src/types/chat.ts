export enum SocketEventType { // socket事件名称
    CLIENT_BEHAVIOR = 'clientBehavior', // 客户端行为
    SEND_MESSAGE = 'sendMessage', // 客户端发送消息给服务端
    SERVER_BEHAVIOR = 'serverBehavior', // 服务端行为
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
	originUserId: number, // 来源用户id
	originSocketId: string, // 来源socketId
	targetUserId: number, // 目标用户id
	targetSocketId: string, // 目标socketId
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
	type: ClientBehaviorType,
	userId: number, // 用户id
	targetSocketId: string, // 操作目标的socketId
	name?: string, // 用户名称
	socketId?: string, // socketId
}

// 客户端行为类型
export enum ClientBehaviorType {
	LOGIN = 'login', // 登录
	LAUNCHPRIVATECHAT = 'launch_private_chat', // 启动私聊
	BREAKPRIVATECHAT = 'break_private_chat', // 断开私聊
	LAUNCHGROUPCHAT = 'launch_group_chat', // 启动群聊
	BREAKGROUTCHAT = 'break_group_chat', // 断开群聊
}

// 服务端行为
export interface ServerBehavior {
    type: ServerBehaviorType; // 行为类型
    data: any; // 数据
}

export enum ServerBehaviorType {
    USERLISTUPDATE = 'user_list_update', // 在线用户列表更新
}

