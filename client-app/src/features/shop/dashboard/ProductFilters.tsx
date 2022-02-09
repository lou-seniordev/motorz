import React, { Fragment, useContext, useEffect } from "react";
import { Dropdown, Header, Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

import { categories } from '../../../app/common/options/productOptions';
// import { Segment } from "semantic-ui-react";

const ProductFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate
    //==TODO--Revisit
    // , trueView,  setTrueView 
  } = rootStore.productStore;
  const { countries, loadCountriesToSelect } = rootStore.countryStore;

  const handleOnChangeCountry = (e: any, data: any) => {
   
    setPredicate( 'country', data.value)
  };
  const handleOnChangeCategory = (e: any, data: any) => {
   
    setPredicate( 'category', data.value)
   
  };



  useEffect(() => {
    loadCountriesToSelect();
  }, [loadCountriesToSelect])

  return (
    <Fragment>
      <Menu vertical size='large' style={{ width: "100%" }}>
        <Header icon={"filter"} attached color='teal' content={"Filters"} />
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          content={"All Products"}
        />
        <Menu.Item>
          <Dropdown
            placeholder='Products By Country'
            // active={predicate.has('country')}
            selection
            floating
            search
            options={countries}
            onChange={handleOnChangeCountry}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            placeholder='Products By Category'
            
            selection
            floating
            search
            options={categories}
            onChange={handleOnChangeCategory}
          />

        </Menu.Item>
       
        {/* <Menu.Item
          // active={predicate.has('dateView')}
          onClick={() => setTrueView()}
          color={"blue"}
          // name={"dateView"}
          content={trueView ? 'View by date' :' View by product' }
        />*/}
      </Menu> 
    </Fragment>
  );
};

export default ProductFilters;
