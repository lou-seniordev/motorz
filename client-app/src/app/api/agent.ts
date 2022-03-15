import { IProfileEnvelope } from './../models/profile';
import { IRateMotofy } from './../models/motofy';
// import { MechanicValues, IMechanicCustomerToBecome } from './../models/mechanic';
import { IMessage, IMessageEnvelope, IMessageToSend } from './../models/message';
import { IMotofy, IMotofyEnvelope } from './../models/motofy'; //MotofyFormValues
import axios, { AxiosResponse } from 'axios';
import { history } from '../..';
import { IActivity, IActivitiesEnvelope, IDiaryEntry } from '../models/activity';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../models/user';
// import { IMotofy } from '../models/motofy';
import { IPhoto, IProfile } from '../models/profile';
import { IForumpost, IForumpostEnvelope, IRateForumpost } from '../models/forumpost';
import { IMechanic, IMechanicCustomerToBecome, IMechanicRate, IMechanicRecommend, IMechanicsEnvelope } from '../models/mechanic';
import { IBrand } from '../models/brand';
import { IProduct, IProductsEnvelope } from '../models/product';//, ProductFormValues
import { ICountry } from '../models/country';
import { postDiaryEntry, postMotofy } from './agentUtil';
import { postProduct } from './agentUtil';
import { postMechanic } from './agentUtil';
import { IFeedEnvelope } from '../models/feed';
import { IPrivateMessageEnvelope } from '../models/privatemessages';
// import { resolve } from 'dns';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.baseURL = 'http://localhost:5000/api';

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
  const { status, data, config, headers } = error.response;
  if (status === 404) {
    history.push('/notfound');
  }
  if (status === 401
    && headers['www-authenticate'].startsWith('Bearer error="invalid_token", error_description="The token expired')) {
    window.localStorage.removeItem('jwt');
    history.push('/');
    toast.info('Your session has expired, please login again')
  }
  if (
    status === 400 &&
    config.method === 'get' &&
    data.errors.hasOwnProperty('id')
  ) {
    history.push('/notfound');
  }
  if ((status === 404) || (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id'))) {
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
  get: (url: string) =>
    axios.get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body)
      // .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body)
      // .then(sleep(1000))
      .then(responseBody),
  delete: (url: string) =>
    axios.delete(url)
      // .then(sleep(1000))
      .then(responseBody),

  postForm: (url: string, file: Blob) => {
    let formData = new FormData();
    formData.append('File', file);
    // console.log('photo file From agent: ', file)

    return axios.post(url, formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
      .then(responseBody)
  }
};

// const specialRequests = {
//   motofyForm: (url: string, motofy: IMotofy) => {
//     let motofyData = new FormData();
//     motofyData.append('Id', motofy.id!)
//     motofyData.append('Name', motofy.name)
//     motofyData.append('BrandName', motofy.brandName)
//     motofyData.append('Model', motofy.model)
//     motofyData.append('CubicCentimeters', motofy.cubicCentimeters)
//     motofyData.append('File', motofy.file);
//     motofyData.append('Description', motofy.description!)
//     motofyData.append('YearOfProduction', motofy.yearOfProduction!)
//     motofyData.append('DatePublished', motofy.datePublished!)
//     motofyData.append('City', motofy.city)
//     motofyData.append('Country', motofy.countryName)
//     motofyData.append('PricePaid', motofy.pricePaid)
//     motofyData.append('EstimatedValue', motofy.estimatedValue)
//     motofyData.append('NumberOfKilometers', motofy.numberOfKilometers)
//     return axios.post(url, motofyData, {
//       headers: { 'Content-type': 'multipart/form-data' }
//     })
//       .then(responseBody);
//   }
// };

// const postProduct = {
//   productForm: (url: string, product: IProduct) => {
//     let productData = new FormData();
//     productData.append('Id', product.id!)
//     productData.append('Title', product.title)
//     productData.append('Description', product.description!)
//     productData.append('brand', product.brand)
//     productData.append('Model', product.model)
//     productData.append('Category', product.category)
//     productData.append('File', product.file);
//     productData.append('Country', product.countryName)
//     productData.append('City', product.city)
//     productData.append('Price', product.price)
//     productData.append('PhoneNumber', product.phoneNumber)
//     return axios.post(url, productData, {
//       headers: { 'Content-type': 'multipart/form-data' }
//     })
//       .then(responseBody);
//   }
// };


// const postMechanic = {
//   mechanicForm: (url: string, mechanic: IMechanic) => {
//     // console.log('mechanic', mechanic) 
//     let mechanicData = new FormData();
//     mechanicData.append('Id', mechanic.id!)
//     mechanicData.append('Name', mechanic.name)
//     mechanicData.append('Description', mechanic.description!)
//     mechanicData.append('YearOfStart', mechanic.yearOfStart!)
//     mechanicData.append('Country', mechanic.countryName)
//     mechanicData.append('City', mechanic.city)
//     mechanicData.append('Address', mechanic.address)
//     mechanicData.append('Email', mechanic.email)
//     mechanicData.append('Phone', mechanic.phone)
//     mechanicData.append('Website', mechanic.website)
//     mechanicData.append('File', mechanic.file);
//     return axios.post(url, mechanicData, {
//       headers: { 'Content-type': 'multipart/form-data' }
//     })
//       .then(responseBody);
//   }
// };

const Motofies = {
  // list: (limit?: number, page?: number): Promise<IMotofyEnvelope> => 
  // requests.get(`motofies?limit=${limit}&offset=${page ? page * limit! : 0}`),
  //  uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos/`, photo),

  list: (params: URLSearchParams): Promise<IMotofyEnvelope> =>
    axios.get('/motofies', { params: params })
      // .then(sleep(1000))
      .then(responseBody),


  details: (id: string) => requests.get(`/motofies/${id}`),
  // TODO: 
  // create: (motofy: IMotofy) => requests.post('/motofies', motofy),
  create: (motofy: IMotofy) => postMotofy.motofyForm('/motofies', motofy),//: Promise<IMotofy>

  update: (motofy: IMotofy) =>
    requests.put(`/motofies/${motofy.id}`, motofy),
  delete: (id: string) => requests.delete(`/motofies/${id}`),
  embrace: (id: any) => requests.post(`/motofies/${id}/embrace`, {}),
  unembrace: (id: any) => requests.delete(`/motofies/${id}/embrace`),
  rate: (id: string, rating: IRateMotofy) => requests.put(`/motofies/${id}/rate`, rating)
};

const Mechanics = {
  list: (params: URLSearchParams): Promise<IMechanicsEnvelope> =>
    axios.get('/mechanics', { params: params }).then(sleep(1000)).then(responseBody),

  details: (id: string) => requests.get(`/mechanics/${id}`),
  // // TODO: 
  // create: (mechanic: IMechanic) => requests.post('/mechanics', mechanic),
  create: (mechanic: IMechanic) => postMechanic.mechanicForm('/mechanics', mechanic),
  update: (mechanic: IMechanic) => requests.put(`/mechanics/${mechanic.id}`, mechanic),
  becomecustomer: (newCustomer: IMechanicCustomerToBecome) => requests.post('/mechanics/addcustomer', newCustomer),
  recommend: (mechanicRecomend: IMechanicRecommend) => requests.put('/mechanics/recommend', mechanicRecomend),
  rate: (mechanicRate: IMechanicRate) => requests.put('/mechanics/rate', mechanicRate),
  addtestimonial: (testimonial: any) => requests.put('/mechanics/addtestimonial', testimonial),
  delete: (id: string) => requests.delete(`/mechanics/${id}`),
};

const Products = {
  list: (params: URLSearchParams): Promise<IProductsEnvelope> =>
    // requests.get(`/products?limit=${limit}&offset=${page ? limit * page : 0}`),
    axios.get('/products', { params: params }).then(sleep(1000)).then(responseBody),

  details: (id: string) => requests.get(`/products/${id}`),
  create: (product: IProduct) => postProduct.productForm('/products', product),
  update: (product: IProduct) => requests.put(`/products/${product.id}`, product),
  delete: (id: string) => requests.delete(`/products/${id}`),
  follow: (id: string) => requests.put(`/products/${id}/follow`, {}),
  unfollow: (id: string) => requests.delete(`/products/${id}/unfollow`),
  // updatephoto: (photo: Blob, id: string): Promise<IPhoto> => requests.postForm(`/photos/${id}/updatePhoto`, photo),
  toogleActivate: (id: string) => requests.post(`/products/${id}/toogleActivate`, {}),
  visitCounter: (id: string) => requests.put(`/products/${id}/visitCounter`, {})
}

const Activities = {

  list: (params: URLSearchParams): Promise<IActivitiesEnvelope> =>
    axios.get('/activities', { params: params })
      // .then(sleep(1000))
      .then(responseBody),

  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post('/activities', activity),
  update: (activity: IActivity) =>
  requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
  deactivate: (id: string) => requests.put(`/activities/${id}/deactivate`, {}),
  attend: (id: string) => requests.post(`/activities/${id}/attend`, {}),
  unattend: (id: string) => requests.delete(`/activities/${id}/attend`),
  
  
};

const DiaryEntries = {
  createDiaryEntry: (diaryEntry: IDiaryEntry) => postDiaryEntry.diaryEntryForm('/diaryentries', diaryEntry),
  deleteDiaryEntry: (id: string) => requests.delete(`/diaryentries/${id}`),
  detailsDiaryEntry: (id: string) => requests.get(`/diaryentries/${id}`),
  updateDiaryEntry: (diaryEntry: IDiaryEntry) => requests.put(`/diaryentries/${diaryEntry.id}`, diaryEntry),

}

const Feed = {
  list: (limit: number, page: number): Promise<IFeedEnvelope> =>
    requests.get(`/feeds?limit=${limit}&offset=${page ? page * limit! : 0}`),
  addFeedItem: (id: string, info: string) => requests.post(`/feeds/${id}/${info}/addFeedItem`, {}),
  removeFeedItem: (id: string, info: string) => requests.delete(`/feeds/${id}/${info}/removeFeedItem`)
};

const Messages = {
  list: (limit: number, page: number): Promise<IMessageEnvelope> =>
    requests.get(`/messages?limit=${limit}&offset=${page ? page * limit! : 0}`),
  // list: (container: string): Promise<IMessage[]> => requests.get(`/messages/?container=${container}`),

  thread: (id: string): Promise<IMessage[]> => requests.get(`/messages/thread/${id}`),
  // details: (id: string) => requests.get(`/messages/${id}`),

  create: (message: IMessageToSend) => requests.post('/messages/', message),


  delete: (id: string) => requests.delete(`/messages/${id}`),
  markRead: (id: string) => requests.put(`/messages/${id}/markRead`, {})
}
const PrivateMessages = {
  list: (limit: number, page: number): Promise<IPrivateMessageEnvelope> =>
    requests.get(`/privatemessages?limit=${limit}&offset=${page ? page * limit! : 0}`),

  thread: (id: string): Promise<IMessage[]> => requests.get(`/messages/thread/${id}`),
  // details: (id: string) => requests.get(`/messages/${id}`),

  create: (message: IMessageToSend) => requests.post('/privatemessages/', message),


  delete: (id: string) => requests.delete(`/messages/${id}`),
  markRead: (id: string) => requests.put(`/messages/${id}/markRead`, {})
}

const Forumposts = {
  // list: (limit?:number, page?:number): Promise<IForumpostEnvelope> => 
  //   requests.get(`/forumposts?limit=${limit}&offset=${page ? page * limit! : 0}`),

  list: (params: URLSearchParams): Promise<IForumpostEnvelope> =>
    axios.get('/forumposts', { params: params }).then(sleep(1000)).then(responseBody),
  details: (id: string) => requests.get(`/forumposts/${id}`),
  create: (forumpost: IForumpost) => requests.post('/forumposts', forumpost),
  update: (forumpost: IForumpost) =>
    requests.put(`/forumposts/${forumpost.id}`, forumpost),
  delete: (id: string) => requests.delete(`/forumposts/${id}`),
  rate: (rate: IRateForumpost) => requests.put(`/forumposts/rate`, rate)
}



const Brands = {
  list: (): Promise<IBrand[]> => requests.get('brands'),
  details: (id: string) => requests.get(`/brand/${id}`),
  // DONT THINK IM GONNA LET USER... 
  // but i might let admin
  //NOT finished!!!
  create: (motofy: IBrand) => requests.post('/brands', motofy),
  // update: (motofy: IMotofy) =>
  //   requests.put(`/brands/${motofy.id}`, motofy),
  // delete: (id: string) => requests.delete(`/brands/${id}`),
};
const Countries = {
  list: (): Promise<ICountry[]> => requests.get('countries'),
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
  listPeople: (params: URLSearchParams): Promise<IProfileEnvelope> =>
    axios.get('/profiles/people', { params: params }).then(sleep(1000)).then(responseBody),
  uploadPhoto: (photo: Blob): Promise<IPhoto> => requests.postForm(`/photos/`, photo),
  setMain: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
  deletePhoto: (id: string) => requests.delete(`/photos/${id}`),
  updateProfile: (profile: Partial<IProfile>) => requests.put(`/profiles`, profile),
  follow: (username: string) => requests.post(`/profiles/${username}/follow`, {}),
  unfollow: (username: string) => requests.delete(`/profiles/${username}/follow`),
  //==TODO--Refactor
  listFollowings: (username: string, predicate: string) =>
    requests.get(`/profiles/${username}/follow?predicate=${predicate}`),
  listActivities: (username: string, predicate: string) =>
    requests.get(`/profiles/${username}/activities?predicate=${predicate}`),
  listMotofies: (username: string, predicate: string) =>
    requests.get(`/profiles/${username}/motofies?predicate=${predicate}`),
  listForumposts: (username: string, predicate: string) =>
    requests.get(`/profiles/${username}/forumposts?predicate=${predicate}`),
  listMechanics: (username: string, predicate: string) =>
    requests.get(`/profiles/${username}/mechanics?predicate=${predicate}`),
  listProducts: (username: string, predicate: string) =>
    requests.get(`/profiles/${username}/products?predicate=${predicate}`)

};

export default {
  Activities,
  User,
  Motofies,
  Profiles,
  Forumposts,
  Mechanics,
  Brands,
  Products,
  Messages,
  Countries,
  Feed,
  DiaryEntries,
  PrivateMessages
};
