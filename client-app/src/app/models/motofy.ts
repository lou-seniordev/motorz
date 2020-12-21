export interface IMotofy {
    id?: string;
    name: string;
    brand: string;
    model: string;
    cubicCentimeters: string;
    photoUrl?: string | null;
    description?: string;
    yearOfProduction?: string;// Date;
    // datePublished?: Date;// = undefined;//string; 
    datePublished?: string;
    city: string;
    country: string;
    pricePaid: string;
    estimatedValue: string;
    numberOfKilometers: string;
}

export interface IMotofyFormValues extends Partial<IMotofy> {

}

export class MotofyFormValues implements IMotofyFormValues {
    id?: string = '';
    name: string = '';
    brand: string= '';
    model: string= '';
    cubicCentimeters: string= '';
    photoUrl: string | null = '';
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