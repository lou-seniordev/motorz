import { IComment } from "./comment";

export interface IMotofyEnvelope {
    motofies: IMotofy[];
    motofyCount: number;
    mostEmbraced: IMotofy;
    highestRatedMotofy: IMotofy;
}
export interface IMotofy {
    id: string;
    name: string;
    brandId: string;
    brandName: string;
    brandLogoUrl: string;
    model: string;
    cubicCentimeters: string;
    photoUrl?: string | null;
    description?: string;
    yearOfProduction?: string;// Date;
    datePublished?: string;
    city: string;

    countryName: string;
    countryId: string;

    pricePaid: string;
    estimatedValue: string;
    numberOfKilometers: string; 
    embraced: boolean;
    isOwner: boolean;
    embracers: IEmbracer[];
    commentMotofies: IComment[];
    file: Blob;

    motofyScores: any[];
    averageRating: string;
}

export interface IMotofyFormValues extends Partial<IMotofy>{//, Partial<IBrand> 

}

export class MotofyFormValues implements IMotofyFormValues {
    id?: string = '';
    name: string = '';
    // brand: string= '';
    brandId: string= '';
    brandName: string= '';
    model: string= '';
    cubicCentimeters: string= '';
    photoUrl: string  = '';
    description: string= '';
    yearOfProduction: string= '';
    // datePublished?: Date = undefined;
    datePublished?: string= '';
    city: string= '';
    countryName: string= '';
    countryId: string= '';
    pricePaid: string= '';
    estimatedValue: string= '';
    numberOfKilometers: string= '';
    // file: IPhoto;
    // brands?: IBrand[];

    constructor(init?: MotofyFormValues ) {//, brandsToSelect?: IBrand[]
        if (init ) {//&& brandsToSelect
            // init.brands = brandsToSelect;
        }
        Object.assign(this, init);
    }
} 

export interface IEmbracer {
    username: string;
    displayName: string;
    image: string;
    isOwner: boolean;
    following?: boolean;
}

export interface IRateMotofy {
    id: string;
    score: string | number | undefined;
}

export interface IMotofyScore {
    username: string | undefined;
    displayName: string | undefined;
    score: string | number | undefined;
}

