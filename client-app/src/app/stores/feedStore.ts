import { toJS } from 'mobx';
import { IFeedsToMarkSeen } from './../models/feed';
import { action, computed, observable, runInAction } from 'mobx';//computed,
import { toast } from 'react-toastify';

import agent from '../api/agent';
import { IFeed } from '../models/feed';
import { RootStore } from './rootStore';

const LIMIT = 3;

export default class FeedStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  @observable feedRegistry = new Map();

  @observable feeds: IFeed[] = [];
  @observable feedCount: number = 0;
  @observable page: number = 0;

  @observable loadingInitial = false;

  @computed get totalPages() {
    return Math.ceil(this.feedCount / LIMIT);
  }

  @action setPage = (page: number) => {
    this.page = page;
  }

  @computed get feedByDate() {
    return this.groupFeedItemsByDate(Array.from(this.feedRegistry.values()));
  }

  @computed get unseenFeedItems() {
    return this.countUnseenItems(Array.from(this.feedRegistry.values()));
    // return this.feedCount;
  }

  countUnseenItems (feeds: IFeed[]){
    let count = 0;
    for(var i = 0, len = feeds.length; i < len; i++){
      if(feeds[i].isSeen === false)
        count ++;
    }
    return count
  }

  groupFeedItemsByDate(feeds: IFeed[]) {
    const sortedFeeds = feeds.sort(
      (a, b) => Date.parse(b.dateTriggered!) - Date.parse(a.dateTriggered!)
    )
    return Object.entries(
      sortedFeeds.reduce((feeds, feed) => {
        const date = feed.dateTriggered?.split('T')[0];
        feeds[date!] = feeds[date!]
          ? [...feeds[date!], feed]
          : [feed];
        return feeds;

      }, {} as { [key: string]: IFeed[] }));
  }

  formatDate(feed: IFeed) {
    const delimiter = '.';
    feed.dateTriggered = feed.dateTriggered?.split(delimiter)[0];
    feed.dateTriggered = feed.dateTriggered?.replace('T', ' ');
  }

  @action addFeedItem = async (id: string, info: string, username?: string) => {

    try {
      await agent.Feed.addFeedItem(id, info, username);
      toast.info('Successfully ' + info);
    } catch (error) {
      console.log(error);
      toast.error('Problem ' + info);

    }
  }


  @action markSeenInDB = async (ids: any) => {
    let idsToSend: IFeedsToMarkSeen = ids;
    // console.log(idsToSend);
    try {
      // await agent.Feed.markSeenInDB(idsToSend)
    } catch (error) {
      console.log('error in the seen')
      console.log(error)
    }
  }



  @action loadFeed = async () => {
    this.loadingInitial = true;
    try {
      const feedEnvelope = await agent.Feed.list(LIMIT, this.page);
      const { feeds, feedCount } = feedEnvelope;
      runInAction('loading feed', () => {
        feeds.forEach((feed) => {
          this.formatDate(feed);
          this.feedRegistry.set(feed.id, feed);

        });
        this.feedCount = feedCount;
        this.loadingInitial = false;

      })
    } catch (error) {
      runInAction('load countries error', () => {
        this.loadingInitial = false;

      });
      console.log(error);
    }
  }

}