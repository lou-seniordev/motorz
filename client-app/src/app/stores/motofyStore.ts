import { observable, action, runInAction, computed } from 'mobx';
import { IMotofy } from '../models/motofy';
import agent from '../api/agent';
import { SyntheticEvent } from 'react';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { createEmbracer, setMotofyProps } from '../common/util/util';

// configure({ enforceActions: 'always' });

export default class MotofyStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable motofyRegistry = new Map();

  @observable motofies: IMotofy[] = [];
  @observable motofy: IMotofy | null = null;

  @observable editMode = false;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;

  @computed get motofiesByDate() {
    return Array.from(this.motofyRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  // @computed get motofiesByDate() {
  //   return this.groupMotofiesByDate(Array.from(this.motofyRegistry.values()));
  // }

  // groupMotofiesByDate(motofies: IMotofy[]) {
  //   const sortedMotofies = motofies.sort(
  //     (a, b) => Date.parse(a.datePublished) - Date.parse(b.datePublished)
  //   )
  //   return Object.entries(sortedMotofies.reduce((motofies, motofy) => {
  //     const date = motofy.datePublished.split('T')[0];
  //     motofies[date] = motofies[date] ? [...motofies[date], motofy] : [motofy];
  //     return motofies;
  //   },{} as {[key: string]: IMotofy[]}));
  // }

  @action loadMotofies = async () => {
    this.loadingInitial = true;
    // const user = ;
    try {
      const motofies = await agent.Motofies.list();
      runInAction('loading motofies', () => {
        motofies.forEach((motofy) => {
          motofy.datePublished = motofy.datePublished?.split('T')[0];
          // === Util Class ===
          setMotofyProps(motofy, this.rootStore.userStore.user!);
          this.motofyRegistry.set(motofy.id, motofy);
        });
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
        this.motofyRegistry.set(motofy.id, motofy);
        // CHECK IF IT IS GOING TO BE NEEDED!!
        // this.editMode = false;
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
  // @action createMotofy = async (motofy: IMotofy) => {
  //   this.submitting = true;
  //   try {
  //     await agent.Motofies.create(motofy);
  //     runInAction(() => {
  //       this.motofies.push(motofy);
  //       this.editMode = false;
  //     });
  //   } catch (error) {
  //     runInAction(() => {
  //       this.submitting = false;
  //     });
  //     console.log(error);
  //   }
  // };

  @action editMotofy = async (motofy: IMotofy) => {
    this.submitting = true;
    this.editMode = true;
    try {
      await agent.Motofies.update(motofy);
      runInAction('editing motofy', () => {
        this.motofyRegistry.set(motofy.id, motofy);
        this.motofy = motofy;
        this.editMode = false;
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
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
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

  @action openCreateForm = () => {
    this.editMode = true;
    this.motofy = null;
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

  @action openEditForm = (id: string) => {
    this.editMode = true;
    this.motofy = this.motofyRegistry.get(id);
  };

  @action cancelSelectedMotofy = () => {
    this.motofy = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectMotofy = (id: string) => {
    this.motofy = this.motofyRegistry.get(id);
    this.editMode = false;
  };
}

// export default createContext(new MotofyStore());
