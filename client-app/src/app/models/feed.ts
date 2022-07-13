export interface IFeedEnvelope {

    feeds: IFeed[];
    feedCount: number;
}

export interface IFeed {
    id: string;
    info?: string;
    notifierUsername?: string;
    notifierDisplayname?: string;
    notifierPhotoUrl: string;
    ojectId: string;
    dateTriggered?: string;
    isSeen: boolean;
    dateSeen?:string;
    
}

export interface IFeedsToMarkSeen {
    ids: string [];
}