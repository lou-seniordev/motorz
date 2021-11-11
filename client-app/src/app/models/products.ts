export interface IProduct {
    id: string;
    title: string;
    model: string;
    description: string;
    price: string;
    brand: string;
    category: string;
    isActive: boolean;
    isAdvertised: boolean;
    // datePublished: Date;
    datePublished: string;
    dateActivated: Date;
    dateAdvertised: Date;
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
  