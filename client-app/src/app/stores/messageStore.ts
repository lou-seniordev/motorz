import { IMessage } from './../models/message';
import { observable, action, computed, runInAction, } from 'mobx';

import agent from '../api/agent';
import { RootStore } from './rootStore';

// configure({ enforceActions: 'always' });

export default class MessageStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }


  @observable messageRegistry = new Map();
  @observable messageThreadRegistry = new Map();
  @observable message: IMessage | null = null;
  @observable loadingInitial = false;
  @observable loadingLast = false;
  @observable lastMessage: IMessage | undefined;

  @observable threadUsername: string = '';
  @observable threadProductId: string = '';

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

  @action loadMessages = async () => {
    const container = 'Inbox';
    const delimiter = '.';


    this.loadingInitial = true;
    try {
      const messages = await agent.Messages.list(container);
      runInAction('loading messages', () => {
        messages.forEach((message) => {
          // message.dateSent = message.dateSent?.split('T')[0];
          message.dateSent = message.dateSent?.split(delimiter)[0];
          message.dateSent = message.dateSent.replace('T', ' ');
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
    this.threadUsername = username;
    this.threadProductId = productId;
  };

  @observable messageThread: IMessage[];
  @observable loadingMessageThread = false;
  
  
  @observable messagesFromThread:any = [];


  getMessageThread = (id: string) => {
    let myArray = Array.from(this.messagesByDate);
    let messageThread;
    for (let i = 0; i < myArray.length; i++){
      if(myArray[i][0] === id){
        messageThread = myArray[i][1];
      }
    }
    return messageThread;
  };

  @action loadMessageThread = async (id: string) => {

    let messageThread = this.getMessageThread(id);
    if(messageThread) {
      this.messagesFromThread = messageThread;
    }else {
      this.loadingMessageThread = true;
      try {
        messageThread = await agent.Messages.thread(id);
        runInAction('getting messages', () => {
          this.messagesFromThread = messageThread;
          this.loadingMessageThread = false;
        });
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
    this.threadUsername = '';
    this.threadProductId = '';

  };

  @action sendMessage = async (messageContent: string) => {//username: string

    let messageToSend = {
      recipientUsername: this.threadUsername,
      content: messageContent,
      productId: this.threadProductId,
    }
    try {

      await agent.Messages.create(messageToSend);
      runInAction('loading message ', () => {
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


   