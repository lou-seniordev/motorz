import { action, observable, runInAction } from 'mobx';//computed,
// import { SyntheticEvent } from 'react';
// import { history } from '../..';
import agent from '../api/agent';
import { ICountry } from '../models/country'; //BrandFormValues,
// import { toast } from 'react-toastify';
import { RootStore } from './rootStore';

//==non of which is actually in use before the admin panel!!!!!!!!!==

export default class CountryStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }
    @observable brandRegistry = new Map();

    @observable countries: ICountry[] = [];
    // @observable brandToSelect: BrandFormValues[] = [];
    // @observable brand: ICountry | null = null;
    @observable loadingInitial = false;
    // @observable editMode = false;
    // @observable submitting = false;

    // @observable target = '';




    @action loadCountriesToSelect = async () => {
        this.loadingInitial = true;
        try {
            const countries = await agent.Countries.list();
            runInAction('loading brands', () => {
                this.countries = countries;
                // console.log('countries', countries);
            })
        } catch (error) {
            runInAction('load countries error', () => {
                this.loadingInitial = false;

            });
            console.log(error);
        }
    }



    // @action clearBrand = () => {
    //     this.brand = null;
    // }

    // getBrand = (id: string) => {
    //     return this.brandRegistry.get(id);
    // };

    // @action createBrand = async (brand: IBrand) => {
    //     this.submitting = true;
    //     try {
    //         await agent.Brands.create(brand);
    //         runInAction('creating brands', () => {
    //             this.brandRegistry.set(brand.id, brand);
    //             this.editMode = false;
    //             this.submitting = false;
    //         });
    //         history.push(`/brands/${brand.id}`)
    //     } catch (error) {
    //         runInAction('create brand error', () => {
    //             this.submitting = false;
    //         });
    //         toast.error('Problem submitting data');
    //         // console.log(error.response);
    //     }
    // };
}