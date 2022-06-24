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

export interface IPrivateMessageToSend {
    recipientUsername: string;
    content: string;
    productId?: string;
}
export interface IPrivateMessageToDelete {
    id: string;
    privateMessageThreadId: string;
}
export interface IPrivateMessageToEdit {
    id: string;
    privateMessageThreadId: string;
    content: string;
    recipientUsername: string;
    senderUsername: string;
    senderPhotoUrl: string;
}

export class PrivateMessageToEditValues {
    id?: string;
    content: string = '';
    privateMessageThreadId: string = '';
  
    constructor(init?: PrivateMessageToEditValues) {
      if (init)
        Object.assign(this, init);
    }
  }
