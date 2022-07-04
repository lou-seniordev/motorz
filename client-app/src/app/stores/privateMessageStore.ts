import { IPrivateMessageToDelete, IPrivateMessageToEdit } from './../models/privatemessages';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { observable, action, computed, runInAction } from 'mobx';
import { history } from '../..';

import agent from '../api/agent';
import { RootStore } from './rootStore';
import { IPrivateMessage } from '../models/privatemessages';


const LIMIT = 10;

export default class PrivateMessageStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

    }

    @observable username: string = '';
    @observable senderPhotoUrl: string;

    @observable messageRegistry = new Map();
    @observable loadingInitial = false;
    @observable recipientUsername: any = '';

    @observable messageThreadId: string;
    @observable messageContent: string;

    @observable messageThreadsCount = 0;
    @observable page = 0;
    @observable totalPages = 0;


    @observable listOfMessagesInFocus: [string, IPrivateMessage[]] | undefined = undefined;
    @observable index: number;
    @observable.ref hubConnection: HubConnection | null = null;

    @observable otherUser: string = '';

    @action setOtherUser = async (otherUser: string) => {
        runInAction(() => {
            this.otherUser = otherUser;
        })
    }
    @action cleanOtherUser = () => {
        runInAction(() => {
            this.otherUser = '';
        })
    }

    @computed get messagesByThreadId() {
        return this.groupMessagesByThreadId(Array.from(this.messageRegistry.values()));
    }

    groupMessagesByThreadId(messages: IPrivateMessage[]) {
        const sortedMessages = messages.sort(
            (a, b) => Date.parse(b.dateSent) - Date.parse(a.dateSent)
        )
        return Object.entries(sortedMessages.reduce((messages, message) => {
            const threadId = message.privateMessageThreadId;
            messages[threadId] = messages[threadId] ? [...messages[threadId], message] : [message];
            return messages;
        }, {} as { [key: string]: IPrivateMessage[] }));
    }

    @action createHubConnection = ( otherUsername: string) => {//messageThreadId: string
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_API_MESSAGE_URL! + '?user=' + otherUsername, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
                accessTokenFactory: () => this.rootStore.commonStore.token!

            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection
            .start()
            .catch(error => console.log('Error establishing connection: ', error));

        this.hubConnection.on('ReceiveMessage', message => {

            runInAction(() => {
                this.messageRegistry.set(message.id, message);

            });
            this.setViewUponNewMessage(message.privateMessageThreadId)
        })
        this.hubConnection.on('MessageDeleted', (messageToDelete: IPrivateMessageToDelete) => {

            runInAction(() => {
                this.messageRegistry.delete(messageToDelete.id);
            })
            this.setView(messageToDelete.privateMessageThreadId)
        })


        this.hubConnection.on('MessageEdited', (messageToEdit: IPrivateMessageToEdit) => {

            this.resetViewAfterEdit(messageToEdit);
        })

    }

    @action stopHubConnection = () => {

        this.hubConnection?.stop();
    }

    @action addReply = async () => {

        let messageToSend = {
            recipientUsername: this.recipientUsername,
            content: this.messageContent,
            privateMessageThreadId: this.messageThreadId,
            username: this.username
        }

        try {
            await this.hubConnection!.invoke('SendMessage', messageToSend);
        } catch (error) {
            console.log(error);
        }
    };

    @action deleteSingleMessage = async (id: string, privateMessageThreadId: string, recipientUsername: string) => {

        let messageToSend = {
            id,
            privateMessageThreadId,
            recipientUsername
        }
        try {
            await this.hubConnection!.invoke('DeleteMessage', messageToSend)

        } catch (error) {
            console.log(error);
        }
    }
    @action editMessage = async (id: string, privateMessageThreadId: string, content: string, recipientUsername: string, senderPhotoUrl: string) => {
        
        let messageToEdit = {
            id,
            privateMessageThreadId,
            content,
            recipientUsername,
            senderPhotoUrl
        }
        try {
            await this.hubConnection!.invoke('EditMessage', messageToEdit)

        } catch (error) {
            console.log(error);
        }
    }

    @action loadMessages = async () => {
        this.loadingInitial = true;
        try {

            const messagesEnvelope = await agent.PrivateMessages.list(LIMIT, this.page);
            const { privateMessages, privateMessageThreadsCount, totalPages } = messagesEnvelope;
            runInAction('loading messages', () => {
                privateMessages.forEach((message) => {
                    this.formatDate(message);
                    this.messageRegistry.set(message.id, message);
                });
                this.messageThreadsCount = privateMessageThreadsCount;

                this.totalPages = totalPages;
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('load messages error', () => {
                this.loadingInitial = false;
            });
            console.log(error);
        }
    };
    @action setPage = (page: number) => {
        this.page = page;
    }


    @action setInitialView = () => {
        runInAction(() => {

            this.listOfMessagesInFocus = this.messagesByThreadId[0]
        })
    }

    @action setView = (id?: string) => {

        runInAction(() => {
            this.index = this.messagesByThreadId.findIndex(m => m[0] === id);
            this.listOfMessagesInFocus = this.messagesByThreadId[this.index];
        })
        return this.listOfMessagesInFocus;
    }
    @action setViewUponNewMessage = (id?: string) => {

        this.index = this.messagesByThreadId.findIndex(m => m[0] === id);

        runInAction(() => {
            if(this.listOfMessagesInFocus![0] === id){
                this.listOfMessagesInFocus = this.messagesByThreadId[this.index];
            }
        })
    }


    private resetViewAfterEdit(messageToEdit: IPrivateMessageToEdit) {
        runInAction(() => {
            var index = this.listOfMessagesInFocus![1].findIndex(m => m.id === messageToEdit.id);
            this.listOfMessagesInFocus![1][index].content = messageToEdit.content;
        });
    }

    private formatDate(message: IPrivateMessage) {
        const delimiter = '.';
        message.dateSent = message.dateSent?.split(delimiter)[0];
        message.dateSent = message.dateSent.replace('T', ' ');
    }

    @action markReadInDB = async (id: string) => {
        try {
            await agent.PrivateMessages.markRead(id);
            runInAction(() => {
                this.listOfMessagesInFocus?.[1].forEach((messages: IPrivateMessage) => {
                    if (messages.dateRead === null) {
                        messages.dateRead = new Date().toISOString()
                    }
                })
            })
        } catch (error) {
            console.log(error);
        }
    }


    @action setRecipient = (username: string, userPhotoUrl: any) => {
        this.recipientUsername = username;
    }
    @action setMessageThreadId = (messageThreadId: string) => {
        this.messageThreadId = messageThreadId;
    };
    @action setReply = (content: string) => {
        this.messageContent = content;
    };
    @action setUsername = (username: string) => {
        this.username = username;

    }
    @action sendMessage = async (messageToSend: any) => {

        try {
            await agent.PrivateMessages.create(messageToSend);

            runInAction('loading message ', () => {
                this.rootStore.modalStore.closeModal();
            });
            history.push('/privateMessages');
        } catch (error) {
            runInAction('load thread error', () => {
            });
            console.log(error);
        }
    };
}



