import { IMechanicCustomer, IMechanicCustomerToBecome, IMechanicRate, IMechanicRecommend, IRating } from './../models/mechanic';//IMechanicId, 
import { action, observable, computed, runInAction, reaction } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { IMechanic } from '../models/mechanic';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { v4 as uuid } from "uuid";



const LIMIT = 3;


export default class MechanicStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.mechanicRegistry.clear();
        this.loadMechanics();
      }
    )
  }

  @observable mechanicRegistry = new Map();
  @observable mechanic: IMechanic | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable.ref hubConnection: HubConnection | null = null;


  @observable mechanicCount = 0;
  @observable page = 0;
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
    this.predicate.forEach((value, key) => {
        params.append(key, value )
    })
    return params;
  }  

  @observable isCustomer: boolean;
  // @observable hasNotCancelledCustomer: boolean = true;
  @observable openCustomerForm: boolean = false;
  @observable confirmCustomer: boolean = false;


  @computed get totalPages() {
    return Math.ceil(this.mechanicCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  }

  @action setOpenCustomerForm = () => {
    try {

      runInAction('open form', () => {
        // this.openCustomerForm = true;
        this.openCustomerForm = !this.openCustomerForm;
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

  @action createHubConnection = (id: string, connectionArgument: string) => {
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
    return Array.from(this.mechanicRegistry.values())
  }

  @action setCustomer = async (status: boolean) => {
    try {
      runInAction('seting customer', () => {
        this.isCustomer = status;
      })
    } catch (error) {
      console.log(error)
    }
  }
  // @action setCancelCustomer = async (status: boolean) => {
  //   try {
  //     runInAction('seting customer', () => {
  //       this.hasNotCancelledCustomer = false;
  //       this.isCustomer = false;
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  @action clearMechanic = async () => {
    this.mechanic = null;
  }

  

  @action loadMechanics = async () => {

  
    this.loadingInitial = true;
    try {
      const mechanicsEnvelope = await agent.Mechanics.list(this.axiosParams);

      const { mechanics, mechanicCount } = mechanicsEnvelope;
      

      runInAction('loading mechanics', () => {
        mechanics.forEach((mechanic) => {
          mechanic.datePublished = mechanic.datePublished?.split('T')[0];
          this.mechanicRegistry.set(mechanic.id, mechanic);
        });
        this.mechanicCount = mechanicCount;

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
          // console.log(mechanic)
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

    this.submitting = true;
    try {
      await agent.Mechanics.create(mechanic);
      runInAction('creating mechanics', () => {
        this.mechanicRegistry.set(mechanic.id, mechanic);
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
      await agent.Mechanics.update(mechanic);
      runInAction('creating mechanic', () => {
        this.mechanicRegistry.set(mechanic.id, mechanic);
        this.mechanic = mechanic;
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

  @action deleteMechanic = async (id: string) => {
    this.submitting = true;
    try {
      await agent.Mechanics.delete(id);
      runInAction('deleting mechanic', () => {
        this.mechanicRegistry.delete(id);

        this.submitting = false;
      });
    } catch (error) {
      runInAction('delete mechanic error', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action becomeCustomer = async (id: string, user: any, hasRecommended: string) => {
    let customerRecommended: boolean;
    hasRecommended === '0' ? customerRecommended = false : customerRecommended = true;

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
      customerRecommended: customerRecommended,
    }
    try {
      await agent.Mechanics.becomecustomer(customerToApi);
      runInAction('become a customer', () => {
        this.isCustomer = true;
        this.mechanic?.customers.push(customerForClient);


      })
    } catch (error) {
      console.log('error', error);
    }
    toast.info("You became a customer of the shop!");
  };

  @action recommend = async (mechanicId: string, username: string | undefined, isRecommended: string) => {

    let mechanicRecomend: IMechanicRecommend = {
      mechanicId: mechanicId,
      isRecommended: isRecommended
    }
    try {
      await agent.Mechanics.recommend(mechanicRecomend);
      runInAction('recommending a mechanic', () => {

        if (isRecommended === '1') {
          this.mechanic!.customers.find(x => x.username === username)!.customerRecommended = true;
        }
        else {
          this.mechanic!.customers.find(x => x.username === username)!.customerRecommended = false;
        }


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
        // this.hasRated = true;
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
      id: uuid(),
      text: text,
      dateAdded: new Date().toString()
    }
    try {
      await agent.Mechanics.addtestimonial(testimonial);

      runInAction('adding a testimonial to a mechanic', () => {

        this.mechanic!.customers.find(x => x.username === user.userName)!.testimonial = testimonialToUI;
      });
      toast.info("You added a testimonial this shop!");
    } catch (error) {
      console.log('error', error);
    }
  }
}

