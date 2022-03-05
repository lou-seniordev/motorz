import { IDiaryEntry } from './../models/activity';
import { observable, action, computed, runInAction, reaction, toJS } from 'mobx';
import { history } from '../..';
import agent from '../api/agent';
import { IActivity } from '../models/activity';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { createAttendee, setActivityProps } from '../common/util/util';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';

const LIMIT = 2;

export default class ActivityStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.predicate.keys(),
      () => {
        this.page = 0;
        this.activityRegistry.clear();
        this.loadActivities();
      }
    )
  }

  @observable activityRegistry = new Map();
  @observable activity: IActivity | null = null;

  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';
  @observable loading = false;

  @observable activityCount = 0;
  @observable page = 0;

  @observable diaryEntry: IDiaryEntry | null = null;

  @observable predicate = new Map();

  @action setPredicate = (predicate: string, value: string | Date) => {
    // console.log(predicate)
    // console.log(value)
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
    }
    // if (predicate !== 'iFollow') {
    //   this.activityMax = false;
    // }
  }

  @computed get axiosParams() {
    const params = new URLSearchParams();
    params.append('limit', String(LIMIT));
    params.append('offset', `${this.page ? this.page * LIMIT : 0}`);
    this.predicate.forEach((value, key) => {
      if (key === 'startDate') {
        params.append(key, value.toISOString())
      } else {
        params.append(key, value)
      }
    })
    return params;
  }

  @computed get totalPages() {
    return Math.ceil(this.activityCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  }

  // === only observing reference not going deep into every property of the class ===
  @observable.ref hubConnection: HubConnection | null = null;

  @action createHubConnection = (activityId: string) => {
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
          this.hubConnection?.invoke('AddToGroup', activityId);
        }
      })
      .catch((error) => console.log('Error establishing connection'));

    this.hubConnection.on('RecieveComment', (comment) => {
      runInAction(() => {
        this.activity!.comments.push(comment);
      });
    });

    this.hubConnection.on('Send', (message) => {
      toast.info(message);
    });
  };

  @action stopHubConnection = () => {
    this.hubConnection
      ?.invoke('RemoveFromGroup', this.activity!.id)
      .then(() => {
        this.hubConnection?.stop();
      })
      .then(() => console.log('Connection stopped!'))
      .catch(error => console.log(error));
  };

  @action addComment = async (values: any) => {
    console.log(values);
    values.activityId = this.activity!.id;
    try {
      await this.hubConnection!.invoke('SendComment', values);
    } catch (error) {
      console.log(error);
    }
  };
  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(
      Array.from(this.activityRegistry.values())
    );
  }

  groupActivitiesByDate(activites: IActivity[]) {
    const sortedActivities = activites.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(
      sortedActivities.reduce((activities, activity) => {
        const date = activity.date.toISOString().split('T')[0];
        activities[date] = activities[date]
          ? [...activities[date], activity]
          : [activity];
        return activities;
      }, {} as { [key: string]: IActivity[] })
    );
  }

  //   ==== async await version ====
  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activitiesEnvelope = await agent.Activities.list(this.axiosParams);

      const { activities, activityCount } = activitiesEnvelope;

      runInAction('loading activities', () => {
        // if(activities.length > 0) {
        //   this.activityHit = true;
        // } else {
        //   this.activityHit = false;
        // }
        activities.forEach((activity) => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activityRegistry.set(activity.id, activity);
         
        });
        this.activityCount = activityCount;
        this.loadingInitial = false;
      });
    } catch (error) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  //   ==== example promise chaining version ====
  //   @action loadActivities = () => {
  //     this.loadingInitial = true;
  //     agent.Activities.list()
  //       .then((activities) => {
  //         activities.forEach((activity) => {
  //           activity.date = activity.date.split('.')[0];
  //           this.activities.push(activity);
  //         });
  //       })
  //       .catch(error => console.log(error))
  //       .finally(() => (this.loadingInitial = false));
  //   };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) {
      this.activity = activity;
      return toJS(activity);
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        // console.log(toJS(activity));
        runInAction('getting activity', () => {
          setActivityProps(activity, this.rootStore.userStore.user!);
          this.activity = activity;
          this.activityRegistry.set(activity.id, activity);
          this.loadingInitial = false;

        });
        return activity;
      } catch (error) {
        runInAction('error get activity', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };
  

  // === helper method to loadActivity ===
  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action clearActivity = () => {
    this.activity = null;
  };


  @action createActivity = async (activity: IActivity) => {

    this.submitting = true;
    try {
      await agent.Activities.create(activity)

      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees = [];
      attendees.push(attendee);
      activity.attendees = attendees;
      activity.comments = [];
      activity.isHost = true;
      runInAction('creating activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction('create activity error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data!');
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('editing activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction('edit activity error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data!');
      console.log(error);
    }
  };


  @action deactivateActivity = async (id: string) => {
    try {
      await agent.Activities.deactivate(id);
      // await agent.Feed.addFeedItem(this.activity!.id, 'Deactivated Motocycle Diary');
      runInAction('deactivating activity', () => {
        this.activityRegistry.delete(id);
      });
    } catch (error) {
      runInAction('delete error activity', () => {
        console.log(error);
      });
    }
  };

  @action attendActivity = async () => {
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try {
      await agent.Activities.attend(this.activity!.id);

      runInAction(() => {
        if (this.activity) {
          this.activity.attendees.push(attendee);
          this.activity.isGoing = true;
          this.activityRegistry.set(this.activity.id, this.activity);
          toast.info('You are now part of this diary');

          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error('Problem joining the group at this time');
    }
  };

  @action cancelAttendance = async () => {
    this.loading = true;
    try {
      await agent.Activities.unattend(this.activity!.id);
      runInAction(() => {
        if (this.activity) {
          this.activity.attendees = this.activity.attendees.filter(
            (a) => a.username !== this.rootStore.userStore.user?.userName
          );
          this.activity.isGoing = false;
          this.activityRegistry.set(this.activity.id, this.activity);
          toast.dark('You are not part of this diary anymore');
          this.loading = false;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
      toast.error('Problem cancelling attendance at this time');
    }
  };

  @action createDiaryEntry = async (diaryEntry: IDiaryEntry, activity: IActivity) => {

    diaryEntry.dayNumber = String(activity.diaryEntries.length + 1);
    diaryEntry.activityId = activity.id;
    activity.diaryEntries.push(diaryEntry);
    console.log('diaryEntry', diaryEntry);
    this.submitting = true;

    try {

      await agent.DiaryEntries.createDiaryEntry(diaryEntry);

      runInAction('creating diary entry', () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction('create activity error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data!');
      console.log(error);
    }
  };
  @action editDiaryEntry = async (diaryEntry: IDiaryEntry, activity: IActivity) => {

    let index = activity.diaryEntries.findIndex(x => x.id === diaryEntry.id);
    activity.diaryEntries[index] = diaryEntry;
    this.submitting = true;

    try {
      
      await agent.DiaryEntries.updateDiaryEntry(diaryEntry);

      runInAction('updating diary entry', () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);

    } catch (error) {
      runInAction('create activity error', () => {
        this.submitting = false;
      });
      toast.error('Problem updating data!');
      console.log(error);
    }
  };

  @action loadDiaryEntry = async (id: string) => {

      this.loadingInitial = true;
      try {
        let diaryEntry:IDiaryEntry = await agent.DiaryEntries.detailsDiaryEntry(id);
       
        runInAction('getting activity', () => {
        
          this.diaryEntry = diaryEntry;
          this.loadingInitial = false;

        });
        return this.diaryEntry;
      } catch (error) {
        runInAction('error get diary entry', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
  };


  @action deleteDiaryEntry = async (diaryEntry: IDiaryEntry, activity: IActivity): Promise<void> => {

    activity.diaryEntries.splice(activity.diaryEntries.indexOf(diaryEntry));
    
    this.submitting = true;
    try {
      await agent.DiaryEntries.deleteDiaryEntry(diaryEntry.id);
    
      runInAction('creating diary entry', () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      });
      history.push(`/activities/${activity.id}`);
    } catch (error) {
      runInAction('create activity error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data!');
      console.log(error);
    }
  };
}

