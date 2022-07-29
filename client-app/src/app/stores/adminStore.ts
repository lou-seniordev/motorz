import { roles } from './../common/options/rolesOptions';
import { action, computed, observable, runInAction, toJS } from 'mobx';
import { toast } from 'react-toastify';

import agent from '../api/agent';
import { IMember } from '../models/member';
import { RootStore } from './rootStore';

import { history } from '../..';


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
  @observable deleting = false;
  @observable editing = false;
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
        this.membersRegistry.set(member.id, member);

      })
    } catch (error) {
      runInAction('error get member', () => {
        this.loadingMember = false;
      });
      console.log(error)
    }
  }
  @action suspendMember = async (member: IMember) => {
    this.suspending = true;
    member.suspended = true;
    // console.log('member', member)
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
    // console.log('member', member)
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

  @action lockoutMember = async (id: string, time: number) => {
    runInAction(() => {
      this.deleting = true;
    })
    // let admin = this.rootStore.userStore.user!
    try {
      await agent.Admin.lockoutUser(id, time);
      runInAction(() => {
        this.membersRegistry.delete(id);
        // history.push(`/admin/${admin.userName}`)
        this.deleting = false;
      })
    } catch (error) {
      console.log(error)
      runInAction(()=> {
        this.deleting = false;
      })
    }
  }

  @action unlockMember = async (id: string) => {
    runInAction(() => {
      this.deleting = true;
    })
    let admin = this.rootStore.userStore.user!
    try {
      await agent.Admin.unlockUser(id);
      runInAction(() => {
        this.membersRegistry.delete(id);
        // history.push(`/admin/${admin.userName}`)
        this.deleting = false;
      })
    } catch (error) {
      console.log(error)
      runInAction(()=> {
        this.deleting = false;
      })
    }
  }
  @action editRoles = async (member: IMember, roles: string[]) => {
    runInAction(() => {
      this.editing = true;
    })
    member.userRoles = roles;
    try {
      await agent.Admin.editRoles(member.username, roles);
      runInAction(() => {
        this.membersRegistry.set(member.id, member);
        this.editing = false;
      })
    } catch (error) {
      console.log(error)
      runInAction(()=> {
        this.editing = false;
      })
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