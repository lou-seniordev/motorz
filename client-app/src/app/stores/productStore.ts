import { IProduct } from '../models/product';
import { observable, action, computed, runInAction } from 'mobx';
// import { SyntheticEvent } from 'react';
// import { history } from '../..';
import agent from '../api/agent';
// import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

// configure({ enforceActions: 'always' });

export default class ProductStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    //--in use--
    @observable loadingInitial = false;
    @observable productRegistry = new Map();
    @observable products: IProduct[] = [];
    @observable product: IProduct | null = null;



    //--probably will be--
    @observable editMode = false;
    @observable submitting = false;

    @observable target = '';

    //--in use--
    @computed get productsByDate() {
        return this.groupProductsByDate(
            Array.from(this.productRegistry.values())
        );
    }


    //--in use--
    groupProductsByDate(products: IProduct[]) {
        const sortedProducts = products.sort(
            (a, b) => Date.parse(a.datePublished) - Date.parse(b.datePublished)
        );
        return Object.entries(
            sortedProducts.reduce((products, product) => {
                const date = product.datePublished.split('T')[0];
                products[date] = products[date]
                    ? [...products[date], product]
                    : [product];
                return products;
            }, {} as { [key: string]: IProduct[] })
        );
    }



    @action loadProducts = async () => {
        this.loadingInitial = true;
        try {
            const products = await agent.Products.list();
            runInAction('loading products', () => {
                products.forEach((product) => {
                    this.productRegistry.set(product.id, product);
                });
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('load products error', () => {
                this.loadingInitial = false;
            });
            console.log(error);
        }
    };

    // //==needed to set the form open
    // @observable threadSellername: string | undefined = '';
    // @observable threadSellernameSet = false;

    // @action setThreadSellername = (sellerName: string) => {
    //     this.threadSellername = sellerName;
    //     this.threadSellernameSet = true;
    //     console.log('sellerName', sellerName)
    //     console.log('it set', this.threadSellername)
    //     console.log('this.threadSellernameSet in product store', this.threadSellernameSet)
    //   }

    // @action unsetThreadSellername = () => {
    //     this.threadSellername = undefined;
    //     this.threadSellernameSet = false;
    //     console.log('it unset to: ', this.threadSellername)
    //     console.log('threadSellernameSet: ', this.threadSellernameSet)
    //   }

    //--in use--
    @action loadProduct = async (id: string) => {
        let product = this.getProduct(id);
        if (product) {
            this.product = product;
            return product;
        } else {
            this.loadingInitial = true;
            try {
                product = await agent.Products.details(id);
                runInAction('getting product', () => {
                    this.product = product;
                    this.productRegistry.set(product.id, product);
                    this.loadingInitial = false;
                    this.product = product;
                    // this.setThreadSellername(product.sellerUsername);
                    // console.log('sellerName in loadproduct', this.threadSellername)

                });
            } catch (error) {
                runInAction('get product error', () => {
                    this.loadingInitial = false;
                    console.log(error);
                });
            }
        }
    };

    //--in use---
    getProduct = (id: string) => {
        return this.productRegistry.get(id);
    };
   
}

