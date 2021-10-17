// import { IMotofy } from './motofy';
export interface IBrand {
    id: string,
    name : string,
    dateOfEstablishment : string,
    logoUrl : string,
    landOfOrigin : string,
    cityOfOrigin : string,
}
// export interface IBrandToSelect {
//     text: string,
//     value : string,
// }

export interface IBrandFormValues extends Partial<IBrand>{

}

export class BrandFormValues implements IBrandFormValues {

    id: string = '';
    name : string = '';
    key: string = this.name;
    
    constructor(init?: BrandFormValues ) {
        if (init)
        Object.assign(this, init);
    }
}