// import { RootStore } from './rootStore';
import { observable, action, runInAction, computed, configure } from 'mobx';
import { IMotofy } from '../models/motofy';
import agent from '../api/agent';
import { createContext, SyntheticEvent } from 'react';

configure({ enforceActions: 'always' });

class MotofyStore {
  @observable motofyRegistry = new Map();

  @observable motofies: IMotofy[] = [];
  @observable motofy: IMotofy | undefined;

  // temp
  @observable selectedMotofy: IMotofy | undefined;

  @observable editMode = false;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get motofiesByDate() {
    return Array.from(this.motofyRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadMotofies = async () => {
    this.loadingInitial = true;

    try {
      const motofies = await agent.Motofies.list();
      console.log('motofies', motofies);
      runInAction('loading mototofies', () => {
        motofies.forEach((motofy) => {
          motofy.datePublished = motofy.datePublished?.split('.')[0];
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
        this.selectedMotofy = motofy;
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
    this.motofy = undefined;
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
    this.selectedMotofy = this.motofyRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedMotofy = () => {
    this.selectedMotofy = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectMotofy = (id: string) => {
    this.selectedMotofy = this.motofyRegistry.get(id);
    this.editMode = false;
  };

  getMotofy = (id: string) => {
    return this.motofies.find((x) => x.id === id);
  };
}

export default createContext(new MotofyStore());
