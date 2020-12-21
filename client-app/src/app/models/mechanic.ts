export interface IMechanic {
    id: string;
    // author: string | null;
    photoUrl: string | null;
    name: string;
    description: string;
    yearOfStart: string;//Date;
    datePublished: string;// Date | undefined;
    country: string;
    city: string;
    address: string;
    email: string;
    phone: string;
    website: string;
}

export class MechanicFromValues {
    id?: string;
    photoUrl: string = '';
    name: string = '';
    description: string = '';
    yearOfStart: string = '';
    datePublished: string = '';
    country: string = '';
    city: string = '';
    address: string = '';
    email: string= '';
    phone: string= '';
    website: string= '';


    constructor(init?: MechanicFromValues ) {
        if (init)
        Object.assign(this, init);
    }
}