import { action, computed, observable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { IUser, IUserFormValues } from '../models/user';
import { RootStore } from './rootStore';

export default class UserStore {

    refreshTokenTimeout: any;

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
            this.rootStore.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
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
            this.rootStore.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
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
        try {
            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            this.startRefreshTokenTimer(user);
            this.rootStore.modalStore.closeModal();
            history.push('/activities');
        } catch (error) {
            throw error;
        }
    }

    @action refreshToken = async () => {
        this.stopRefreshTokenTimer();
        try {
          const user = await agent.User.refreshToken();
          runInAction(() => {
            this.user = user;
          })
          this.rootStore.commonStore.setToken(user.token);
          this.startRefreshTokenTimer(user);
        } catch (error) {
          console.log(error);
        }
      }

    private startRefreshTokenTimer(user: IUser) {
        const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
      }
    
      private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
      }
}