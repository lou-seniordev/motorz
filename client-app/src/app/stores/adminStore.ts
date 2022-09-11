import { IActivity, IAdminActivity } from './../models/activity';
import { roles } from './../common/options/rolesOptions';
import { action, computed, observable, runInAction, toJS } from 'mobx';
import { toast } from 'react-toastify';

import agent from '../api/agent';
import { IMember } from '../models/member';
import { RootStore } from './rootStore';

import { history } from '../..';
import { IAdminMotofy } from '../models/motofy';
import { IAdminForumpost } from '../models/forumpost';
import { IAdminMechanic } from '../models/mechanic';
import { IAdminProduct } from '../models/product';


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
  @observable activityRegistry = new Map();
  
  @observable activities: IAdminActivity[];
  @observable activity: IAdminActivity;
  @observable activityView: boolean = false;
  @observable loadingActivity = false;
  @observable loadingActivities = false;
  
  @observable motofies: IAdminMotofy[];
  @observable motofyView: boolean = false;
  @observable loadingMotofy = false;
  @observable loadingMotofies = false;
  
  @observable forumposts: IAdminForumpost[];
  @observable forumpostView: boolean = false;
  @observable loadingForumpost = false;
  @observable loadingForumposts = false;
  
  @observable mechanics: IAdminMechanic[];
  @observable mechanicView: boolean = false;
  @observable loadingMechanic = false;
  @observable loadingMechanics = false;
  
  @observable products: IAdminProduct[];
  @observable productView: boolean = false;
  @observable loadingProduct = false;
  @observable loadingProducts = false;

  @observable actualPage: number = 1;
  totalPages: number;

  @action showActivityView = (showView: boolean) => {
    this.activityView = showView;
  }
  @action showMotofyView = (showView: boolean) => {
    this.motofyView = showView;
  }
  @action showForumpostView = (showView: boolean) => {
    this.forumpostView = showView;
  }
  @action showMechanicView = (showView: boolean) => {
    this.mechanicView = showView;
  }
  @action showProductView = (showView: boolean) => {
    this.productView = showView;
  }
  @action setActualPage = (actualPage: number) => {
    this.actualPage = actualPage;
  }

  @computed get memberList() {
    return Array.from(this.membersRegistry.values());
  }
  @computed get activityList() {
    return Array.from(this.activityRegistry.values());
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
  @action loadActivities = async (username: string) => {
 
    this.loadingActivities = true;
    try {
      const activities = await agent.Admin.activities(username);
        runInAction('loading activities',() => {
          this.activities = activities;
          this.activities.forEach(activity => {
            this.activityRegistry.set(activity.id, activity);
          })
          // this.activities = toJS(activities);
          // console.log('in action:::', toJS(this.activities))
          this.loadingActivities = false;
        });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingActivities = false;
      })
      // toast.error('Problem loading activities');
    }
  }
  @action loadActivity = async (id: string) => {
 
    this.loadingActivity = true;
    try {
      let activity = await agent.Admin.activityDetails(id);
        runInAction('loading activity',() => {
          this.activity = activity;
          // this.activity = toJS(activity);
          this.loadingActivity = false;
          this.activityRegistry.set(activity.id, activity)
          // console.log('in action one:::', toJS(this.activity))
        });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingActivity = false;
      })
      // toast.error('Problem loading activities');
    }
  }
  @action loadMotofies = async (username: string) => {
 
    this.loadingMotofies = true;
    try {
      const motofies = await agent.Admin.motofies(username);
        runInAction('loading motofies',() => {
          this.motofies = motofies;
          this.loadingMotofies = false;
        });
        console.log('this.motofies', toJS(this.motofies) )
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingMotofies = false;
      })
      toast.error('Problem loading motofies');
    }
  }
  @action loadForumposts = async (username: string) => {
 
    this.loadingForumposts = true;
    try {
      const forumposts = await agent.Admin.forumposts(username);
        runInAction('loading forumposts',() => {
          this.forumposts = forumposts;
          this.loadingForumposts = false;
        });
        console.log('this.forumposts',toJS(this.forumposts) )
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingForumposts = false;
      })
      toast.error('Problem loading forumposts');
    }
  }
  @action loadMechanics = async (username: string) => {
 
    this.loadingMechanics = true;
    try {
      const mechanics = await agent.Admin.mechanics(username);
        runInAction('loading mechanics',() => {
          this.mechanics = mechanics;
          this.loadingMechanics = false;
        });
        console.log('this.mechanics', toJS(this.mechanics) )

    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingMechanics = false;
      })
      toast.error('Problem loading mechanics');
    }
  }
  @action loadProducts = async (username: string) => {
 
    this.loadingProducts = true;
    try {
      const products = await agent.Admin.products(username);
        runInAction('loading products',() => {
          this.products = products;
          this.loadingProducts = false;
        });
        console.log('this.products', toJS(this.products) )

    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingProducts = false;
      })
      toast.error('Problem loading products');
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