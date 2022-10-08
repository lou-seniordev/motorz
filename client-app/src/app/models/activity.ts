import { IComment } from "./comment";

export interface IActivitiesEnvelope {
  activities: IActivity[];
  activityCount: number;
}

export interface IActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  countryName: string;
  country: string;
  countryId: string; //maybe new
  departure: string;
  destination: string;
  photoUrl: string;
  isGoing: boolean;
  isHost: boolean;
  isActive: boolean;
  isCompleted: boolean;//maybe new??
  attendees: IAttendee[];
  comments: IComment[];
  diaryEntries: IDiaryEntry[];
  motorcycleBrandId: string;
  motorcycleBrandName: string;
  motorcycleBrandLogoUrl: string;
  file: Blob;
}

export interface IAdminActivity {
  id: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  city: string;
  country: string;
  departure: string;
  destination: string;
  isActive: boolean;
  isCompleted: boolean;//maybe new??
}


export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}

export class ActivityFormValues implements IActivityFormValues {
  id?: string = undefined;
  title: string = '';
  motorcycleBrandId: string = '';
  motorcycleBrandName: string = '';
  motorcycleBrandLogoUrl: string = '';
  category: string = '';
  description: string = '';
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = '';
  countryName: string = '';
  countryId: string = '';
  departure: string = '';
  destination: string = '';
  photoUrl: string = '';
  //TODO:motorcycleBrandId, name etc...


  constructor(init?: IActivityFormValues) {
    if (init && init.date) {
      init.time = init.date;
    }
    Object.assign(this, init);
  }
}

export interface IAttendee {
  username: string;
  displayName: string;
  image: string;
  isHost: boolean;
  following?: boolean;
}
export interface IDiaryEntry {
  id: string;
  body: string;
  dayNumber: string;
  entryDate: Date;
  locationCity: string;
  locationCountry: string;
  road: string;
  weather: string;
  numberOfKilometers: number;
  photoUrl: string;
  mood: string;
  file: any;
  activityId: string;
}

export class DiaryEntryFormValues {
  id?: string = undefined;
  mood: string = '';
  body: string = '';
  entryDate: Date;
  locationCity: string = '';
  locationCountry: string = '';
  photoUrl: string = '';

}
