export interface IMessage {
    id: string;
    senderId: string;
    senderUsername: string;
    senderPhotoUrl: string;
    recipientId: string;
    recipientUsername: string;
    recipientPhotoUrl: string;
    content: string;
    dateRead: string;
    dateSent: string;
    productId: string;
}

export interface IMessageToSend {
    recipientUsername: string;
    content: string;
    productId: string;
}
