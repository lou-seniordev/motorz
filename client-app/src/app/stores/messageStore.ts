import { IMessage } from './../models/message';
import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import { history } from '../..';
import agent from '../api/agent';
import { toast } from 'react-toastify';
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
//   @observable editMode = false;
//   @observable submitting = false;

//   @observable target = '';

//--in use will be---
  @computed get messagesByDate() {
    // return this.groupMessagesByDate(
    //   Array.from(this.messageRegistry.values())
    // );
    return Array.from(this.messageRegistry.values()).sort(
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
    // console.log("iem in loadMessages")
    const container = '';
   
    this.loadingInitial = true;
    try {
      const messages = await agent.Messages.list(container);
      runInAction('loading messages', () => {
        messages.forEach((message) => {
            message.dateSent = message.dateSent?.split('T')[0];
            // console.log("message.content: ", message.dateSent);
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

  @action loadMessageThread = async (username: string) => {
    // console.log("iem in loadMessages", username)

    this.loadingInitial = true;
    try {
      const messages = await agent.Messages.thread(username);
      runInAction('loading messages', () => {
        messages.forEach((message) => {
            message.dateSent = message.dateSent?.split('T')[0];
            // console.log("message.content: ", message.content);
          this.messageThreadRegistry.set(message.id, message);
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

