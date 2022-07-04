import {
    HubConnection, HubConnectionBuilder, LogLevel
} from '@microsoft/signalr';
import { action, computed, observable, runInAction } from 'mobx';
import agent from '../api/agent';
import PrivateMessageStore from './privateMessageStore';
import { RootStore } from './rootStore';


export default class PresenceStore {


    rootStore: RootStore;
    privateMessageStore: PrivateMessageStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.privateMessageStore = rootStore.privateMessageStore;
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


    @action markReadNavbar = async (username: string) => {

        runInAction(() => {
            const index = this.unreadItems.indexOf(username);
            if (index > -1) {
                this.unreadItems.splice(index, 1);
            }
        })
    }

    @action getUnreadItems = async () => {

        try {
            const result = await agent.PrivateMessages.checkUnread();

            runInAction(() => {
                if (result) {
                    this.unreadItems = result;
                }
            })
        } catch (error) {
            console.log(error)
        }
    }


    @action createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_API_PRESENCE_URL!, {

                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection
            .start()
            .catch(error => console.log('Error establishing connection: ', error));


        this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
            runInAction(() => {
                this.onlineUsers = usernames;

            })
        })
        this.hubConnection.on('NewMessageReceived', message => {

            // console.log(message.senderDisplayName + ' has sent you a new message');


            runInAction(() => {
                if (this.unreadItems.indexOf(message.senderUsername) === -1) {
                    this.unreadItems.push(message.senderUsername);
                }
                this.privateMessageStore.messageRegistry.set(message.id, message);
            })

        })
    }

    @action stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log(error))
    }

}