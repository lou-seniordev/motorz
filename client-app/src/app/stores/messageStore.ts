// import { toJS } from 'mobx';
// import { MessageContent } from 'semantic-ui-react';
import { IMessage } from './../models/message';//, IMessageToSend
import { observable, action, computed, runInAction } from 'mobx';

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
      (a, b) => Date.parse(a.dateSent) - Date.parse(b.dateSent)
    )
    return Object.entries(sortedMessages.reduce((messages, message) => {
      const threadId = message.messageThreadId;
      messages[threadId] = messages[threadId] ? [...messages[threadId], message] : [message];
      return messages;
    }, {} as { [key: string]: IMessage[] }));
  }

  @action loadMessages = async () => {
    const container = 'Inbox';


    this.loadingInitial = true;
    try {
      const messages = await agent.Messages.list(container);
      runInAction('loading messages', () => {
        messages.forEach((message) => {
          message.dateSent = message.dateSent?.split('T')[0];
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

