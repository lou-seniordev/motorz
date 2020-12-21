import { observable, action, computed, configure, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { history } from '../..';
import agent from '../api/agent';
import { IForumpost } from '../models/forumpost';
import { toast } from 'react-toastify';


configure({ enforceActions: 'always' });

class ForumPostStore {
  @observable forumPostRegistry = new Map();
  @observable forumposts: IForumpost[] = [];
  @observable forumpost: IForumpost | null = null;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;

  @observable target = '';

  @computed get forumpostsByDate() {
    return this.groupForumpostsByDate(Array.from(this.forumPostRegistry.values()));
  }

  groupForumpostsByDate(forumposts: IForumpost[]) {
    const sortedForumposts = forumposts.sort(
      (a, b) => Date.parse(a.dateAdded) - Date.parse(b.dateAdded)
    )
    return Object.entries(sortedForumposts.reduce((forumposts, forumpost) => {
      const date = forumpost.dateAdded.split('T')[0];
      forumposts[date] = forumposts[date] ? [...forumposts[date], forumpost] : [forumpost];
      return forumposts;
    },{} as {[key: string]: IForumpost[]}));
  }


  @action loadForumPosts = async () => {
    this.loadingInitial = true;
    try {
      const forumposts = await agent.Forumposts.list();
      runInAction('loading forumposts', () => {
        forumposts.forEach((forumpost) => {
          this.forumPostRegistry.set(forumpost.id, forumpost);
        });
        this.loadingInitial = false;
      });

    } catch (error) {
      runInAction('load forumposts error', () => {
        this.loadingInitial = false;
      });
      console.log(error);
    }
  };

  @action loadForumPost = async (id: string) => {
    let forumpost = this.getForumPost(id);
    if (forumpost) {
      this.forumpost = forumpost;
      return forumpost;
    } else {
      this.loadingInitial = true;
      try {
        forumpost = await agent.Forumposts.details(id);
        runInAction('getting forumpost', () => {
          this.forumpost = forumpost;
          this.forumPostRegistry.set(forumpost.id, forumpost);
          this.loadingInitial = false;
        });
        this.forumpost = forumpost;
      } catch (error) {
        runInAction('get forumpost error', () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearForumPost = () => {
    this.forumpost = null;
  }

  getForumPost = (id: string) => {
    return this.forumPostRegistry.get(id);
  };

  @action createForumpost = async (forumpost: IForumpost) => {
    this.submitting = true;
    try {
      await agent.Forumposts.create(forumpost);
      runInAction('creating forumposts', () => {
        this.forumPostRegistry.set(forumpost.id, forumpost);
        // this.editMode = false;
        this.submitting = false;
      });
      history.push(`/forum/${forumpost.id}`)
    } catch (error) {
      runInAction('create forumpost error', () => {
        this.submitting = false;
      });
      toast.error('Problem submitting data');
      console.log(error);
    }
  };
  @action editForumpost = async (forumpost: IForumpost) => {
    this.submitting = true;
    try {
      await agent.Forumposts.update(forumpost);
      runInAction('editing forumpost', () => {
        this.forumPostRegistry.set(forumpost.id, forumpost);
        this.forumpost = forumpost;
        this.editMode = false;
        this.submitting = false;
      });
      history.push(`/forum/${forumpost.id}`)
    } catch (error) {
      runInAction('edit forumpost error', () => {
        this.submitting = false;
      });
      console.log(error);
    }
  };

  @action deleteForumpost = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Forumposts.delete(id);
      runInAction('deleting forumpost', () => {
        this.forumPostRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      });
    } catch (error) {
      runInAction('delete forumpost error', () => {
        this.submitting = false;
        this.target = '';
      });
      console.log(error);
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.forumpost = null;
  };

  @action openEditForm = (id: string) => {
    this.forumpost = this.forumPostRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSelectedForumpost = () => {
    this.forumpost = null;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
    // TODO: GO BACK WHEREVER YOU WERE
  };

  @action selectForum = (id: string) => {
    this.forumpost = this.forumPostRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new ForumPostStore());
