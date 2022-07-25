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
    lastActive?: string,
    image: string,
    following: boolean;
    followersCount: number;
    followingCount: number;
    photos: IMemberPhoto[]
} 

export interface IMemberPhoto {
    id: string,
    url: string,
    isMain: boolean
}