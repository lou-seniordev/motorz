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
  @observable uploadingMotofyPhoto = false;
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

  //dunno if need signalR here...

  // === PAGING ===
  @observable motofyCount = 0;
  @observable page = 0;

  // === FILTERING ===
  @observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string  ) => { //| Date
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
      console.log(predicate);
    }
  }

  @computed get axiosParams () {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    // params.append('iEmbraced', 'false');
    // params.append('iOwn', 'false');
    // params.append('winningFive', 'false');
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

  // @action loadMostEmbraced = () => {

  //   const { motofies, motofyCount, mostEmbraced} = motofiesEnvelope;

  // }

  @action loadMotofies = async () => {
    this.loadingInitial = true;
    try {
      
      // const motofiesEnvelope = await agent.Motofies.list(LIMIT, this.page);

      const motofiesEnvelope = await agent.Motofies.list(this.axiosParams);

      const { motofies, motofyCount, mostEmbraced} = motofiesEnvelope;
     
      runInAction('loading motofies', () => {
        this.mostEmbraced = mostEmbraced;
        // console.log("mostEmbraced: ", mostEmbraced)

        motofies.forEach((motofy) => {
          motofy.datePublished = motofy.datePublished?.split('T')[0];
          // === Util Class ===
          setMotofyProps(motofy, this.rootStore.userStore.user!);
          this.motofyRegistry.set(motofy.id, motofy);
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
  @action clearMotofy = () => {
    this.motofy = null;
  };

  getMotofy = (id: string) => {
    return this.motofyRegistry.get(id);
  };

  @action createMotofy = async (motofy: IMotofy) => {
    //deleteit     
    console.log('From motofyStory: ', motofy)
    this.submitting = true;
    try {
      await agent.Motofies.create(motofy);
      // const embracer = createEmbracer(this.rootStore.userStore.user!);
      // embracer.isOwner = true;
      // let embracers = [];
      // embracers.push(embracer);
      // motofy.embracers = embracers;
      // motofy.isOwner = true;
      // runInAction('create motofy', () => {
      //   this.motofyRegistry.set(motofy.id, motofy);   // CHECK IF IT IS GOING TO BE NEEDED!! // this.editMode = false;
      //   this.submitting = false;
      // });
      history.push(`/gallery/${motofy.id}`);
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error);
    }
  };

  // @action createMotofy2 = async (motofy: IMotofy) => {
  //   //deleteit     console.log('motofy.file: ', motofy)
  //   this.submitting = true;
  //   try {
  //     await agent.Motofies.create(motofy);
  //     const embracer = createEmbracer(this.rootStore.userStore.user!);
  //     embracer.isOwner = true;
  //     let embracers = [];
  //     embracers.push(embracer);
  //     motofy.embracers = embracers;
  //     motofy.isOwner = true;
  //     // motofy.file = motofy.file
  //     runInAction('create motofy', () => {
  //       this.motofyRegistry.set(motofy.id, motofy);
  //       // CHECK IF IT IS GOING TO BE NEEDED!!
  //       // this.editMode = false;
  //       this.submitting = false;
  //     });
  //     history.push(`/gallery/${motofy.id}`);
  //   } catch (error) {
  //     runInAction(() => {
  //       this.submitting = false;
  //     });
  //     toast.error('Problem submitting data');
  //     console.log(error);
  //   }
  // };


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

  @action deleteMotofy = async (
    // event: SyntheticEvent<HTMLButtonElement>,
    id: string
    ) => {
      this.submitting = true;
      console.log('deleting??? ');
    // this.target = event.currentTarget.name;
    try {
      await agent.Motofies.delete(id);
      runInAction('deleting Motofy', () => {
        this.motofyRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction('delete motofy error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action embraceMotofy = async () => {
    const embracer = createEmbracer(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Motofies.embrace(this.motofy!.id);
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

  @action unembraceMotofy = async () => {
    this.loading = true;
    try {
      await agent.Motofies.unembrace(this.motofy!.id);
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

 

  // @action loadMotofy = async (id: string) => {
  //   let motofy = this.getMotofy(id);
  //   // console.log(motofy);
  //   if (motofy) {
  //     this.motofy = motofy;
  //   } else {
  //     this.loadingInitial = true;
  //     try {
  //       motofy = await agent.Motofies.details(id);
  //       runInAction('getting motofy', () => {
  //         this.motofy = motofy;
  //         this.loadingInitial = false;
  //       });
  //     } catch (error) {
  //       runInAction('Getting activity error', () => {
  //         this.loadingInitial = false;
  //       });
  //       console.log(error);
  //     }
  //   }
  // };


  //==trash candidates, because not in use anymore!!!
  // @action openEditForm = (id: string) => {
  //   this.editMode = true;
  //   this.motofy = this.motofyRegistry.get(id);
  // };
  // @action cancelSelectedMotofy = () => {
  //   this.motofy = null;
  // };
  // @action cancelFormOpen = () => {
  //   this.editMode = false;
  // };
  // @action selectMotofy = (id: string) => {
  //   this.motofy = this.motofyRegistry.get(id);
  //   this.editMode = false;
  // };
  // @action openCreateForm = () => {
  //   this.editMode = true;
  //   this.motofy = null;
  // };
}

// export default createContext(new MotofyStore());


//totaltrash
  //shit
  // @observable motofyPreview: any;
  // @action setPreview = (values: any) => {
  //   this.motofyPreview = values;
  // };