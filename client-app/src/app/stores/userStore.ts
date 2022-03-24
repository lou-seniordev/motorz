import { action, computed, observable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { IUser, IUserFormValues } from '../models/user';
import { RootStore } from './rootStore';
import { v4 as uuid } from "uuid";


export default class UserStore {

    // refreshTokenTimeout: any;

    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {return !! this.user};

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            });
            // this.rootStore.commonStore.setToken(user.token);
            // this.startRefreshTokenTimer(user);
            this.rootStore.modalStore.closeModal();
            history.push('/activities');
            
        } catch (error) {
            throw error
        }
    }
    @action getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
            });
            // this.rootStore.commonStore.setToken(user.token);
            // this.startRefreshTokenTimer(user);
        } catch (error) {
            console.log(error);
        }
        // console.log(this.user?.userName);
    }
    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/')
    }
    
    @action register = async (values: IUserFormValues) => {
        const { addFeedItem } = this.rootStore.feedStore;

        // console.log(values)
        try {
            const user = await agent.User.register(values);
            this.rootStore.modalStore.closeModal();
            addFeedItem(uuid(), "Registered", values.userName!)
            history.push('/activities');
        } catch (error) {
            throw error;
        }
    }
}