import { action, computed, observable, reaction, runInAction } from 'mobx';

import agent from '../api/agent';
import {  IProfile } from '../models/profile';
import { RootStore } from './rootStore';
import { v4 as uuid } from "uuid";
import { toast } from 'react-toastify';

const LIMIT = 8;


export default class PeopleStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
        () => this.predicate.keys(),
        () => {
          this.page = 0;
          this.peopleRegistry.clear();
          this.loadPeople();
        }
      )
  }

  @observable loadingPeople = false;
  @observable people: IProfile[] = [];
  @observable peopleCount: number;
  @observable peopleRegistry = new Map();


  @observable page: number = 0;

  @computed get totalPages() {
    return Math.ceil(this.peopleCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  }

  @observable predicate = new Map();
//   @observable searchString = '';

  @action setPredicate = (predicate: string, value: string  ) => { //| Date
    this.predicate.clear();
    if (predicate !== 'all') {
      this.predicate.set(predicate, value);
 
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


  @computed get displayPeople () {
    return Array.from(this.peopleRegistry.values());
  } 

  @action cleanPeople = async () => {
    runInAction(() => {
      this.peopleRegistry.clear();
      this.page = 0;
    })
  }
  @action loadPeople = async () => {

    this.loadingPeople = true;
    try {
      const peopleEnvelope = await agent.Profiles.listPeople(this.axiosParams);
      const { people, peopleCount } = peopleEnvelope;
      runInAction(() => {
        this.loadingPeople = false;
        people.forEach(person => {
          person.id = uuid()
          this.peopleRegistry.set(person.id, person);
        })
        this.peopleCount = peopleCount;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingPeople = false;
      })
      toast.error('Problem loading members');
    }
  }

}
