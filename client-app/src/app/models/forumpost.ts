import { IComment } from "./comment";

export interface IForumpostEnvelope {
  forumposts: IForumpost[];
  forumpostCount: number

}

export interface IForumpost {
  id: string;
  title: string;
  body: string;
  // dateAdded: Date;
  dateAdded: string;
  displayName: string;
  userName: string;
  category: string;
  commentForumPosts: IComment[];
  numberOfComents?: number;
  commenters?: IComment [];
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
