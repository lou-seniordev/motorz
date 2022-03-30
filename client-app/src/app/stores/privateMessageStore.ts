import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { observable, action, computed, runInAction, toJS } from 'mobx';
// import { toast } from 'react-toastify';
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

    //   @observable messageThreadRegistry = new Map();
    //   @observable message: IMessage | null = null;
    //   @observable loadingMessageThread = false;
    //   @observable messagesFromThread: any = [];
    // @observable receivingList: [string, IPrivateMessage[]] | undefined = undefined;


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

    @computed get messagesByThreadId() {
        return this.groupMessagesByThreadId(Array.from(this.messageRegistry.values()));
    }

    groupMessagesByThreadId(messages: IPrivateMessage[]) {
        //   console.log(toJS(messages))
        const sortedMessages = messages.sort(
            (a, b) => Date.parse(b.dateSent) - Date.parse(a.dateSent)
        )
        return Object.entries(sortedMessages.reduce((messages, message) => {
            const threadId = message.privateMessageThreadId;
            messages[threadId] = messages[threadId] ? [...messages[threadId], message] : [message];
            return messages;
        }, {} as { [key: string]: IPrivateMessage[] }));
    }

    @action createHubConnection = (messageThreadId: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_API_MESSAGE_URL!, {

                accessTokenFactory: () => this.rootStore.commonStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build();

        //!! try await 
        this.hubConnection
            .start()
            .then(() => console.log(this.hubConnection!.state))
            .then(() => {
                console.log('Attempting to join group');
                //!!temp timeout
                setTimeout(() => {

                    this.hubConnection!.invoke('AddToGroup', messageThreadId)
                }, 500);
            })
            .catch(error => console.log('Error establishing connection: ', error));

        this.hubConnection.on('ReceiveMessage', message => {
           
            runInAction(() => {
                this.messageRegistry.set(message.privateMessageThreadId, message);
                this.setView(message.privateMessageThreadId)
            });
        })
        this.hubConnection.on('SendMessage', message => {
            // toast.info(message)
        })
    }

    @action stopHubConnection = (messageThreadId: string) => {
        this.hubConnection?.invoke('RemoveFromGroup', messageThreadId)
            .then(() => {
                this.hubConnection!.stop();
            })
            .then(() => console.log('Connection stopped'))
            .catch(err => console.log(err));
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

        this.listOfMessagesInFocus = this.messagesByThreadId[0]
    }

    @action setView = (id?: string) => {

        runInAction(() => {
            this.index = this.messagesByThreadId.findIndex(m => m[0] === id);
        })
        this.listOfMessagesInFocus = this.messagesByThreadId[this.index];
        return this.listOfMessagesInFocus;
    }




    formatDate(message: IPrivateMessage) {
        const delimiter = '.';
        message.dateSent = message.dateSent?.split(delimiter)[0];
        message.dateSent = message.dateSent.replace('T', ' ');
    }










    @action setRecipient = (username: string, userPhotoUrl: any) => {
        this.recipientUsername = username;
    }
    @action setMessageThreadId = (messageThreadId: string) => {
        this.messageThreadId = messageThreadId
    };
    @action setReply = (content: string) => {
        this.messageContent = content;
    };
    @action setUsername = (username: string) => {
        this.username = username;
    }
    @action sendMessage = async (messageToSend: any) => {
      
        try {
            let message =  await agent.PrivateMessages.create(messageToSend);
            console.log(message);
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
      @action markReadInDB = async (id: string) => {
        try {
          await agent.PrivateMessages.markRead(id);
        } catch (error) {
          console.log(error);
        }
      }

    //   getMessageThread = (id: string) => {
    //     let myArray = Array.from(this.messagesByDate);
    //     let messageThread;
    //     for (let i = 0; i < myArray.length; i++) {
    //       if (myArray[i][0] === id) {
    //         messageThread = myArray[i][1];
    //       }
    //     }
    //     return messageThread;
    //   };



    //   @action deleteThread = async (id: string) => {

    //     try {
    //       await agent.Messages.delete(id);
    //       runInAction('deleting thread', () => {

    //         this.messageRegistry.forEach(m => {
    //           if (m.messageThreadId === id)
    //             this.messageRegistry.delete(m.id);
    //         })
    //       })
    //     } catch (error) {
    //       runInAction('delete error thread', () => {
    //         console.log(error);
    //       });
    //     }
    //   }



    //   @action setReply = (messageThread: IPrivateMessage[]) => {
    //     messageThread.forEach((messages) => {

    //       this.messageThreadId = messages.privateMessageThreadId;
    //       if (this.username === messages.recipientUsername) {
    //         this.recipientUsername = messages.senderUsername
    //       } else {
    //         this.recipientUsername = messages.recipientUsername;
    //       }
    //     })

    //   };

    //   @action loadMessageThread = async (id: string) => {

    //     let messageThread = this.getMessageThread(id);
    //     if (messageThread) {
    //       this.messagesFromThread = messageThread;
    //       this.setReply(messageThread)
    //     } else {
    //       this.loadingMessageThread = true;
    //       try {
    //         messageThread = await agent.Messages.thread(id);
    //         runInAction('getting messages', () => {
    //           messageThread?.map(message => {
    //             this.formatDate(message)
    //           })
    //           this.messagesFromThread = messageThread;
    //           this.loadingMessageThread = false;
    //         });
    //         this.setReply(messageThread)
    //         return messageThread;
    //       } catch (error) {
    //         runInAction('error get messages', () => {
    //           this.loadingMessageThread = false;
    //         });
    //         console.log(error);
    //       }
    //     }
    //   };

    //   @action cleanMessage = () => {
    //     this.recipientUsername = '';
    //     this.productId = '';

    //   };

    
}



