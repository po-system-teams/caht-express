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


// 用户行为
export interface UserBehavior {
	type: UserBehaviorType,
	userId: string, // 用户id
	targetSocketId: string, // 操作目标的socketId
	name?: string, // 用户名称
	socketId?: string, // socketId
}

// 行为类型
export enum UserBehaviorType {
	LOGIN = 'login', // 登录
	LAUNCHPRIVATECHAT = 'launch_private_chat', // 启动私聊
	BREAKPRIVATECHAT = 'break_private_chat', // 断开私聊
	LAUNCHGROUPCHAT = 'launch_group_chat', // 启动群聊
	BREAKGROUTCHAT = 'break_group_chat', // 断开群聊
}


// 连接用户表
export interface connectUser {
	id: string; // 用户id
	name: string, // 用户名称
	socketId?: string, // socketId
}
