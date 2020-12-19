// import { RootStore } from './rootStore';
import { observable, action, runInAction, computed, configure } from 'mobx';
import { IMotofy } from '../models/motofy';
import agent from '../api/agent';
import { createContext, SyntheticEvent } from 'react';

configure({ enforceActions: 'always' });

class MotofyStore {
  @observable motofyRegistry = new Map();

  @observable motofies: IMotofy[] = [];
  @observable motofy: IMotofy | null = null;


  @observable editMode = false;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

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

    try {
      const motofies = await agent.Motofies.list();
      runInAction('loading motofies', () => {
        motofies.forEach((motofy) => {
          motofy.datePublished = motofy.datePublished?.split('T')[0];
          this.motofyRegistry.set(motofy.id, motofy);
        });
        this.loadingInitial = false;
      });
      console.log(motofies);

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
    } else {
      this.loadingInitial = true;
      try {
        motofy = await agent.Motofies.details(id);
        runInAction('getting motofy', () => {
          this.motofy = motofy;
          this.loadingInitial = false;
        });
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
      runInAction('create motofy', () => {
        this.motofyRegistry.set(motofy.id, motofy);
        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      runInAction(() => {
        this.submitting = false;
      });
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

export default createContext(new MotofyStore());
