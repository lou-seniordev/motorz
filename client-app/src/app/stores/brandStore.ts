import { action, observable,  runInAction } from 'mobx';//computed,
// import { SyntheticEvent } from 'react';
// import { history } from '../..';
import agent from '../api/agent';
import {  IBrand } from '../models/brand'; //BrandFormValues,
// import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

//==non of which is actually in use before the admin panel!!!!!!!!!==

export default class BrandStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }
  // @observable brandRegistry = new Map();

  @observable brands: IBrand[] = [];
  // @observable brandToSelect: BrandFormValues[] = [];
  @observable brand: IBrand | null = null;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;

  // @observable target = '';

  @action loadBrandsToSelect = async () => {
    this.loadingInitial = true;
    try {
      const brands = await agent.Brands.list();
      runInAction('loading brands', () => {
        this.brands = brands;
        console.log('brands', brands);

      })
    } catch (error) {
      runInAction('load brands error', () => {
        this.loadingInitial = false;

      });
      console.log(error);
    }
  }

  // @action loadBrands = async () => {
  //   this.loadingInitial = true;
  //   try {
  //     const brands = await agent.Brands.list();
  //     runInAction('loading brands', () => {
  //       // brands.forEach((brand) => {

  //       //   //not sure if it has T as a separator // and do I need it??
  //       //   // brand.dateOfEstablishment = brand.dateOfEstablishment?.split('T')[1];
  //       //   //test (still need it)
  //       // //  console.log('brand', brand.name ); 

  //       // //  this.brands.push(brand); // === refactor for map
  //       // //  this.brandRegistry.set(brand.id, brand.name);
  //       // });
  //       console.log('brands', brands ); 
  //       //test (still need it)
  //       // console.log('this.brandRegistry', this.brandRegistry ); 
  //       // this.brandRegistry.forEach()
  //       // return this.brandRegistry;
  //       this.loadingInitial = false;
  //       return this.brands;
  //     });
  //   } catch (error) {
  //     runInAction('load brands error', () => {
  //       this.loadingInitial = false;
  //     });
  //     console.log(error);
  //   }
  // };

  //??--isreally needed
  // @action loadBrand = async (id: string) => {
  //   let brand = this.getBrand(id);
  //   if (brand) {
  //     this.brand = brand;
  //     return brand;
  //   } else {
  //     this.loadingInitial = true;
  //     try {
  //       brand = await agent.Brands.details(id);
  //       runInAction('getting brand', () => {
  //         this.brand = brand;
  //         this.loadingInitial = false;
  //       });
  //       return brand;
  //     } catch (error) {
  //       runInAction('get brand error', () => {
  //         this.loadingInitial = false;
  //       });
  //       console.log(error);
  //     }
  //   }
  // };

  // @action clearBrand = () => {
  //   this.brand = null;
  // }

  // getBrand = (id: string) => {
  //   return this.brandRegistry.get(id);
  // };

  // @action createBrand = async (brand: IBrand) => {
  //   this.submitting = true;
  //   try {
  //     await agent.Brands.create(brand);
  //     runInAction('creating brands', () => {
  //       this.brandRegistry.set(brand.id, brand);
  //       this.editMode = false;
  //       this.submitting = false;
  //     });
  //     history.push(`/brands/${brand.id}`)
  //   } catch (error) {
  //     runInAction('create brand error', () => {
  //       this.submitting = false;
  //     });
  //     toast.error('Problem submitting data');
  //     // console.log(error.response);
  //   }
  // };

  // //LATER!!!
  // @action editbrand = async (brand: IBrand) => {
  //   this.submitting = true;
  //   try {
  //     // console.log('brand', brand);
  //     await agent.Brands.update(brand);
  //     runInAction('creating brand', () => {
  //       this.brandRegistry.set(brand.id, brand);
  //       this.brand = brand;
  //       this.editMode = false;
  //       this.submitting = false;
  //     });
  //     history.push(`/brands/${brand.id}`)
  //   } catch (error) {
  //     runInAction('create brand error', () => {
  //       this.submitting = false;
  //     });
  //     toast.error('Problem submitting data');
  //     // console.log(error.response);
  //   }
  // };

  //         //LATER!!!
  // @action deleteBrand = async (
  //   event: SyntheticEvent<HTMLButtonElement>,
  //   id: string
  // ) => {
  //   this.submitting = true;
  //   this.target = event.currentTarget.name;
  //   try {
  //     await agent.Brands.delete(id);
  //     runInAction('deleting brand', () => {
  //       this.brandRegistry.delete(id);
  //       this.submitting = false;
  //       this.target = '';
  //     });
  //   } catch (error) {
  //     runInAction('delete brand error', () => {
  //       this.submitting = false;
  //       this.target = '';
  //     });
  //     console.log(error);
  //   }
  // };

  // @action openCreateForm = () => {
  //   this.editMode = true;
  //   this.brand = null;
  // };
  // @action openEditForm = (id: string) => {
  //   this.brand = this.brandRegistry.get(id);
  //   // console.log(this.brand?.yearOfStart);
  //   this.editMode = true;
  // };
  // @action cancelSelectedBrand = () => {
  //   this.brand = null;
  // };
  // @action cancelFormOpen = () => {
  //   this.editMode = false;
  //   // TODO: GO BACK WHEREVER YOU WERE
  // };

  // @action selectBrand = (id: string) => {
  //   // this.selectedbrand = this.brands.find(m => m.id === id); // === refactor for map
  //   this.brand = this.brandRegistry.get(id);
  //   this.editMode = false;
  // };
}