// import { toJS } from 'mobx';
import { action, computed, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';

import agent from '../api/agent';
import { IMember } from '../models/member';
// import { IPhoto, IProfile, IUserActivity, IUserForumpost, IUserMechanic, IUserMotofy, IUserProduct } from '../models/profile';
import { RootStore } from './rootStore';


export default class AdminStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable members: IMember[] = [];
  @observable loadingMembers = false;
  @observable membersRegistry = new Map();

  @computed get memberList () {
    return Array.from(this.membersRegistry.values());
  } 


  @action loadMembers = async () => {

    this.loadingMembers = true;
    try {
      // const peopleEnvelope = await agent.Profiles.listPeople(this.axiosParams);
      // const { people, peopleCount } = peopleEnvelope;
      const members = await agent.Admin.list();
      runInAction(() => {
        this.loadingMembers = false;
        members.forEach(member => {
          this.membersRegistry.set(member.id, member);
        })
        // console.log(toJS(this.membersRegistry));
        // this.peopleCount = peopleCount;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingMembers = false;
      })
      toast.error('Problem loading members');
    }
  }

}
