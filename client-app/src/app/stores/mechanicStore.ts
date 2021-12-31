import { toJS } from 'mobx';
// import { toJS } from 'mobx';
// import { Image } from 'semantic-ui-react';
// import { IUser } from './../models/user';
// import { toJS } from 'mobx';
import { IMechanicCustomer, IMechanicCustomerToBecome, IMechanicId, IMechanicRate, IRating } from './../models/mechanic';
import { action, observable, computed, runInAction } from 'mobx';
// import { SyntheticEvent } from 'react';
import { history } from '../..';
import agent from '../api/agent';
import { IMechanic } from '../models/mechanic';//, IMechanicCustomer
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

  // @observable target = '';

  // @observable customers: IMechanicCustomer[] = [];
  @observable isCustomer: boolean = false;
  @observable hasRecommended: boolean = false;
  @observable hasRated: boolean = false;
  @observable hasTestified: boolean = false;
  
  @observable openCustomerForm: boolean = false;
  @observable confirmCustomer: boolean = false;
  @observable hasBecomeCustomer: boolean = false;
  // @observable confirmCustomer: boolean = false;

  @action setHasBecomeCustomer = () => {
    try {

      runInAction('open form', () => {
        this.hasBecomeCustomer = true;
      })
    } catch (error) {

    }
  }

  @action setOpenCustomerForm = () => {
    try {

      runInAction('open form', () => {
        this.openCustomerForm = true;
      })
    } catch (error) {

    }
  }
  @action setCloseCustomerForm = () => {
    try {

      runInAction('open form', () => {
        this.openCustomerForm = false;
      })
    } catch (error) {

    }
  }

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
      .then(() => this.clearMechanic())
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

  @action setCustomer = async (status: boolean) => {
    try {
      runInAction('seting customer', () => {
        this.isCustomer = status;
        console.log('setting this customer status...', this.isCustomer)
      })
    } catch (error) {
      console.log(error)
    }
  }
  @action setRecommend = async (status: boolean) => {
    try {
      runInAction('seting customer', () => {
        this.hasRecommended = status;
        console.log('setting this recommendation...', this.hasRecommended)
      })
    } catch (error) {
      console.log(error)
    }
  }

  @action clearMechanic = async () => {
    this.mechanic = null;
  }


  @action loadMechanics = async () => {


    this.loadingInitial = true;
    try {
      const mechanics = await agent.Mechanics.list();
      console.log("mechanics in ALL loadMechanics", mechanics);
      runInAction('loading mechanics', () => {
        mechanics.forEach((mechanic) => {
          mechanic.datePublished = mechanic.datePublished?.split('T')[0];
          // mechanic.customers.forEach( customer => {
          //   // this.customers.push(customer);
          //   // console.log(customer.username)
          // })
          this.mechanicRegistry.set(mechanic.id, mechanic);
        });
        // console.log("iem in loadMechanics", toJS(this.customers));
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('load mechanics error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadMechanic = async (id: string) => {//, username: string| undefined
    let mechanic = this.getMechanic(id);
    if (mechanic) {
      this.mechanic = mechanic;
      return mechanic;
    } else {
      this.loadingInitial = true;
      try {
        mechanic = await agent.Mechanics.details(id);
        console.log("mechanic in load single Mechanic", mechanic);
        runInAction('getting mechanic', () => {
          // mechanic.customers.forEach( (customer:IMechanicCustomer) => {
          //   if(username === customer.username)
          //   // this.isCustomer = true;
          //   this.setCustomer(true);
          //   console.log('i setCustomer to true')
          // })
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
    if (mechanic.email === null) mechanic.email = 'Not assigned email';
    if (mechanic.website === null) mechanic.website = 'Not assigned website';
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
        this.mechanicRegistry.delete(id);
        console.log('this.mechanicRegistry', this.mechanicRegistry)


        this.submitting = false;
      });
    } catch (error) {
      runInAction('delete mechanic error', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action becomeCustomer = async (id: string, user: any) => {
    let customerToApi: IMechanicCustomerToBecome = {

      mechanicId: id,
      isCustomer: true
    }
    let customerForClient: IMechanicCustomer = {
      username: user.userName,
      displayName: user.displayName,
      image: user.image,
      isCustomer: true,
      isOwner: false,
      customerRecommended: false,
    }
    try {
      await agent.Mechanics.becomecustomer(customerToApi);
      runInAction('become a customer', () => {
        this.isCustomer = true;
        // let mechanic: IMechanic = this.mechanicRegistry.get(id);
        // mechanic.customers.push(customerForClient)
        this.mechanic?.customers.push(customerForClient);


      })
    } catch (error) {
      console.log('error', error);
    }
    toast.info("You became a customer of the shop!");
  };

  @action recommend = async (id: string, username: string | undefined) => {
    let mechanicId: IMechanicId = {
      mechanicId: id
    }
    //hasRecommended
    try {
      await agent.Mechanics.recommend(mechanicId);
      runInAction('recommending a mechanic', () => {
        this.hasRecommended = true;
        // let mechanic: IMechanic = this.mechanicRegistry.get(id);
        // mechanic.customers.push(customerForClient)
        this.mechanic!.customers.find(x => x.username === username)!.customerRecommended = true;
        // let customer = this.mechanic?.customers.find(x => x.username === username);
        // customer!.customerRecommended = true;

      });
      toast.info("You recommended this shop!");
    } catch (error) {
      console.log('error', error);
    }
  }
  @action rate = async (id: string, score: string, user: any) => {
    let rateMechanic: IMechanicRate = {
      id: id,
      score: score,
    }
    let addRating: IRating = {
      username: user.userName,
      displayName: user.displayName,
      score: score
    }
    try {
      await agent.Mechanics.rate(rateMechanic);
      runInAction('recommending a mechanic', () => {
        this.hasRated = true;
        this.mechanic?.ratings.push(addRating)
        console.log(this.mechanic!.ratings);
      });
      toast.info("You rated this shop!");
    } catch (error) {
      console.log('error', error);
    }
  }
  @action addTestimonial = async (mechanicId: string, text: string, user: any) => {
    let testimonial = {
      mechanicId: mechanicId,
      text: text,
    }
    let testimonialToUI = {
      id: "80dc3817-5bfd-4dcf-919f-02f76a58f7c3",
      text: text,
      dateAdded: new Date().toString()
    }
    // let temp:any;
    try {
      await agent.Mechanics.addtestimonial(testimonial);

      runInAction('adding a testimonial to a mechanic', () => {

        this.hasTestified = true;
        this.mechanic!.customers.find(x => x.username == user.userName)!.testimonial = testimonialToUI;
        // temp = testimonialToUI
        console.log(toJS(this.mechanic!.customers.find(x => x.username == user.userName)!.testimonial));
      });
      toast.info("You added a testimonial this shop!");
    } catch (error) {
      console.log('error', error);
    }
  }
}

