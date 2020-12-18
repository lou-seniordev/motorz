export interface IUser {
    // NB: this userName should be changed also in DB and EF to username/Username
    userName: string;
    displayName: string;
    token: string;
    image?: string
}

export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    userName?: string;
}