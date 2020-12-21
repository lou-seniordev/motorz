import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { IActivity } from '../models/activity';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../models/user';
import { IMotofy } from '../models/motofy';
import { IPhoto, IProfile } from '../models/profile';
import { IForumpost } from '../models/forumpost';
import { IMechanic } from '../models/mechanic';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === 'Network Error' && !error.response) {
    toast.error('Network error - API not responsive');
  }
  const { status, data, config } = error.response;
  if (status === 404) {
    history.push('/notfound');
  }
  if (
    status === 400 &&
    config.method === 'get' &&
    data.errors.hasOwnProperty('id')
  ) {
    history.push('/notfound');
  }
  if((status === 404) || (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id'))) {
    history.push('/notfound')
  }
  if (status === 500) {
    toast.error('Server error - check the terminal for more info!');
  }
  // console.log(error.response);
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  delete: (url: string) =>
    axios.delete(url).then(sleep(1000)).then(responseBody),
  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post(url, formData, {
      headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody)
  }
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get('/activities'),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post('/activities', activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
  attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => requests.delete(`/activities/${id}/attend`),
};

const Forumposts = {
  list: (): Promise<IForumpost[]> => requests.get('/forumposts'),
  details: (id: string) => requests.get(`/forumposts/${id}`),
  create: (forumpost: IForumpost) => requests.post('/forumposts', forumpost),
  update: (forumpost: IForumpost) =>
    requests.put(`/forumposts/${forumpost.id}`, forumpost),
  delete: (id: string) => requests.delete(`/forumposts/${id}`),
}

const Mechanics = {
  list: (): Promise<IMechanic[]> => requests.get('mechanics'),
  details: (id: string) => requests.get(`/mechanics/${id}`),
  // // TODO: 
  create: (mechanic: IMechanic) => requests.post('/mechanics', mechanic),
  update: (mechanic: IMechanic) =>
    requests.put(`/mechanics/${mechanic.id}`, mechanic),
  delete: (id: string) => requests.delete(`/mechanics/${id}`),
};

const Motofies = {
  list: (): Promise<IMotofy[]> => requests.get('motofies'),
  details: (id: string) => requests.get(`/motofies/${id}`),
  // TODO: 
  create: (motofy: IMotofy) => requests.post('/motofies', motofy),
  update: (motofy: IMotofy) =>
    requests.put(`/motofies/${motofy.id}`, motofy),
  delete: (id: string) => requests.delete(`/motofies/${id}`),
};
const Brands = {
  list: (): Promise<IMotofy[]> => requests.get('brands'),
  details: (id: string) => requests.get(`/brand/${id}`),
  // DONT THINK IM GONNA LET USER... 
  // create: (motofy: IMotofy) => requests.post('/brands', motofy),
  // update: (motofy: IMotofy) =>
  //   requests.put(`/brands/${motofy.id}`, motofy),
  // delete: (id: string) => requests.delete(`/brands/${id}`),
};

const User = {
  current: (): Promise<IUser> => requests.get('/user'),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`user/register`, user),
};

const Profiles = {
  get: (username: string): Promise<IProfile> =>
    requests.get(`/profiles/${username}`),
  uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos/`, photo),
  setMain: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id:string ) => requests.delete(`/photos/${id}`),
  updateProfile: (profile: Partial<IProfile>) => requests.put(`/profiles`, profile),
  follow: (username: string) => requests.post(`/profiles/${username}/follow`, {}),
  unfollow: (username: string) => requests.delete(`/profiles/${username}/follow`),
  listFollowings: (username: string, predicate: string) => requests.get(`/profiles/${username}/follow?predicate=${predicate}`)
};

export default {
  Activities,
  User,
  Motofies,
  Profiles,
  Forumposts,
  Mechanics,
  Brands
};
