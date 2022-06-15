import { IProductViewer } from './../models/product';
import { IProduct } from '../models/product';
import { observable, action, computed, runInAction, reaction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

const LIMIT = 12;

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
  @observable info: string = 'All products'

  @observable productFollowed = false;


  @action setPredicate = (predicate: string, value: string) => {
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
    }
  }

  @action setInfo = (info: string) => {
    runInAction(() => {
      this.info = info;
    })
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      params.append(key, value)
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
    return Array.from(this.productRegistry.values())

  }

  @action loadProducts = async () => {
    this.loadingInitial = true;

    try {
      const productEnvelope = await agent.Products.list(this.axiosParams);
      // console.log('loadProducts::', this.axiosParams)

      const { products, productCount } = productEnvelope
      // console.log('loadProducts::', products)
      runInAction('loading products', () => {
        products.forEach((product) => {

          this.productRegistry.set(product.id, product);
          // console.log('product:::', product);
        });
        // console.log('products', products);
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
          // console.log('product:::', toJS(product));
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

  //--in use--
  getProduct = (id: string) => {
    return this.productRegistry.get(id);
  };


  @action createProduct = async (product: IProduct) => {
    this.submitting = true;
    try {
      await agent.Products.create(product);
      runInAction('creating product', () => {
        product.viewers = [];
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
        // console.log('this.productRegistry', this.productRegistry)
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
      runInAction('Increasing the number seen counter', () => {
      })
    } catch (error) {
      console.log(error)
    }
  }
  @action markSold = async (id: string, product: IProduct) => {
    try {
      await agent.Products.markSold(id);
      runInAction('Marking the product sold', () => {
        product.isSold = true;
        toast.info('This product is marked as sold!');
      })
    } catch (error) {
      console.log(error)
    }
  }
  @action toogleActivate = async (id: string, product: IProduct) => {
    try {
      await agent.Products.toogleActivate(id);
      runInAction('Marking the product sold', () => {
        product.isActive = true;//!this.product?.isActive;
        toast.info('This product is activated!');
      })
    } catch (error) {
      console.log(error)
    }
  }

  @action setProductFollowed = async () => {
    runInAction(() => {
      this.productFollowed = !this.productFollowed;
    })
  }
  @action followProduct = async (id: string, userName: string, displayName: string) => {
    // console.log("id i", id);

    let product: IProduct = this.getProduct(id);
    let productViewer: IProductViewer = {
      username: userName,
      displayName: displayName,
    }
    product.viewers.push(productViewer)
    try {
      await agent.Products.follow(id);
      runInAction('following product', () => {
        this.productRegistry.set(product.id, product);
        this.productFollowed = true;
      });
    } catch (error) {

      console.log(error);
    }
  };
  @action unfollowProduct = async (id: string) => {
    // console.log("id unfollow", id);

    let product: IProduct = this.getProduct(id);

    try {
      await agent.Products.unfollow(id);
      runInAction('following product', () => {
        this.productRegistry.set(product.id, product);
        this.productFollowed = false;
      });
    } catch (error) {

      console.log(error);
    }
  };

}

