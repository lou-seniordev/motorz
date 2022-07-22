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
import CommentStore from './commentStore';
import CountryStore from './countryStore';
import FeedStore from './feedStore';
import PeopleStore from './peopleStore';
import PrivateMessageStore from './privateMessageStore';
import PresenceStore from './presenceStore';
import AdminStore from './adminStore';

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
    commentStore: CommentStore;
    countryStore: CountryStore;
    feedStore: FeedStore;
    peopleStore: PeopleStore;
    privateMessageStore: PrivateMessageStore;
    presenceStore: PresenceStore;
    adminStore: AdminStore;


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
        this.commentStore = new CommentStore(this);
        this.countryStore = new CountryStore(this);
        this.feedStore = new FeedStore(this);
        this.peopleStore = new PeopleStore(this);
        this.privateMessageStore = new PrivateMessageStore(this);
        this.presenceStore = new PresenceStore(this);
        this.adminStore = new AdminStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());