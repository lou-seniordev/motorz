export interface IMotofy {
    id: string;
    name: string;
    brand: string;
    model: string;
    cubicCentimeters: string;
    photoUrl?: string | null;
    description?: string;
    yearOfProduction?: string;// Date;
    datePublished: string; // Date | undefined;
    city: string;
    country: string;
    pricePaid?: string;
    estimatedValue?: string;
    numberOfKilometers?: string;
}