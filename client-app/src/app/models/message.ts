export interface IMessage {
    id: string;
    senderId: string;
    senderUsername: string;
    senderPhotoUrl: string;
    recipientId: string;
    recipientUsername: string;
    recipientPhotoUrl: string;
    content: string;
    dateRead: Date;
    dateSent: string;
}

