import { IActivity, IAttendee } from '../../models/activity';
import { IEmbracer, IMotofy } from '../../models/motofy';
import { IUser } from '../../models/user';

export const combineDateAndTime = (date: Date, time: Date) => {
  // const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  // const day = date.getDate();
  // const dateString = `${year}-${month}-${day}`;

  const dateString = date.toISOString().split('T')[0];
  const timeString = time.toISOString().split('T')[1];

  //
  return new Date(dateString + 'T' + timeString);
};
// NB: here userName should be changed (also in DB and EF) to username/Username
export const setActivityProps = (activity: IActivity, user: IUser) => {
  activity.date = new Date(activity.date);
  activity.isGoing = activity.attendees.some(
    (a) => a.username === user.userName
  );
  activity.isHost = activity.attendees.some(
    (a) => a.username === user.userName && a.isHost
  );
  return activity;
};

export const setMotofyProps = (motofy: IMotofy, user: IUser) => {
  motofy.embraced = motofy.embracers.some(
    a => a.username === user?.userName
  )
  motofy.isOwner = motofy.embracers.some(
    a => a.username === user.userName && a.isOwner
  )
  return motofy;
}

export const createAttendee = (user: IUser):IAttendee => {
  //test
  console.log('user IAttendee: ')
  console.log(user)
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.userName,
        image: user.image!
    }
}

export const createEmbracer = (user: IUser) : IEmbracer => {
  
  return {
    displayName: user.displayName,
    isOwner: false,
    username: user.userName,
    image: user.image!
  }
}

