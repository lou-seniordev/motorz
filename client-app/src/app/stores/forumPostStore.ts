import { IRateForumpost } from './../models/forumpost';
import { observable, action, computed, runInAction, reaction } from 'mobx';
import { SyntheticEvent } from 'react';
import { history } from '../..';
import agent from '../api/agent';
import { IForumpost } from '../models/forumpost';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { IComment } from '../models/comment';
import { id } from 'date-fns/locale';

// configure({ enforceActions: 'always' });
const LIMIT = 2;

export default class ForumPostStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    //==21.1==
    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.forumPostRegistry.clear();
        this.loadForumPosts();
      }
    )
  }
  @observable forumPostRegistry = new Map();
  // @observable forumposts: IForumpost[] = [];
  @observable forumpost: IForumpost | null = null;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  //delete?
  @observable target = '';
  @observable.ref hubConnection: HubConnection | null = null;
  @observable forumPostCount = 0;
  @observable page = 0;
  @observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string) => {
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
    }
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`)
    this.predicate.forEach((value, key) => {
      params.append(key, value)
    })
    return params;
  }


  @computed get totalPages() {
    return Math.ceil(this.forumPostCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  }

  @action createHubConnection = (id: string, connectionArgument: string) => {//, motofy: IMotofy
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log(this.hubConnection!.state))
      .then(() => {
        console.log('Attempting to join group');
        if (this.hubConnection!.state === 'Connected') {
          this.hubConnection?.invoke('AddToGroup', id);
        }
      })
      .catch((error) => console.log('Error establishing connection', error));

    this.hubConnection.on(connectionArgument, (comment) => {
      runInAction(() => {
        console.log('comment', comment)
        this.forumpost!.commentForumPosts.push(comment);
      });
    });

    this.hubConnection.on('Send', (message) => {
      toast.info(message);
    });
  };

  @action stopHubConnection = () => {
    this.hubConnection
      ?.invoke('RemoveFromGroup', this.forumpost!.id)
      .then(() => {
        this.hubConnection?.stop();
      })
      .then(() => console.log('Connection stopped!'))
      .catch(error => console.log(error));
  };

  @action addComment = async (values: any) => {
    // console.log(values);
    values.id = this.forumpost!.id;
    try {
      await this.hubConnection!.invoke('SendCommentForumPost', values);
    } catch (error) {
      console.log(error);
    }
  };

  @action setRating = async (forumpostId: string, rating: string) => {
   
    const rate :IRateForumpost = {
      id: forumpostId,
      rating: rating,
    }
    try {
      await agent.Forumposts.rate(rate);

    } catch (error) {
      console.log(error);
    }
  }

  @computed get forumpostsByDate() {
    return this.groupForumpostsByDate(
      Array.from(this.forumPostRegistry.values())
    );
  }

  groupForumpostsByDate(forumposts: IForumpost[]) {
    const sortedForumposts = forumposts.sort(
      (a, b) => Date.parse(a.dateAdded) - Date.parse(b.dateAdded)
    );
    return Object.entries(
      sortedForumposts.reduce((forumposts, forumpost) => {
        const date = forumpost.dateAdded.split('T')[0];
        forumposts[date] = forumposts[date]
          ? [...forumposts[date], forumpost]
          : [forumpost];
        return forumposts;
      }, {} as { [key: string]: IForumpost[] })
    );
  }


  summComments(forumpost: IForumpost) {
    return forumpost.commentForumPosts.length;
  }

  reduceCommenters(forumpost: IForumpost) {

    // return [...Array.from(new Set(forumpost.commentForumPosts.map(x => x.username)))] 

    const result: IComment[] = [];
    const map = new Map();
    for (const item of forumpost.commentForumPosts) {
      if (!map.has(item.username)) {
        map.set(item.username, true)
        result.push({
          id: item.id,
          createdAt: item.createdAt,
          body: item.body,
          username: item.username,
          displayName: item.displayName,
          image: item.image
        })
      }
    }
    return result;
  }

  @action loadForumPosts = async () => {
    this.loadingInitial = true;
    try {
      const forumpostEnvelope = await agent.Forumposts.list(this.axiosParams);
      const { forumposts, forumpostCount } = forumpostEnvelope;
      runInAction('loading forumposts', () => {
        forumposts.forEach((forumpost) => {
          forumpost.numberOfComents = this.summComments(forumpost);
          forumpost.commenters = this.reduceCommenters(forumpost);
          this.forumPostRegistry.set(forumpost.id, forumpost);
        });
        this.forumPostCount = forumpostCount;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('load forumposts error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadForumPost = async (id: string) => {
    let forumpost = this.getForumPost(id);
    if (forumpost) {
      this.forumpost = forumpost;
      return forumpost;
    } else {
      this.loadingInitial = true;
      try {
        forumpost = await agent.Forumposts.details(id);
        runInAction('getting forumpost', () => {
          forumpost.numberOfComents = this.summComments(forumpost);
          forumpost.commenters = this.reduceCommenters(forumpost);
          this.forumpost = forumpost;
           console.log('forumpost in rating', forumpost);
          this.forumPostRegistry.set(forumpost.id, forumpost);
          this.loadingInitial = false;
        });
        this.forumpost = forumpost;
      } catch (error) {
        runInAction('get forumpost error', () => {
          this.loadingInitial = false;
          // console.log(error);
        });
      }
    }
  };

  @action clearForumPost = () => {
    this.forumpost = null;
  };

  getForumPost = (id: string) => {
    return this.forumPostRegistry.get(id);
  };

  @action createForumpost = async (forumpost: IForumpost) => {
    this.submitting = true;
    try {
      await agent.Forumposts.create(forumpost);
      runInAction('creating forumposts', () => {
        this.forumPostRegistry.set(forumpost.id, forumpost);
        // this.editMode = false;
        this.submitting = false;
      });
      history.push(`/forum/${forumpost.id}`);
    } catch (error) {
      runInAction('create forumpost error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error);
    }
  };
  @action editForumpost = async (forumpost: IForumpost) => {
    this.submitting = true;
    try {
      await agent.Forumposts.update(forumpost);
      runInAction('editing forumpost', () => {
        this.forumPostRegistry.set(forumpost.id, forumpost);
        this.forumpost = forumpost;
        this.editMode = false;
        this.submitting = false;
      });
      history.push(`/forum/${forumpost.id}`);
    } catch (error) {
      runInAction('edit forumpost error', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteForumpost = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Forumposts.delete(id);
      runInAction('deleting forumpost', () => {
        this.forumPostRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction('delete forumpost error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.forumpost = null;
  };

  @action openEditForm = (id: string) => {
    this.forumpost = this.forumPostRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedForumpost = () => {
    this.forumpost = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
    // TODO: GO BACK WHEREVER YOU WERE
  };

  @action selectForum = (id: string) => {
    this.forumpost = this.forumPostRegistry.get(id);
    this.editMode = false;
  };
}

// export default createContext(new ForumPostStore());
