export interface IMessageEnvelope {

    messages: IMessage[];
    messageThreadsCount: number; 
    totalPages: number;
}

export interface IMessage {
    id: string;
    senderId?: string;
    senderUsername?: string;
    senderDisplayName?: string;
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

