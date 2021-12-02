import { IMessage } from './../models/message';
import { observable, action, computed, runInAction, toJS } from 'mobx';

import agent from '../api/agent';
import { RootStore } from './rootStore';

import { v4 as uuid } from 'uuid';


// configure({ enforceActions: 'always' });

export default class MessageStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }



  @observable username: string = '';

  @observable senderPhotoUrl: string;

  @observable messageRegistry = new Map();
  @observable messageThreadRegistry = new Map();
  @observable message: IMessage | null = null;
  @observable loadingInitial = false;
  @observable loadingLast = false;
  @observable lastMessage: IMessage | undefined;

  @observable recipientUsername: any = '';
  @observable productId: string = '';

  //--in use ---
  @computed get messagesByDate() {

    return this.groupMessagesByThreadId(Array.from(this.messageRegistry.values()));
  }

  groupMessagesByThreadId(messages: IMessage[]) {
    const sortedMessages = messages.sort(
      (a, b) => Date.parse(b.dateSent) - Date.parse(a.dateSent)
    )
    return Object.entries(sortedMessages.reduce((messages, message) => {
      const threadId = message.messageThreadId;
      messages[threadId] = messages[threadId] ? [...messages[threadId], message] : [message];
      return messages;
    }, {} as { [key: string]: IMessage[] }));
  }

  @computed get formatDates() {
    return null;
  }

  formatDate(message: IMessage) {
    const delimiter = '.';
    message.dateSent = message.dateSent?.split(delimiter)[0];
    message.dateSent = message.dateSent.replace('T', ' ');
  }
  @action loadMessages = async () => {
    const container = 'Inbox';
    const delimiter = '.';


    this.loadingInitial = true;
    try {
      const messages = await agent.Messages.list(container);
      runInAction('loading messages', () => {
        messages.forEach((message) => {
          // message.dateSent = message.dateSent?.split(delimiter)[0];
          // message.dateSent = message.dateSent.replace('T', ' ');
          this.formatDate(message);
          this.messageRegistry.set(message.id, message);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('load messages error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action setMessage = (username: string, productId: string) => {
    this.recipientUsername = username;
    this.productId = productId;
  };

  @observable messageThread: IMessage[];
  @observable messageThreadId: string;
  @observable loadingMessageThread = false;


  @observable messagesFromThread: any = [];


  getMessageThread = (id: string) => {
    let myArray = Array.from(this.messagesByDate);
    let messageThread;
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i][0] === id) {
        messageThread = myArray[i][1];
      }
    }
    return messageThread;
  };

  // @action cleanReply = () => {
  //   this.recipientUsername = '';
  //   this.productId = '';
  //   this.messageThreadId = '';
  // };

  @action setUser = (username: string, userPhotoUrl: any) => {
    this.username = username;
    this.username = username;
    this.senderPhotoUrl = userPhotoUrl;
  }

  @action setReply = (messageThread: IMessage[]) => {
    messageThread.map((messages) => {

      this.productId = messages.productId;
      this.messageThreadId = messages.messageThreadId;
      if (this.username === messages.recipientUsername) {
        this.recipientUsername = messages.senderUsername
      } else {
        this.recipientUsername = messages.recipientUsername;
      }
    })
    // console.log('SET REPLY:::');
    // // this.recipientUsername;
    // // console.log(tempusername);
    // console.log(this.productId);
    // console.log(this.messageThreadId);
    // console.log(this.recipientUsername);
  };



  @action loadMessageThread = async (id: string) => {

    let messageThread = this.getMessageThread(id);
    if (messageThread) {
      // console.log('messageThread: ', messageThread![0].content);
      this.messagesFromThread = messageThread;
      this.setReply(messageThread)
    } else {
      this.loadingMessageThread = true;
      try {
        messageThread = await agent.Messages.thread(id);
        runInAction('getting messages', () => {
          // console.log('messageThread: ', messageThread);Î
          messageThread?.map(message => {
            this.formatDate(message)
          })
          this.messagesFromThread = messageThread;
          this.loadingMessageThread = false;
        });
        this.setReply(messageThread)
        return messageThread;
      } catch (error) {
        runInAction('error get messages', () => {
          this.loadingMessageThread = false;
        });
        console.log(error);
      }
    }
  };

  @action cleanMessage = () => {
    this.recipientUsername = '';
    this.productId = '';

  };

  @action sendMessage = async (messageContent: string) => {

    let messageToSend = {
      recipientUsername: this.recipientUsername,
      content: messageContent,
      productId: this.productId,
    }
    try {
      // await agent.Messages.create(messageToSend);
      console.log(messageToSend);
      runInAction('loading message ', () => {
        this.rootStore.modalStore.closeModal();
      });
    } catch (error) {
      runInAction('load thread error', () => {
      });
      console.log(error);
    }
  };

  @action sendReply = async (messageContent: string) => {

    let messageToSend = {
      recipientUsername: this.recipientUsername,
      content: messageContent,
      productId: this.productId,
      messageThreadId: this.messageThreadId
    }
    let tempMessageForUI: IMessage = {
      senderUsername: this.username,
      recipientUsername: this.recipientUsername,
      content: messageContent,
      productId: this.productId,
      messageThreadId: this.messageThreadId,
      senderPhotoUrl: this.senderPhotoUrl,
      id: uuid(),
      dateSent: JSON.stringify(new Date()).replace(/['"]+/g, '')
    }
    try {
      
      // await agent.Messages.create(messageToSend);
      runInAction('loading message ', () => {
        console.log(tempMessageForUI.dateSent)
        this.formatDate(tempMessageForUI);
        this.messagesFromThread.unshift(tempMessageForUI);
        this.rootStore.modalStore.closeModal();
      });
    } catch (error) {
      runInAction('load thread error', () => {
      });
      console.log(error);
    }
  };
}



    // let myArray = Array.from(this.messagesByDate);

    // let skim;//: IMessage[];


    // for (let i = 0; i < myArray.length; i++){
    //   // console.log('Content of message is: ', toJS(myArray[i][1]))
    //   if(myArray[i][0] == id){
    //     // console.log('heureka!', toJS(myArray[i][1]))
    //     skim = myArray[i][1];
    //   }
    // }
    // console.log('heureka!', toJS(skim))
    // this.messagesFromThread = skim;


