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
