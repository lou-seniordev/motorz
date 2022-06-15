import { HubConnection, HubConnectionBuilder
    // , LogLevel 
} from '@microsoft/signalr';
import { action, observable, runInAction } from 'mobx';
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