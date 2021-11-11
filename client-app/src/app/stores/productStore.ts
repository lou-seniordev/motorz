import { IProduct } from '../models/product';
import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { history } from '../..';
import agent from '../api/agent';
import { IForumpost } from '../models/forumpost';
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

    //--and not--
    @observable forumPostRegistry = new Map();

    @observable forumposts: IForumpost[] = [];
    @observable forumpost: IForumpost | null = null;
    
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

    groupForumpostsByDate(forumposts: IForumpost[]) {
        const sortedForumposts = forumposts.sort(
            (a, b) => Date.parse(a.dateAdded) - Date.parse(b.dateAdded)
        );
        return Object.entries(
            sortedForumposts.reduce((forumposts, forumpost) => {
                const date = forumpost.dateAdded.split('T')[0];
                forumposts[date] = forumposts[date]
                    ? [...forumposts[date], forumpost]
                    : [forumpost];
                return forumposts;
            }, {} as { [key: string]: IForumpost[] })
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

    @action loadForumPost = async (id: string) => {
        let forumpost = this.getForumPost(id);
        if (forumpost) {
            this.forumpost = forumpost;
            return forumpost;
        } else {
            this.loadingInitial = true;
            try {
                forumpost = await agent.Forumposts.details(id);
                runInAction('getting forumpost', () => {
                    this.forumpost = forumpost;
                    this.forumPostRegistry.set(forumpost.id, forumpost);
                    this.loadingInitial = false;
                });
                this.forumpost = forumpost;
            } catch (error) {
                runInAction('get forumpost error', () => {
                    this.loadingInitial = false;
                    console.log(error);
                });
            }
        }
    };

    @action clearForumPost = () => {
        this.forumpost = null;
    };

    getForumPost = (id: string) => {
        return this.forumPostRegistry.get(id);
    };

    @action createForumpost = async (forumpost: IForumpost) => {
        this.submitting = true;
        try {
            await agent.Forumposts.create(forumpost);
            runInAction('creating forumposts', () => {
                this.forumPostRegistry.set(forumpost.id, forumpost);
                // this.editMode = false;
                this.submitting = false;
            });
            history.push(`/forum/${forumpost.id}`);
        } catch (error) {
            runInAction('create forumpost error', () => {
                this.submitting = false;
            });
            toast.error('Problem submitting data');
            console.log(error);
        }
    };
    @action editForumpost = async (forumpost: IForumpost) => {
        this.submitting = true;
        try {
            await agent.Forumposts.update(forumpost);
            runInAction('editing forumpost', () => {
                this.forumPostRegistry.set(forumpost.id, forumpost);
                this.forumpost = forumpost;
                this.editMode = false;
                this.submitting = false;
            });
            history.push(`/forum/${forumpost.id}`);
        } catch (error) {
            runInAction('edit forumpost error', () => {
                this.submitting = false;
            });
            console.log(error);
        }
    };

    @action deleteForumpost = async (
        event: SyntheticEvent<HTMLButtonElement>,
        id: string
    ) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        try {
            await agent.Forumposts.delete(id);
            runInAction('deleting forumpost', () => {
                this.forumPostRegistry.delete(id);
                this.submitting = false;
                this.target = '';
            });
        } catch (error) {
            runInAction('delete forumpost error', () => {
                this.submitting = false;
                this.target = '';
            });
            console.log(error);
        }
    };

    @action openCreateForm = () => {
        this.editMode = true;
        this.forumpost = null;
    };

    @action openEditForm = (id: string) => {
        this.forumpost = this.forumPostRegistry.get(id);
        this.editMode = true;
    };

    @action cancelSelectedForumpost = () => {
        this.forumpost = null;
    };

    @action cancelFormOpen = () => {
        this.editMode = false;
        // TODO: GO BACK WHEREVER YOU WERE
    };

    @action selectForum = (id: string) => {
        this.forumpost = this.forumPostRegistry.get(id);
        this.editMode = false;
    };
}

// export default createContext(new ForumPostStore());
