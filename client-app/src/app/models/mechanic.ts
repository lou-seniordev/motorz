import { IComment } from "./comment";

export interface IMechanicsEnvelope {
    mechanics: IMechanic[];
    mechanicCount: number;
}
export interface IMechanic {
    id: string;
    // author: string | null;
    photoUrl: string | null;
    name: string;
    publisher: string;
    publisherUsername: string;
    owner: string;
    description: string;
    yearOfStart: string;//Date;
    datePublished: string;// Date | undefined;
    country: string;
    countryName: string;
    countryId: string;
    city: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    commentMechanics: IComment[];
    file: Blob;
    customers: IMechanicCustomer[];
    averageRating: string;
    ratings: IRating[];
    brands: any;

}

export interface IRating {
    username: string;
    displayName: string;
    score: string;
}

export interface IMechanicCustomer {
    username: string;
    displayName: string;
    image: string;
    isOwner: boolean;
    isCustomer: boolean;
    customerRecommended: boolean;
    testimonial?: IMechanicTestimonial;             
}
export interface IMechanicCustomerToBecome {
    mechanicId: string;
    isCustomer: boolean;             
}

export interface IMechanicTestimonial {
    id: string;
    text: string;
    dateAdded: string;
}

export interface IMechanicRate {
    id: string;
    score: string;
}
export interface IMechanicRecommend {
    mechanicId: string;
    isRecommended: string;
}


export class MechanicFromValues {
    id?: string;
    photoUrl: string = '';
    name: string = '';
    owner: string = '';
    description: string = '';
    yearOfStart: string = '';
    datePublished: string = '';
    country: string = '';
    countryName: string= '';
    countryId: string= '';
    city: string = '';
    address: string = '';
    email: string= '';
    phone: string= '';
    website: string= '';
    customers: IMechanicCustomer[];
    file: Blob;
    brands = [] ;



    constructor(init?: MechanicFromValues ) {
        if (init)
        Object.assign(this, init);
    }
}