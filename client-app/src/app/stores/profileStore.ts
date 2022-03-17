import { action, computed, observable, reaction, runInAction } from 'mobx';
import { toast } from 'react-toastify';

import agent from '../api/agent';
import { IPhoto, IProfile, IUserActivity, IUserForumpost, IUserMechanic, IUserMotofy, IUserProduct } from '../models/profile';
import { RootStore } from './rootStore';


export default class ProfileStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    reaction(
      () => this.activeTab,
      activeTab => {
        if (activeTab === 7 || activeTab === 8) {
          const predicate = activeTab === 7 ? 'followers' : 'following'
          this.loadFollowings(predicate);
        } else {
          this.followings = [];
        }
      }
    )
  }

  @observable profile: IProfile | null = null;
  @observable loadingProfile = true;
  @observable uploadingPhoto = false;
  @observable loading = false;
  @observable followings: IProfile[] = [];
  @observable activeTab: number = 0;

  @observable userActivities: IUserActivity[] = [];
  @observable loadingActivities = false;

  @observable userMotofies: IUserMotofy[] = [];
  @observable loadingMotofies = false;

  @observable userForumposts: IUserForumpost[] = [];
  @observable loadingForumposts = false;

  @observable userMechanics: IUserMechanic[] = [];
  @observable loadingMechanics = false;

  @observable userProducts: IUserProduct[] = [];
  @observable loadingProducts = false;


  @computed get isCurrentUser() {
    if (this.rootStore.userStore.user && this.profile) {
      return this.rootStore.userStore.user.userName === this.profile.username;
    } else {
      return false;
    }
  }
  
  @action loadUserActivities = async (username: string, predicate?: string) => {
    this.loadingActivities = true;

    try {
      const activities = await agent.Profiles.listActivities(username, predicate!);
      runInAction(() => {
        this.userActivities = activities;
        this.loadingActivities = false;
      })
    } catch (error) {
      toast.error('Problem loading user activities');
      runInAction(() => {
        this.loadingActivities = false;
      })
    }
  }
  @action loadUserMotofies = async (username: string, predicate?: string) => {
    this.loadingMotofies = true;
    if (predicate === undefined) {
      predicate = 'iEmbraced'
    }
    try {
      const motofies = await agent.Profiles.listMotofies(username, predicate!);
      runInAction(() => {
        this.userMotofies = motofies;
        this.loadingMotofies = false;
      })
    } catch (error) {
      toast.error('Problem loading user activities');
      runInAction(() => {
        this.loadingMotofies = false;
      })
    }
  }

  @action loadUserForumposts = async (username: string, predicate?: string) => {
    this.loadingForumposts = true;
    if (predicate === undefined) {
      predicate = 'iAsked'
    }
    try {
      const forumposts = await agent.Profiles.listForumposts(username, predicate!);
      runInAction(() => {
        this.userForumposts = forumposts;
        this.loadingForumposts = false;
      })
    } catch (error) {
      toast.error('Problem loading user forumposts');
      runInAction(() => {
        this.loadingForumposts = false;
      })
    }
  }

  @action loadUserMechanics = async (username: string, predicate?: string) => {
    this.loadingMechanics = true;

    if (predicate === undefined) {
      predicate = 'iPublished'
    }
    try {
      const mechanics = await agent.Profiles.listMechanics(username, predicate!);
      runInAction(() => {
        this.userMechanics = mechanics;
        this.loadingMechanics = false;
      })
    } catch (error) {
      toast.error('Problem loading user mechanics');
      runInAction(() => {
        this.loadingMechanics = false;
      })
    }
  }
  @action loadUserProducts = async (username: string, predicate?: string) => {
    this.loadingProducts = true;

    if (predicate === undefined) {
      predicate = 'iAmSelling'
    }
    try {
      const products = await agent.Profiles.listProducts(username, predicate);
      runInAction(() => {
        this.userProducts = products;
        this.loadingProducts = false;
      })
    } catch (error) {
      toast.error('Problem loading user products');
      runInAction(() => {
        this.loadingProducts = false;
      })
    }
  }



  @action setActiveTab = (activeIndex: number) => {
    this.activeTab = activeIndex;
  }

  @action loadProfile = async (username: string) => {
    this.loadingProfile = true;
    try {
      const profile = await agent.Profiles.get(username);
      runInAction(() => {
        this.profile = profile;
        this.loadingProfile = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loadingProfile = false;
      });
      console.log(error);
    }
  };
  @action uploadPhoto = async (file: Blob) => {
    this.uploadingPhoto = true;
    try {
      const photo = await agent.Profiles.uploadPhoto(file);
      runInAction(() => {
        if (this.profile) {
          this.profile.photos.push(photo);
          if (photo.isMain && this.rootStore.userStore.user) {
            this.rootStore.userStore.user.image = photo.url;
            this.profile.image = photo.url;
          }
        }
        this.uploadingPhoto = false;
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem uploading photo');
      runInAction(() => {
        this.uploadingPhoto = false;
      });
    }
  };

  @action setMainPhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await agent.Profiles.setMain(photo.id);
      runInAction(() => {
        this.rootStore.userStore.user!.image = photo.url;
        this.profile!.photos.find((x) => x.isMain)!.isMain = false;
        this.profile!.photos.find((x) => x.id === photo.id)!.isMain = true;
        this.profile!.image = photo.url;
        this.loading = false;
      });
    } catch (error) {
      toast.error('Problem setting photo as main');
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action deletePhoto = async (photo: IPhoto) => {
    this.loading = true;
    try {
      await agent.Profiles.deletePhoto(photo.id);
      runInAction(() => {
        this.profile!.photos = this.profile!.photos.filter(
          (a) => a.id !== photo.id
        );
        this.loading = false;
      });
    } catch (error) {
      toast.error('Problem deleting the photo');
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action updateProfile = async (profile: Partial<IProfile>) => {
    try {
      await agent.Profiles.updateProfile(profile);
      runInAction(() => {
        if (
          profile.displayName !== this.rootStore.userStore.user!.displayName
        ) {
          this.rootStore.userStore.user!.displayName = profile.displayName!;
        }
        this.profile = { ...this.profile!, ...profile };
      });
    } catch (error) {
      toast.error('Problem updating profile');
    }
  };
  @action follow = async (username: string) => {
    this.loading = true;
    try {
      await agent.Profiles.follow(username);
      runInAction(() => {
        this.profile!.following = true;
        this.profile!.followersCount++;
        this.loading = false;
      });
    } catch (error) {
      toast.error('Problem following user');
      runInAction(() => {
        this.loading = false;
      });
    }
  };
  @action unfollow = async (username: string) => {
    this.loading = true;
    try {
      await agent.Profiles.unfollow(username);
      runInAction(() => {
        this.profile!.following = false;
        this.profile!.followersCount--;
        this.loading = false;
      });
    } catch (error) {
      toast.error('Problem unfollowing user');
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action loadFollowings = async (predicate: string) => {
    this.loading = true;
    try {
      const profiles = await agent.Profiles.listFollowings(this.profile!.username, predicate);
      runInAction(() => {
        this.followings = profiles;
        this.loading = false;
      })
    } catch (error) {
      toast.error('Problem loading followings');
      runInAction(() => {
        this.loading = false;
      })
    }
  }
}
