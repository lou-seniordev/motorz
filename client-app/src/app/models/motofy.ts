export interface IMotofy {
    id?: string;
    name: string;
    brand: string;
    model: string;
    cubicCentimeters: string;
    photoUrl?: string | null;
    description?: string;
    yearOfProduction?: string;// Date;
    datePublished?: string;
    city: string;
    country: string;
    pricePaid: string;
    estimatedValue: string;
    numberOfKilometers: string; 
    embraced: boolean;
    isOwner: boolean;
    embracers: IEmbracer[];
}

export interface IMotofyFormValues extends Partial<IMotofy> {

}

export class MotofyFormValues implements IMotofyFormValues {
    id?: string = '';
    name: string = '';
    brand: string= '';
    model: string= '';
    cubicCentimeters: string= '';
    photoUrl: string  = '';
    description: string= '';
    yearOfProduction: string= '';
    // datePublished?: Date = undefined;
    datePublished?: string= '';
    city: string= '';
    country: string= '';
    pricePaid: string= '';
    estimatedValue: string= '';
    numberOfKilometers: string= '';

    constructor(init?: MotofyFormValues ) {
        if (init)
        Object.assign(this, init);
    }
} 

export interface IEmbracer {
    username: string;
    displayName: string;
    image: string;
    isOwner: boolean;
}

