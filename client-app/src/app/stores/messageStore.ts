import { toJS } from 'mobx';
import { MessageContent } from 'semantic-ui-react';
import { IMessage, IMessageToSend } from './../models/message';
import { observable, action, computed, runInAction } from 'mobx';
// import { SyntheticEvent, useState } from 'react';
import React, { Fragment, useEffect, useState } from "react";

import { history } from '../..';
import agent from '../api/agent';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { stringify } from 'querystring';

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

  @observable threadUsername: string = '';
  @observable threadProductId: string = '';

  @observable loadingThread = false;
  // @observable threadNotEmpty = false;
  @observable threadExist = false;
  @observable formExist = false;

  //--in use will be---
  @computed get messagesByDate() {

    return Array.from(this.messageRegistry.values()).sort(
      (a, b) => Date.parse(a.dateSent) - Date.parse(b.dateSent)
    );
  }
  @computed get threadByDate() {

    return Array.from(this.messageThreadRegistry.values()).sort(
      (a, b) => Date.parse(a.dateSent) - Date.parse(b.dateSent)
    );
  }

  //   groupMessagesByDate(messages: IMessage[]) {
  //     const sortedmessages = messages.sort(
  //       (a, b) => Date.parse(a.dateSent) - Date.parse(b.dateSent)
  //     );
  //     return Object.entries(
  //       sortedmessages.reduce((messages, message) => {
  //         const date = message.dateSent.split('T')[0];
  //         messages[date] = messages[date]
  //           ? [...messages[date], message]
  //           : [message];
  //         return messages;
  //       }, {} as { [key: string]: IMessage[] })
  //     );
  //   }

  // @computed get axiosParams () {
  //   const params = new URLSearchParams();
  //   params.append('container', 'Unread');//String(LIMIT)
  //   params.append('username', 'bob');
  //   // params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
  //   // this.predicate.forEach((value, key) => {
  //   //   if (key === 'startDate') {
  //   //     params.append(key, value.toISOString())
  //   //   } else {
  //   //   } else {
  //   //     params.append(key, value )
  //   //   }
  //   // })
  //   return params;
  // }

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

  @action setMessageThreadData = (username: string, productId: string) => {
    this.threadUsername = username;
    this.threadProductId = productId;

  };

  @action cleanMessageThread = () => {
    this.messageThreadRegistry.clear();
    this.formExist = false;
    this.threadExist = false;
  };


  @action sendMessage = async (messageContent: string) => {//username: string

    // console.log("**********in send message*************");
    // console.log("Message to send: this.messageContent", messageContent);
    // console.log("Message to send: this.messageRecipient", this.threadUsername);
    // console.log("Message to send: this.threadProductId", this.threadProductId);
    
    let messageToSend = {
      recipientUsername : this.threadUsername,
      content: messageContent,
      productId : this.threadProductId,
    }
    // console.log("Message to send: ", messageToSend);
    try {
      const message = await agent.Messages.create(messageToSend);
      runInAction('loading message ', () => {
        if (message) {
          console.log("This message: ", message);
        } else {
          console.log("No message");
        }
      });
    } catch (error) {
      runInAction('load thread error', () => {

      });
      console.log(error);
    }
  };


  @action checkMessageThread = async () => {
    try {
      const messages = await agent.Messages.thread(this.threadUsername, this.threadProductId);
      // const messages = await agent.Messages.thread("jane", "0c75e9a7-b737-4838-8d59-04f2b07509c2");
      runInAction('loading thread', () => {
        // 
        //==THIS. SHOULD GO INTO THE MAIN FUNCTION AS A CHECK UPON WHICH IT WILL FILL THE THREAD, MAYBE..?
        if (messages.length > 0) {
          this.threadExist = true
          // this.threadNotEmpty = true
        } else {
          this.threadExist = false
          // this.threadNotEmpty = false
          this.formExist = true;
        }
      });
    } catch (error) {
      runInAction('load thread error', () => {

      });
      console.log(error);
    }
  };

  @action loadMessageThread = async (username: string, productId: string) => {//username: string, productId: string

    try {
      const messages = await agent.Messages.thread(username, productId);
      runInAction('loading thread', () => {
        messages.forEach((message) => {
          message.dateSent = message.dateSent?.split('T')[0];
          this.messageThreadRegistry.set(message.id, message);
        });
      });
    } catch (error) {
      runInAction('load thread error', () => {

      });
      console.log(error);
    }
  };

  //   @action loadForumPost = async (id: string) => {
  //     let forumpost = this.getForumPost(id);
  //     if (forumpost) {
  //       this.forumpost = forumpost;
  //       return forumpost;
  //     } else {
  //       this.loadingInitial = true;
  //       try {
  //         forumpost = await agent.Forumposts.details(id);
  //         runInAction('getting forumpost', () => {
  //           this.forumpost = forumpost;
  //           this.forumPostRegistry.set(forumpost.id, forumpost);
  //           this.loadingInitial = false;
  //         });
  //         this.forumpost = forumpost;
  //       } catch (error) {
  //         runInAction('get forumpost error', () => {
  //           this.loadingInitial = false;
  //           console.log(error);
  //         });
  //       }
  //     }
  //   };

  //   @action clearForumPost = () => {
  //     this.forumpost = null;
  //   };

  //   getForumPost = (id: string) => {
  //     return this.forumPostRegistry.get(id);
  //   };

  //   @action createForumpost = async (forumpost: IForumpost) => {
  //     this.submitting = true;
  //     try {
  //       await agent.Forumposts.create(forumpost);
  //       runInAction('creating forumposts', () => {
  //         this.forumPostRegistry.set(forumpost.id, forumpost);
  //         // this.editMode = false;
  //         this.submitting = false;
  //       });
  //       history.push(`/forum/${forumpost.id}`);
  //     } catch (error) {
  //       runInAction('create forumpost error', () => {
  //         this.submitting = false;
  //       });
  //       toast.error('Problem submitting data');
  //       console.log(error);
  //     }
  //   };
  //   @action editForumpost = async (forumpost: IForumpost) => {
  //     this.submitting = true;
  //     try {
  //       await agent.Forumposts.update(forumpost);
  //       runInAction('editing forumpost', () => {
  //         this.forumPostRegistry.set(forumpost.id, forumpost);
  //         this.forumpost = forumpost;
  //         this.editMode = false;
  //         this.submitting = false;
  //       });
  //       history.push(`/forum/${forumpost.id}`);
  //     } catch (error) {
  //       runInAction('edit forumpost error', () => {
  //         this.submitting = false;
  //       });
  //       console.log(error);
  //     }
  //   };

  //   @action deleteForumpost = async (
  //     event: SyntheticEvent<HTMLButtonElement>,
  //     id: string
  //   ) => {
  //     this.submitting = true;
  //     this.target = event.currentTarget.name;
  //     try {
  //       await agent.Forumposts.delete(id);
  //       runInAction('deleting forumpost', () => {
  //         this.forumPostRegistry.delete(id);
  //         this.submitting = false;
  //         this.target = '';
  //       });
  //     } catch (error) {
  //       runInAction('delete forumpost error', () => {
  //         this.submitting = false;
  //         this.target = '';
  //       });
  //       console.log(error);
  //     }
  //   };

  //   @action openCreateForm = () => {
  //     this.editMode = true;
  //     this.forumpost = null;
  //   };

  //   @action openEditForm = (id: string) => {
  //     this.forumpost = this.forumPostRegistry.get(id);
  //     this.editMode = true;
  //   };

  //   @action cancelSelectedForumpost = () => {
  //     this.forumpost = null;
  //   };

  //   @action cancelFormOpen = () => {
  //     this.editMode = false;
  //     // TODO: GO BACK WHEREVER YOU WERE
  //   };

  //   @action selectForum = (id: string) => {
  //     this.forumpost = this.forumPostRegistry.get(id);
  //     this.editMode = false;
  //   };
}

