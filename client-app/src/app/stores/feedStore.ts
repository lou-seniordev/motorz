import { action, computed, observable, runInAction } from 'mobx';//computed,

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
    
      groupFeedItemsByDate(feeds: IFeed[]) {
        const sortedFeeds = feeds.sort(
          (a, b) => Date.parse(b.dateTriggered!) - Date.parse(a.dateTriggered!)
        )
        return Object.entries(
            sortedFeeds.reduce((feeds, feed) => {
          const date = feed.dateTriggered?.split('T')[0];
          feeds[date!] = feeds[date!]
          ? [...feeds[date!], feed]
          :[feed];
          return feeds;
      
        }, {} as { [key: string]: IFeed[] }));
      }



  formatDate(feed: IFeed) {
    const delimiter = '.';
    feed.dateTriggered = feed.dateTriggered?.split(delimiter)[0];
    feed.dateTriggered = feed.dateTriggered?.replace('T', ' ');
  }


    @action loadFeed = async () => {
        this.loadingInitial = true;
        try {
            const feedEnvelope = await agent.Feed.list(LIMIT, this.page);
            const { feeds, feedCount } = feedEnvelope;
            console.log(feeds);
            runInAction('loading feed', () => {
                feeds.forEach((feed) => {
                    this.formatDate(feed);
                    this.feedRegistry.set(feed.id, feed);
                  });
                // this.feeds = feeds;
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