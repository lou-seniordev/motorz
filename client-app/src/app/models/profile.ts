export interface IProfileEnvelope {
    people: IProfile [],
    peopleCount: number
}
export interface IProfile {
    id?: string,
    displayName: string,
    username: string,
    bio: string,
    image: string,
    following: boolean;
    followersCount: number;
    followingCount: number;
    photos: IPhoto[]
} 

export interface IPhoto {
    id: string,
    url: string,
    isMain: boolean
}

export interface IUserActivity {
    id: string;
    title: string;
    category: string;
    date: Date;
}
export interface IUserMotofy {
    id: string;
    name: string;
    yearOfProduction: string;
    datePublished: Date;
    photoUrl: string;
}
export interface IUserForumpost {
    id: string;
    title: string;
    category: string;
    dateAdded: Date;
}
export interface IUserMechanic {
    id: string;
    name: string;
    photoUrl: string;
    datePublished: Date;
}
export interface IUserProduct {
    id: string;
    title: string;
    price: string;  
    pictureUrl: string;
    datePublished: Date;
}


