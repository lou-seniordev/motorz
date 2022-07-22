import { action, computed, observable, runInAction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { IUser, IUserFormValues } from '../models/user';
import { RootStore } from './rootStore';


export default class UserStore {


    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {return !!this.user};

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
                const claims = JSON.parse(atob(user.token.split('.')[1]));
                const roles = claims['role']
                this.user.userRoles = roles;
            });
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            //==01
            this.rootStore.presenceStore.createHubConnection();
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
                const claims = JSON.parse(atob(user.token.split('.')[1]));
                const roles = claims['role']
                this.user.userRoles = roles;
            });
        } catch (error) {
            console.log(error);
        }
    }
    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        //==02
        this.rootStore.presenceStore.stopHubConnection();
        history.push('/')
    }

    @action register = async (values: IUserFormValues) => {

        try {
            await agent.User.register(values);
            this.rootStore.modalStore.closeModal();
            history.push(`/user/registerSuccess?email=${values.email}`);
        } catch (error) {
            throw error;
        }
    }

    @action handleForgottenPassword = async (values: IUserFormValues) => {

        try {
            await agent.User.handleForgottenPassword(values.email);
            this.rootStore.modalStore.closeModal();
            history.push(`/user/SendRequestResetPasswordSuccess?email=${values.email}`);
        } catch (error) {
            throw error;
        }
    }

    @action resetPassword = async (token: string, email: string, password: string) => {

        try {
            await agent.User.resetPassword(token, email, password);
            history.push(`/`);
        } catch (error) {
            throw error;
        }
    }
}