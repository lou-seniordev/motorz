import { action, observable, computed, runInAction } from 'mobx';
// import { SyntheticEvent } from 'react';
import { history } from '../..';
import agent from '../api/agent';
import { IMechanic } from '../models/mechanic';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';


// configure({ enforceActions: 'always' });

export default class MechanicStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable mechanicRegistry = new Map();

  // @observable mechanics: IMechanic[] = [];
  @observable mechanic: IMechanic | null = null;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;

  @observable target = '';

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
        this.mechanic!.commentMechanics.push(comment);
      });
    });

    this.hubConnection.on('Send', (message) => {
      toast.info(message);
    });
  };

  @action stopHubConnection = () => {
    this.hubConnection
      ?.invoke('RemoveFromGroup', this.mechanic!.id)
      .then(() => {
        this.hubConnection?.stop();
      })
      .then(() => console.log('Connection stopped!'))
      .catch(error => console.log(error));
  };

  @action addComment = async (values: any) => {
    console.log(values);
    values.id = this.mechanic!.id;
    try {
      await this.hubConnection!.invoke('SendCommentMechanic', values);
    } catch (error) {
      console.log(error);
    }
  };

  @computed get mechanicsByDate() {
    return Array.from(this.mechanicRegistry.values()).sort(
      (a, b) => Date.parse(a.datePublished) - Date.parse(b.datePublished)
    );
  }

  @action loadMechanics = async () => {
    // console.log("iem in loadMechanics")

    this.loadingInitial = true;
    try {
      const mechanics = await agent.Mechanics.list();
      runInAction('loading mechanics', () => {
        mechanics.forEach((mechanic) => {
          mechanic.datePublished = mechanic.datePublished?.split('T')[0];

          this.mechanicRegistry.set(mechanic.id, mechanic);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('load mechanics error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadMechanic = async (id: string) => {
    let mechanic = this.getMechanic(id);
    if (mechanic) {
      this.mechanic = mechanic;
      return mechanic;
    } else {
      this.loadingInitial = true;
      try {
        mechanic = await agent.Mechanics.details(id);
        runInAction('getting mechanic', () => {
          this.mechanic = mechanic;
          this.mechanicRegistry.set(mechanic.id, mechanic);

          this.loadingInitial = false;
        });
        return mechanic;
      } catch (error) {
        runInAction('get mechanic error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearMechanic = () => {
    this.mechanic = null;
  }

  getMechanic = (id: string) => {
    return this.mechanicRegistry.get(id);
  };

  @action createMechanic = async (mechanic: IMechanic) => {
    // console.log('From mechanicStory: ', mechanic)

    this.submitting = true;
    try {
      await agent.Mechanics.create(mechanic);
      runInAction('creating mechanics', () => {
        this.mechanicRegistry.set(mechanic.id, mechanic);
        this.editMode = false;
        this.submitting = false;
      });
      history.push(`/mechanics/${mechanic.id}`)
    } catch (error) {
      runInAction('create mechanic error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error);
    }
  };

  @action editMechanic = async (mechanic: IMechanic) => {
    this.submitting = true;
    if (mechanic.email === null) mechanic.email = 'Not assigned';
    if (mechanic.website === null) mechanic.website = 'Not assigned';
    mechanic.country = mechanic.countryName;
    console.log(mechanic);

    try {
      // console.log('mechanic', mechanic);
      await agent.Mechanics.update(mechanic);
      runInAction('creating mechanic', () => {
        this.mechanicRegistry.set(mechanic.id, mechanic);
        this.mechanic = mechanic;
        this.editMode = false;
        this.submitting = false;
      });
      history.push(`/mechanics/${mechanic.id}`)
    } catch (error) {
      runInAction('create mechanic error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      // console.log(error.response);
    }
  };

  @action deleteMechanic = async (id: string) => {
    this.submitting = true;
    console.log('this.mechanicRegistry out of try', this.mechanicRegistry)
    try {
      await agent.Mechanics.delete(id);
      runInAction('deleting mechanic', () => {
        // console.log('id before: ', id)
        // console.log('this.mechanicRegistry before:::', this.mechanicRegistry)
        this.mechanicRegistry.delete(id);
        console.log('this.mechanicRegistry', this.mechanicRegistry)
        // console.log('id: ', id)
        // this.mechanicRegistry.delete(id);
        // console.log('id after2: ', id)
        // console.log('this.mechanicRegistry after2', this.mechanicRegistry)

        this.submitting = false;
        // this.target = '';
      });
    } catch (error) {
      runInAction('delete mechanic error', () => {
        this.submitting = false;
        // this.target = '';
      });
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.mechanic = null;
  };
  @action openEditForm = (id: string) => {
    this.mechanic = this.mechanicRegistry.get(id);
    // console.log(this.mechanic?.yearOfStart);
    this.editMode = true;
  };
  @action cancelSelectedMechanic = () => {
    this.mechanic = null;
  };
  @action cancelFormOpen = () => {
    this.editMode = false;
    // TODO: GO BACK WHEREVER YOU WERE
  };

  @action selectMechanic = (id: string) => {
    // this.selectedMechanic = this.mechanics.find(m => m.id === id); // === refactor for map
    this.mechanic = this.mechanicRegistry.get(id);
    this.editMode = false;
  };
}

// export default createContext(new MechanicStore());
