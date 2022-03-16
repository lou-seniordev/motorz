export interface IPrivateMessageEnvelope {

    privateMessages: IPrivateMessage[];
    privateMessageThreadsCount: number; 
    totalPages: number;
}

export interface IPrivateMessage {
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
    privateMessageThreadId: string;
}