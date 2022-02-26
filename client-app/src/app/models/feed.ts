export interface IFeedEnvelope {

    feeds: IFeed[];
    // messageThreadsCount: number; 
    feedCount: number;
    // totalPages: number;
}

export interface IFeed {
    id: string;
    info?: string;
    notifierId?: string;
    notifierDisplayname?: string;
    notifierPhotoUrl: string;
    ojectId: string;
    dateTriggered?: string;
    // dateTriggered: Date;// | string;
    
}