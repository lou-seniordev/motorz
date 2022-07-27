import { toJS } from 'mobx';
import { action, computed, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';

import agent from '../api/agent';
import { IMember } from '../models/member';
import { RootStore } from './rootStore';

const PAGENUMBER = 1;
const PAGESIZE = 10;

export default class AdminStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable members: IMember[] = [];
  @observable member: IMember;
  @observable loadingMembers = false;
  @observable loadingMember = false;
  @observable suspending = false;
  @observable reactivating = false;
  @observable membersRegistry = new Map();

  @observable actualPage: number = 1;
  totalPages: number;

  @action setActualPage = (actualPage: number) => {
    this.actualPage = actualPage;
  }

  @computed get memberList() {
    return Array.from(this.membersRegistry.values());
  }


  @action loadMembers = async () => {

    let params = new URLSearchParams();

    params.append('pageNumber', PAGENUMBER.toString());
    params.append('pageSize', PAGESIZE.toString());

    this.loadingMembers = true;
    try {

      await agent.Admin.listUsers(params).then((response) => {
        runInAction(() => {

          if (response.headers.pagination !== null) {
            this.members = response.data;
            this.totalPages = JSON.parse(response.headers.pagination).totalPages;
            this.members.forEach(member => {
              this.membersRegistry.set(member.id, member);
            })
            this.loadingMembers = false;
          }
        });
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingMembers = false;
      })
      toast.error('Problem loading members');
    }
  }

  @action loadMember = async (username: string) => {
    this.loadingMember = true;
    try {
      let member = await agent.Admin.details(username);
      runInAction(() => {
        this.member= member;
        this.loadingMember = false;
        console.log('member', member)

      })
    } catch (error) {
      console.log(error)
      this.loadingMember = false;
    }
  }
  @action suspendMember = async (member: IMember) => {
    this.suspending = true;
    member.suspended = true;
    // member.suspended = true;
    console.log('member', member)
    try {
      await agent.Admin.suspend(member.username);
      runInAction(() => {
        this.membersRegistry.set(member.id, member);
        this.suspending = false;
      })
    } catch (error) {
      console.log(error)
      this.suspending = false;
    }
  }

  @action reactivateMember = async (member: IMember) => {
    this.reactivating = true;
    member.suspended = false;
    console.log('member', member)
    try {
      await agent.Admin.reactivate(member.username);
      runInAction(() => {
        this.membersRegistry.set(member.id, member);
        this.reactivating = false;
      })
    } catch (error) {
      console.log(error)
      this.reactivating = false;
    }
  }

  @action changePage = async (pageNumber: string) => {
    let params = new URLSearchParams();
    params.append('pageNumber', pageNumber);
    params.append('pageSize', PAGESIZE.toString());
    this.loadingMembers = true;
    try {
      await agent.Admin.listUsers(params).then((response) => {
        runInAction(() => {
          if (response.headers.pagination !== null) {
            this.members = response.data;
            this.totalPages = JSON.parse(response.headers.pagination).totalPages;
            this.membersRegistry.clear();
            this.members.forEach(member => {
              this.membersRegistry.set(member.id, member);
            })
            this.loadingMembers = false;
          }
        });
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingMembers = false;
      })
      toast.error('Problem re-loading members');
    }
  }
}