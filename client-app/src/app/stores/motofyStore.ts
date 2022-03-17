import { IUser } from './../models/user';
import { IMotofyScore, IRateMotofy } from './../models/motofy';
import { observable, action, runInAction, computed, reaction } from 'mobx';
import { IMotofy } from '../models/motofy';
import agent from '../api/agent';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { createEmbracer, setMotofyProps } from '../common/util/util';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

// configure({ enforceActions: 'always' });
const LIMIT = 2;

export default class MotofyStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.motofyRegistry.clear();
        this.loadMotofies();
      }
    )

  }

  @observable motofyRegistry = new Map();

  // @observable motofies: IMotofy[] = [];
  @observable motofy: IMotofy | null = null;

  // @observable editMode = false;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;

  //==check?
  // @observable uploadingMotofyPhoto = false;
  @observable.ref hubConnection: HubConnection | null = null;
  
  @action createHubConnection = (id: string, connectionArgument: string) => {//, motofy: IMotofy
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
        accessTokenFactory: () => this.rootStore.commonStore.token!,
      })
      .configureLogging(LogLevel.Information)
      .build();
      // console.log('motofy', this.motofy)
      // console.log('motofy', motofy)


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
        this.motofy!.commentMotofies.push(comment);
      });
    });

    this.hubConnection.on('Send', (message) => {
      toast.info(message);
    });
  };

  @action stopHubConnection = () => {
    this.hubConnection
      ?.invoke('RemoveFromGroup', this.motofy!.id)
      .then(() => {
        this.hubConnection?.stop();
      })
      .then(() => console.log('Connection stopped!'))
      .catch(error => console.log(error));
  };

  @action addComment = async (values: any) => {
    console.log(values);
    values.id = this.motofy!.id;
    try {
      await this.hubConnection!.invoke('SendCommentMotofy', values);
    } catch (error) {
      console.log(error);
    }
  };
  

  @observable mostEmbraced: any;
  @computed get getMostEmbraced () {
    return this.mostEmbraced;
  }
  @observable highestRatedMotofy: any;
  @computed get getHighestRatedMotofy () {
    return this.highestRatedMotofy;
  }


  // === PAGING ===
  @observable motofyCount = 0;
  @observable page = 0;

  // === FILTERING ===
  @observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string  ) => { //| Date
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
      // console.log(predicate);
    }
  }

  @computed get axiosParams () {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
        params.append(key, value )
    })
    return params;
  }  


  // === PAGING ===
  @computed get totalPages() {
    return Math.ceil(this.motofyCount / LIMIT);
  }
  @action setPage = (page: number) => {
    this.page = page;
  }


  @computed get motofiesByDate() {
    return Array.from(this.motofyRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadMotofies = async () => {
    this.loadingInitial = true;
    try {
      
      const motofiesEnvelope = await agent.Motofies.list(this.axiosParams);

      const { motofies, motofyCount, mostEmbraced, highestRatedMotofy} = motofiesEnvelope;
    //  console.log('highestRatedMotofy', highestRatedMotofy)
      runInAction('loading motofies', () => {
        this.mostEmbraced = mostEmbraced;
        this.highestRatedMotofy = highestRatedMotofy;

        motofies.forEach((motofy) => {
          motofy.datePublished = motofy.datePublished?.split('T')[0];
          // === Util Class ===
          setMotofyProps(motofy, this.rootStore.userStore.user!);
          this.motofyRegistry.set(motofy.id, motofy);
          // console.log('motfy', toJS(motofy))
        });
        this.motofyCount = motofyCount;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadMotofy = async (id: string) => {
    let motofy = this.getMotofy(id);
    if (motofy) {
      this.motofy = motofy;
      // //test
      return motofy;
    } else {
      this.loadingInitial = true;
      try {
        motofy = await agent.Motofies.details(id);
        runInAction('getting motofy', () => {
          // === why not using date here??? ===
          setMotofyProps(motofy, this.rootStore.userStore.user!);
          this.motofy = motofy;
          this.motofyRegistry.set(motofy.id, motofy);
          this.loadingInitial = false;
        });
        return motofy;
      } catch (error) {
        runInAction('get motofy error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };
  // @action clearMotofy = () => {
  //   this.motofy = null;
  // };
  @action rateMotofy = async (rating: string | number | undefined, motofy: IMotofy, user: IUser | null) => {
    let newRating: IRateMotofy = {
      id: motofy.id,
      score: rating
    }
    let newScore: IMotofyScore = {
      username: user?.userName,
      displayName: user?.displayName,
      score: rating,
    };
    try {
      await agent.Motofies.rate(motofy.id, newRating)
      runInAction('rating motofy', () => {
        // this.motofy = motofy;
        motofy.motofyScores.push(newScore);
        this.motofyRegistry.set(motofy.id, motofy);
        // console.log(toJS(this.motofyRegistry.get(motofy.id)));
        
      })
    } catch (error) {
      runInAction('rating motofy error', () => {
        console.log(error);
      });
    }
  };

  getMotofy = (id: string) => {
    return this.motofyRegistry.get(id);
  };

  @action editMotofy = async (motofy: IMotofy) => {
    this.submitting = true;
    // this.editMode = true;
    try {
      await agent.Motofies.update(motofy);
      runInAction('editing motofy', () => {
        this.motofyRegistry.set(motofy.id, motofy);
        this.motofy = motofy;
        // this.editMode = false;
        this.submitting = false;
      });
      history.push(`/gallery/${motofy.id}`);
    } catch (error) {
      runInAction('edit motofy error', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };
  @action createMotofy = async (motofy: IMotofy) => {
    
    this.submitting = true;
    try {
      await agent.Motofies.create(motofy);
      const embracer = createEmbracer(this.rootStore.userStore.user!);
      embracer.isOwner = true;
      let embracers = [];
      embracers.push(embracer);
      motofy.embracers = embracers;
      motofy.isOwner = true;
      runInAction('create motofy', () => {
        this.motofyRegistry.set(motofy.id, motofy);   // CHECK IF IT IS GOING TO BE NEEDED!! // this.editMode = false;
        this.submitting = false;
      });
      history.push(`/gallery/${motofy.id}`);
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error);
    }
  };


  @action deleteMotofy = async (id: string) => {
      this.submitting = true;
      console.log('this.motofyRegistry out of try', this.motofyRegistry)

      try {
      await agent.Motofies.delete(id);
      runInAction('deleting Motofy', () => {
        this.motofyRegistry.delete(id);
        
        console.log('this.motofyRegistry', this.motofyRegistry)

        this.submitting = false;
      });
    } catch (error) {
      runInAction('delete motofy error', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  // @action embraceMotofy = async () => {
  @action embraceMotofy = async (id: string) => {
    const embracer = createEmbracer(this.rootStore.userStore.user!);
    this.loading = true;
    try {

      await agent.Motofies.embrace(id);
      runInAction(() => {
        if (this.motofy) {
          this.motofy.embracers.push(embracer);
          this.motofy.embraced = true;
          this.motofyRegistry.set(this.motofy.id, this.motofy);
          this.loading = false;
        }
      });
      
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error('Problem embracing this motofy');
    }
  };

  @action unembraceMotofy = async (id: string) => {
    this.loading = true;
    try {
      await agent.Motofies.unembrace(id);
      runInAction(() => {
        if (this.motofy) {
          this.motofy.embracers = this.motofy.embracers.filter(
            (a) => a.username !== this.rootStore.userStore.user!.userName
          );
          this.motofy.embraced = false;
          this.motofyRegistry.set(this.motofy.id, this.motofy);
        }
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error('Problem embracing this motofy');
    }
  };

}

