export interface IMember {
    id: string,
    displayName: string,
    username: string,
    bio: string,
    age?: string,
    city?: string,
    country?: string,
    email?: string,
    gender?: string,
    joinedUs?: string,
    rank: string;
    points: string;
    suspended: boolean;
    lastActive?: string,
    followersCount: number;
    photoUrl: string;
} 

export interface IMemberPhoto {
    id: string,
    url: string,
    isMain: boolean
}