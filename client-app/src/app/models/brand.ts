export interface IBrand {
    id: string,
    name : string,
    dateOfEstablishment : string,
    logourl : string,
    landOfOrigin : string,
    cityOfOrigin : string,
}

// export interface IBrandFormValues extends Partial<IBrand>{

// }

// export class BrandFormValues implements IBrandFormValues {

//     id: string = '';
//     name : string = '';
//     key: string = this.name;
    
//     constructor(init?: BrandFormValues ) {
//         if (init)
//         Object.assign(this, init);
//     }
// }