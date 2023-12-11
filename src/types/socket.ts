// 消息类型
export interface Message {
	type: MessageType;
	origin: MessageOrigin;
	data: string;
	avatar?: string;
	time?: number;
	id?: string;
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
	targetId: string, // 操作目标id
}

// 行为类型
export enum UserBehaviorType {
	JOIN_GRPUP = 'join_group', // 加入群聊
	LEAVE_GROUP = 'leave_group', // 退出群聊
	JOIN_PRIVATE = 'join_private', // 加入私聊
	LEAVE_PRIVATE = 'leave_private', // 退出私聊
}


// 连接用户表
export interface connectUser {
	id?: number; // 用户id
	name: string, // 用户名称
	socketId?: string, // socketId
	create_time?: string, // 创建时间
	last_login_time?: string, // 最后登陆时间
}