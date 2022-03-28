import { IDiaryEntry } from './../models/activity';
import axios, { AxiosResponse } from "axios";
import { IMechanic } from "../models/mechanic";
import { IMotofy } from "../models/motofy";
import { IProduct } from "../models/product";

const responseBody = (response: AxiosResponse) => response.data;

export const postMotofy = {
  motofyForm: (url: string, motofy: IMotofy) => {
    let motofyData = new FormData();
    motofyData.append('Id', motofy.id!)
    motofyData.append('Name', motofy.name)
    motofyData.append('BrandName', motofy.brandName)
    motofyData.append('Model', motofy.model)
    motofyData.append('CubicCentimeters', motofy.cubicCentimeters)
    motofyData.append('File', motofy.file);
    motofyData.append('Description', motofy.description!)
    motofyData.append('YearOfProduction', motofy.yearOfProduction!)
    motofyData.append('DatePublished', motofy.datePublished!)
    motofyData.append('City', motofy.city)
    motofyData.append('Country', motofy.countryName)
    motofyData.append('PricePaid', motofy.pricePaid)
    motofyData.append('EstimatedValue', motofy.estimatedValue)
    motofyData.append('NumberOfKilometers', motofy.numberOfKilometers)
    return axios.post(url, motofyData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
      .then(responseBody);
  }
};

export const postProduct = {
  productForm: (url: string, product: IProduct) => {
    let productData = new FormData();
    productData.append('Id', product.id!)
    productData.append('Title', product.title)
    productData.append('Description', product.description!)
    productData.append('brand', product.brand)
    productData.append('Model', product.model)
    productData.append('Category', product.category)
    productData.append('File', product.file);
    productData.append('Country', product.countryName)
    productData.append('City', product.city)
    productData.append('Price', product.price)
    productData.append('PhoneNumber', product.phoneNumber)
    return axios.post(url, productData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
      .then(responseBody);
  }
};
export const postDiaryEntry = {
  diaryEntryForm: (url: string, diaryEntry: IDiaryEntry) => {
    let diaryEntryData = new FormData();
    diaryEntryData.append('Id', diaryEntry.id!)
    diaryEntryData.append('ActivityId', diaryEntry.activityId)
    diaryEntryData.append('Body', diaryEntry.body)
    diaryEntryData.append('Mood', diaryEntry.mood!)
    diaryEntryData.append('Road', diaryEntry.road!)
    diaryEntryData.append('Weather', diaryEntry.weather!)
    diaryEntryData.append('NumberOfKilometers', String(diaryEntry.numberOfKilometers!))
    diaryEntryData.append('File', diaryEntry.file) 
    diaryEntryData.append('LocationCountry', diaryEntry.locationCountry)
    diaryEntryData.append('LocationCity', diaryEntry.locationCity)

    return axios.post(url, diaryEntryData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
      .then(responseBody);
  }
};


export const postMechanic = {
  mechanicForm: (url: string, mechanic: IMechanic) => {
    let isCustomer = String(mechanic.customers[0].isCustomer);
    let isOwner = String(mechanic.customers[0].isOwner);
    let customerRecommended = String(mechanic.customers[0].customerRecommended);
    let mechanicData = new FormData();
    mechanicData.append('Id', mechanic.id!)
    mechanicData.append('MechanicBrands', mechanic.brands)
    mechanicData.append('Name', mechanic.name)
    mechanicData.append('Owner', mechanic.owner)
    mechanicData.append('Description', mechanic.description!)
    mechanicData.append('YearOfStart', mechanic.yearOfStart!)
    mechanicData.append('Country', mechanic.countryName)
    mechanicData.append('City', mechanic.city)
    mechanicData.append('Address', mechanic.address)
    mechanicData.append('Email', mechanic.email)
    mechanicData.append('Phone', mechanic.phone)
    mechanicData.append('Website', mechanic.website)
    mechanicData.append('Testimonial', mechanic.description!)
    mechanicData.append('IsCustomer', isCustomer!)
    mechanicData.append('IsOwner', isOwner!)
    mechanicData.append('CustomerRecommended', customerRecommended!)
    // mechanicData.append('Customers', mechanic.customers)
    mechanicData.append('File', mechanic.file)
    return axios.post(url, mechanicData, {
      headers: { 'Content-type': 'multipart/form-data' }
    })
      .then(responseBody);
  }
};

//   export default {
//     specialRequests,
//     postProduct,
//     postMechanic
//   }