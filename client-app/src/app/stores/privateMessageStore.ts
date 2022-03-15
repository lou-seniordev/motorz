import { IMessage } from './../models/message';
import { observable, action, computed, runInAction, toJS, reaction } from 'mobx';

import agent from '../api/agent';
import { RootStore } from './rootStore';

import { v4 as uuid } from 'uuid';
import { IPrivateMessage } from '../models/privatemessages';


const LIMIT = 4;

export default class PrivateMessageStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

    }

    @observable username: string = '';
    @observable senderPhotoUrl: string;

    @observable messageRegistry = new Map();
    //   @observable messageThreadRegistry = new Map();
    //   @observable message: IMessage | null = null;
    @observable loadingInitial = false;
    @observable recipientUsername: any = '';
    //   @observable productId: string = '';

    @observable messageThreadId: string;
    //   @observable loadingMessageThread = false;
    //   @observable messagesFromThread: any = [];

    @observable messageThreadsCount = 0;
    @observable page = 0;
    @observable totalPages = 0;


    @observable last: any = undefined;



    @action loadMessages = async () => {

        this.loadingInitial = true;
        try {

            const messagesEnvelope = await agent.PrivateMessages.list(LIMIT, this.page);
            const { privateMessages, privateMessageThreadsCount, totalPages } = messagesEnvelope;
            runInAction('loading messages', () => {
                privateMessages.forEach((message) => {
                    // console.log(message);
                    this.formatDate(message);
                    this.messageRegistry.set(message.id, message);
                });
                // console.log(privateMessageThreadsCount)
                // console.log(toJS(this.messageRegistry))
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

    @action getLast = async (id?: string) => {

        // if(this.last === undefined ){
        if (!id) {
            this.last = this.messagesByThreadId[0]
            // console.log('baba jede pitu', this.messagesByThreadId[0])
            return this.last;
        } else {


            let index = this.messagesByThreadId.findIndex(m => m[0] === id);
            this.last = this.messagesByThreadId[index];
            // console.log('baba jede sladolel', this.messagesByThreadId[index][1][0].content)
            return this.last;
            // console.log(index)
        }

    }
    // @computed get view () {
    //     return null;
    // }
    // @action setLast = async (id: string) => {

    //     console.log('id :::', id)
    //     // this.last = this.messagesByThreadId[0]
    // }


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
            //   console.log(toJS(messages))
            return messages;
        }, {} as { [key: string]: IPrivateMessage[] }));
    }

    formatDate(message: IPrivateMessage) {
        const delimiter = '.';
        message.dateSent = message.dateSent?.split(delimiter)[0];
        message.dateSent = message.dateSent.replace('T', ' ');
    }





    @action setRecipient = (username: string, userPhotoUrl: any) => {
        this.recipientUsername = username;
        this.senderPhotoUrl = userPhotoUrl;
        // console.log(this.recipientUsername, this.senderPhotoUrl)
    }
    //   @action setUser = (username: string, userPhotoUrl: any) => {
    //     this.username = username;
    //     this.senderPhotoUrl = userPhotoUrl;
    //     // console.log(this.username, this.senderPhotoUrl)
    //   }

    @action setMessageThreadId = (messageThreadId: string) => {
        this.messageThreadId = messageThreadId
        console.log(this.messageThreadId);

    };
    @action sendReply = async (messageContent: string) => {

        let messageToSend = {
            recipientUsername: this.recipientUsername,
            content: messageContent,
            messageThreadId: this.messageThreadId
        }
        let placeholderMessageForUI: IPrivateMessage = {
            senderUsername: this.username,
            recipientUsername: this.recipientUsername,
            content: messageContent,
            privateMessageThreadId: this.messageThreadId,
            senderPhotoUrl: this.senderPhotoUrl,
            id: uuid(),
            dateSent: JSON.stringify(new Date()).replace(/['"]+/g, '')
        }
        // console.log(messageToSend);
        // console.log(placeholderMessageForUI);

        try {

        //   await agent.PrivateMessages.create(messageToSend);
          runInAction('loading message ', () => {
            this.formatDate(placeholderMessageForUI);
            // this.messagesFromThread.unshift(placeholderMessageForUI);
            // this.messagesByThreadId.unshift(placeholderMessageForUI);
            // this.messagesByThreadId.
          });
        } catch (error) {
          runInAction('load thread error', () => {
          });
          console.log(error);
        }
    };





    //   @action setMessage = (username: string) => {
    //     this.recipientUsername = username;
    //   };



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

    //   @action sendMessage = async (messageContent: string) => {

    //     let messageToSend = {
    //       recipientUsername: this.recipientUsername,
    //       content: messageContent,
    //       productId: this.productId,
    //     }
    //     try {
    //       await agent.Messages.create(messageToSend);
    //       // console.log(messageToSend);
    //       runInAction('loading message ', () => {
    //         this.rootStore.modalStore.closeModal();
    //       });
    //     } catch (error) {
    //       runInAction('load thread error', () => {
    //       });
    //       console.log(error);
    //     }
    //   };



    //   @action markReadInDB = async (id: string) => {
    //     try {
    //       await agent.Messages.markRead(id);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
}



