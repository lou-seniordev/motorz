export interface IProduct {
    id: string;
    sellerId: string;
    sellerUsername: string;
    title: string;
    model: string;
    description: string;
    price: string;
    brand: string;
    category: string;
    isActive: boolean;
    isAdvertised: boolean;
    datePublished: string;
    dateActivated: Date;
    dateAdvertised: Date;
    photoUrl: string;
  }
  
//   export class ProductFormValues {
//     id?: string;
//     title: string = '';
//     body: string = '';
//     // dateAdded: Date = '';
//     dateAdded: string = '';
//     // displayName: string = '';
//     category: string = '';
  
//     constructor(init?: ProductFormValues) {
//       if (init)
//         Object.assign(this, init);
//     }
//   }
  