import { IComment } from "./comment";

export interface IForumpostEnvelope {
  forumposts: IForumpost[];
  forumpostCount: number

}

export interface IForumpost {
  id: string;
  title: string;
  body: string;
  dateAdded: string;
  displayName: string;
  userName: string;
  category: string;
  commentForumPosts: IComment[];
  numberOfComents?: number;
  commenters?: IComment [];
  forumpostRatings?: any [];
  forumpostRating: number;
}

export class ForumpostFormValues {
  id?: string;
  title: string = '';
  body: string = '';
  // dateAdded: Date = '';
  dateAdded: string = '';
  // displayName: string = '';
  category: string = '';

  constructor(init?: ForumpostFormValues) {
    if (init)
      Object.assign(this, init);
  }
}

export interface IRateForumpost {
  id: string;
  rating: string;
}
