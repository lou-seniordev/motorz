export interface IProductsEnvelope {
  products: IProduct[];
  productCount: number;
}

export interface IProduct {
  id: string;
  sellerId: string;
  sellerUsername: string;
  sellerDisplayName: string;
  title: string;
  model: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  countryName: string;
  countryId: string;
  city: string;
  phoneNumber: string;
  isActive: boolean;
  isSold: boolean;
  isAdvertised: boolean;
  numberSeen: number;
  numberFollowed: number;
  viewers: IProductViewer [];
  datePublished: string;
  dateActivated: Date;
  advertisingEndDate?: Date;
  inactivityExpirationDate: Date;
  dateAdvertised: Date;
  typeAdvertising: string;
  photoUrl: string;
  file: Blob;
}
export interface IAdminProduct {
  id: string;
  sellerDisplayName: string;
  title: string;
  model: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  city: string;
  countryName: string;
  phoneNumber: string;
  isActive: boolean;
  isSold: boolean;
  isAdvertised: boolean;
  numberSeen: number;
  numberFollowed: number;
  viewers: IProductViewer [];
  datePublished: string;
  dateActivated: Date;
  dateAdvertised: Date;
  advertisingEndDate?: Date;
  typeAdvertising: string;
  photoUrl: string;
}

export interface IProductViewer {
  dateStarted?: Date;
  displayName: string;
  image?: string;
  username: string;
}

export class ProductFormValues {
  id: string;
  sellerId: string = '';
  sellerUsername: string = '';
  title: string = '';
  model: string = '';
  description: string = '';
  price: string = '';
  brand: string = '';
  category: string = '';
  countryName: string;
  countryId: string;
  city: string = '';
  phoneNumber: string = '';
  isActive: boolean;
  isAdvertised: boolean;
  datePublished: string = '';
  dateActivated: Date;
  dateAdvertised: Date;
  photoUrl: string = '';
  file: Blob;


  constructor(init?: ProductFormValues) {
    if (init)
      Object.assign(this, init);
  }
}
