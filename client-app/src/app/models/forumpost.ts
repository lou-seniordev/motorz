import { IComment } from "./comment";

export interface IForumpost {
  id: string;
  title: string;
  body: string;
  // dateAdded: Date;
  dateAdded: string;
  // displayName: string;
  category: string;
  commentForumPosts: IComment[];
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
