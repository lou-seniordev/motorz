import { IProduct } from '../models/product';
import { observable, action, computed, runInAction, reaction } from 'mobx';
// import { SyntheticEvent } from 'react';
import { history } from '../..';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

const LIMIT = 5;

export default class ProductStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.productRegistry.clear();
        this.loadProducts();
      }
    )
  }
  //--in use--
  @observable loadingInitial = false;
  @observable productRegistry = new Map();
  @observable products: IProduct[] = [];
  @observable product: IProduct | null = null;

  @observable productCount = 0;
  @observable page = 0;
  @observable predicate = new Map();


  @action setPredicate = (predicate: string, value: string  ) => { 
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
    }
  }

  @computed get axiosParams () {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
        params.append(key, value )
    })
    return params;
  }  

  @computed get totalPages() {
    return Math.ceil(this.productCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  }
  //--probably will be--
  @observable submitting = false;

  @observable target = '';

  @computed get productsByDate() {
    return Array.from(this.productRegistry.values()).sort(
      (a, b) => Date.parse(a.datePublished) - Date.parse(b.datePublished)
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
      const productEnvelope = await agent.Products.list(this.axiosParams);
      const {products, productCount} = productEnvelope
      runInAction('loading products', () => {
        products.forEach((product) => {
          this.productRegistry.set(product.id, product);
        });
        console.log('products', products);
        this.productCount = productCount; 
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
      runInAction('creating product', () => {
        this.productRegistry.set(product.id, product);
        this.submitting = false;
      });
      history.push(`/product/${product.id}`)
    } catch (error) {
      runInAction('create product error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
    }
  };

  @action editProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.update(product);
      runInAction('editing product', () => {
        this.productRegistry.set(product.id, product);
        this.product = product;
        this.submitting = false;
      });
      history.push(`/product/${product.id}`)
    } catch (error) {
      runInAction('create product error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error);
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

  @action visitCounter = async (id: string) => {
    try {
      await agent.Products.visitCounter(id);
      runInAction('increasing the number seen counter', () => {
      })
    } catch (error) {
      console.log(error)
    }
  }

}

