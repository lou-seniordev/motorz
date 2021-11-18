import { configure } from 'mobx';
import { createContext } from 'react';
import ActivityStore from './activityStore';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import UserStore from './userStore';
import ForumPostStore from './forumPostStore';
import MotofyStore from './motofyStore';
import MechanicStore from './mechanicStore';
import BrandStore from './brandStore';
import ProductStore from './productStore';
import MessageStore from './messageStore';

// === mobx === //
configure({ enforceActions: 'always' });


export class RootStore {
    activityStore: ActivityStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    forumPostStore: ForumPostStore;
    motofyStore: MotofyStore;
    mechanicStore: MechanicStore;
    brandStore: BrandStore;
    productStore: ProductStore;
    messageStore: MessageStore;


    constructor () {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
        this.forumPostStore = new ForumPostStore(this);
        this.motofyStore = new MotofyStore(this);
        this.mechanicStore = new MechanicStore(this);
        this.brandStore = new BrandStore(this);
        this.productStore = new ProductStore(this);
        this.messageStore = new MessageStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());