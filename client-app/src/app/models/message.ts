export interface IMessageEnvelope {

    messages: IMessage[];
    messageCount: number;
}

export interface IMessage {
    id: string;
    senderId?: string;
    senderUsername?: string;
    senderPhotoUrl: string;
    recipientId?: string;
    recipientUsername?: string;
    recipientPhotoUrl?: string;
    content: string;
    dateRead?: string;
    dateSent: string;
    productId: string;
    productTitle?: string;
    productPhotoUrl?: string;
    messageThreadId: string;
}

export interface IMessageToSend {
    recipientUsername: string;
    content: string;
    productId: string;
}

