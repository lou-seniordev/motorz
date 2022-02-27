import React, { Fragment, useContext, useEffect } from "react";
import { Divider, Dropdown, Input, Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

import { categories } from '../../../app/common/options/productOptions';
// import { Segment } from "semantic-ui-react";

const ProductFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate
  } = rootStore.productStore;
  const { countries, loadCountriesToSelect } = rootStore.countryStore;

  const handleOnChangeCountry = (e: any, data: any) => {
    setPredicate( 'country', data.value)
  };

  const handleOnChangeCategory = (e: any, data: any) => {
    setPredicate( 'category', data.value)
  };

  const handleResultSelect = (e: any) => {
    if(e.key === 'Enter') {
      setPredicate( 'search', e.target.value)   
      e.target.value = '';
  }
}

  useEffect(() => {
    loadCountriesToSelect();
  }, [loadCountriesToSelect])

  return (
    <Fragment>
      <Menu vertical size='large' style={{ width: "100%" }}>
      <Menu.Item active={predicate.has("search")}>
          <Input
            icon='search'
            placeholder='Search...'
            onKeyDown={(e: any) => handleResultSelect(e)}
          />
        </Menu.Item>
         <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          content={"All Products"}
        />
         <Divider horizontal content='or'/>
        <Menu.Item>
          <Dropdown
            placeholder='Products By Country'
            // active={predicate.has('country')}
            selection
            floating
            search
            options={countries}
            onChange={handleOnChangeCountry}
            clearable 
          />
        </Menu.Item>
        <Divider horizontal content='or'/>
        <Menu.Item>
          <Dropdown
            placeholder='Products By Category'
            selection
            floating
            search
            options={categories}
            onChange={handleOnChangeCategory}
            clearable
          />
        </Menu.Item>
      </Menu> 
    </Fragment>
  );
};

export default ProductFilters;
