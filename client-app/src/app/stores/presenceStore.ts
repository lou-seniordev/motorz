import {
    HubConnection, HubConnectionBuilder
    // , LogLevel 
} from '@microsoft/signalr';
import { action, computed, observable, runInAction } from 'mobx';
import agent from '../api/agent';
// import { toast } from 'react-toastify';
// import { history } from '../..';
// import agent from '../api/agent';
// import { IUser, IUserFormValues } from '../models/user';
import { RootStore } from './rootStore';


export default class PresenceStore {


    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable.ref hubConnection: HubConnection | null = null;

    @observable onlineUsersSource: string[] = [];
    @observable onlineUsers: string[] = []

    @observable counterUnread: number = 0;

    @observable counterUnreadItems = new Set();
    @observable unreadItems: string[] = [];

    @computed get unreadIncomingMessages() {
        return this.unreadItems.length;
    }
    // @computed set markMessagesRead(username:string) {
    //     // return this.unreadItems.length;
    //     console.log(username)
    //     // console.log(this.unreadItems)
    // }

    @action markReadNavbar = async (username: string) => {
 
        console.log('HERE NAMES BEFORE', this.unreadItems)
        runInAction(() => {
            const index = this.unreadItems.indexOf(username);
            if (index > -1) { 
                this.unreadItems.splice(index, 1); 
              }
            console.log('HERE NAMES AFTER', this.unreadItems)
        })
    }

    @action getUnreadItems = async () => {

        try {
            const result = await agent.PrivateMessages.checkUnread();
       
            runInAction(() => {
                if (result) {
                    this.unreadItems = result;
                    // console.log(this.unreadItems)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    @action createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_API_PRESENCE_URL!, {
                // .withUrl('http://localhost:5000/presence', {

                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .withAutomaticReconnect()
            // .configureLogging(LogLevel.Information) 
            .build();

        this.hubConnection
            .start()
            // .then(() => console.log(this.hubConnection!.state))
            // .then(() => {
            //     // console.log('Attempting to join group');
            //     //!!temp timeout
            //     // setTimeout(() => {
            //         this.hubConnection!.invoke('AddToGroup', this.rootStore.userStore.user!)
            //     // }, 300);
            // })
            .catch(error => console.log('Error establishing connection: ', error));

        // this.hubConnection.on('UserIsOnline', username => {
        //     // console.log('message :::', username)
        //     toast.info(username + ' has connected')

        //     // runInAction(() => {


        //     // });
        // });

        // this.hubConnection.on('UserIsOffline', username => {
        //     toast.warning(username + ' has disconnected')
        // });

        this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
            // toast.success(usernames + ' are present')
            runInAction(() => {
                // this.onlineUsersSource = usernames;
                this.onlineUsers = usernames;
                //  console.log('onlineUsersSource', this.onlineUsersSource)

            })
        })
        this.hubConnection.on('NewMessageReceived', ({ username }) => {

            // console.log(username + ' has sent you a new message');

            // this.counterUnreadItems.add(username);
            runInAction(() => {
                // this.unreadItems.push(username)
                // console.log("this.counterUnreadItems: ", this.counterUnreadItems.size);
                if (this.unreadItems.indexOf(username) === -1) {
                    this.unreadItems.push(username);
                }
            })
            // console.log("this.unreadItems: ",this.unreadItems.length);
            // console.log("this.unreadItemss: ", this.unreadItems.length);

        })
    }

    @action stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log(error))
        // this.hubConnection?.invoke('RemoveFromGroup', messageThreadId)
        //     .then(() => {
        //         this.hubConnection!.stop();
        //     })
        //     .then(() => console.log('Connection stopped'))
        //     .catch(err => console.log(err));
    }

    // @observable user: IUser | null = null;

    // @computed get isLoggedIn() {return !! this.user};

    // @action login = async (values: IUserFormValues) => {
    //     try {
    //         const user = await agent.User.login(values);
    //         runInAction(() => {
    //             this.user = user;
    //         });
    //         this.rootStore.commonStore.setToken(user.token);
    //         this.rootStore.modalStore.closeModal();
    //         history.push('/activities');

    //     } catch (error) {
    //         throw error
    //     }
    // }
    // @action getUser = async () => {
    //     try {
    //         const user = await agent.User.current();
    //         runInAction(() => {
    //             this.user = user;
    //         });
    //         // this.rootStore.commonStore.setToken(user.token);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // @action logout = () => {
    //     this.rootStore.commonStore.setToken(null);
    //     this.user = null;
    //     history.push('/')
    // }

    // @action register = async (values: IUserFormValues) => {

    //     try {
    //         await agent.User.register(values);
    //         this.rootStore.modalStore.closeModal();
    //         history.push(`/user/registerSuccess?email=${values.email}`);
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}