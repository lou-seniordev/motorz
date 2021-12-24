import { IProduct } from '../models/product';
import { observable, action, computed, runInAction } from 'mobx';
// import { SyntheticEvent } from 'react';
import { history } from '../..';
import agent from '../api/agent';
import { toast } from 'react-toastify';
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
  // @observable editMode = false;
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
          console.log('sellerName in loadproduct', product)

        });
        return product;
      } catch (error) {
        runInAction('get product error', () => {
          this.loadingInitial = false;
          console.log(error);
        });
      }
    }
  };

  //--in use---???check
  getProduct = (id: string) => {
    return this.productRegistry.get(id);
  };


  @action createProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.create(product);
      runInAction('creating products', () => {
        this.productRegistry.set(product.id, product);
        // this.editMode = false;
        this.submitting = false;
      });
      history.push(`/product/${product.id}`)
    } catch (error) {
      runInAction('create product error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      // console.log(error.response);
    }
  };

  @action editProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      // console.log('product', product);
      await agent.Products.update(product);
      runInAction('creating product', () => {
        this.productRegistry.set(product.id, product);
        this.product = product;
        // this.editMode = false;
        this.submitting = false;
      });
      history.push(`/product/${product.id}`)
    } catch (error) {
      runInAction('create product error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      // console.log(error.response);
    }
  };

  @action deleteProduct = async (
    id: string
  ) => {
    this.submitting = true;
    try {
      await agent.Products.delete(id);
      runInAction('deleting product', () => {
        this.productRegistry.delete(id);
        console.log('this.productRegistry', this.productRegistry)
        this.submitting = false;
      });
    } catch (error) {
      runInAction('delete product error', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

}

