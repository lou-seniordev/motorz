import React, { Fragment, useContext, useEffect } from "react";
import { Divider, Dropdown, Input, Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

import { categories } from "../../../app/common/options/productOptions";
// import { Segment } from "semantic-ui-react";

const ProductFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.productStore;
  const { countries, loadCountriesToSelect } = rootStore.countryStore;

  const handleOnChangeCountry = (e: any, data: any) => {
    setPredicate("country", data.value);
  };

  const handleOnChangeCategory = (e: any, data: any) => {
    setPredicate("category", data.value);
  };

  const handleResultSelect = (e: any) => {
    if (e.key === "Enter") {
      setPredicate("search", e.target.value);
      e.target.value = "";
    }
  };

  useEffect(() => {
    loadCountriesToSelect();
  }, [loadCountriesToSelect]);

  const styles = {
    textAlign: "center"
  };
  return (
    <Fragment>
      <Menu vertical size='large' style={{ width: "100%" }}>
       
        <Menu.Item active={predicate.has("search")}>
          <Input
            icon='search'
            placeholder='Search all...'
            onKeyDown={(e: any) => handleResultSelect(e)}
          />
        </Menu.Item>
        <Divider horizontal content='or' />
        <Menu.Item active={predicate.has("country")}>
          <Dropdown
            fluid
            placeholder='Search products by country'
            selection
            floating
            search
            options={countries}
            onChange={handleOnChangeCountry}
            clearable
          />
        </Menu.Item>
        <Divider horizontal content='or' />
        <Menu.Item>
          <Dropdown
            fluid
            placeholder='Search products by category'
            selection
            floating
            search
            options={categories}
            onChange={handleOnChangeCategory}
            clearable
          />
        </Menu.Item>
        <Divider horizontal content='or chose built in filters' />

        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          style={ styles }
          content={"All Products"}
        />
          <Menu.Item
            active={predicate.has("iView")}
            onClick={() => setPredicate("iView", "true")}
            color={"blue"}
            name={"iView"}
            style={{ textAlign: "center" }}
            content={"Favorites"}
          />
          <Menu.Item
            active={predicate.has("myProducts")}
            onClick={() => setPredicate("myProducts", "true")}
            color={"blue"}
            name={"myProducts"}
            style={{ textAlign: "center" }}
            content={"My products"}
          />
        <Menu.Item
          active={predicate.has("iFollow")}
          onClick={() => setPredicate("iFollow", "true")}
          color={"blue"}
          name={"iFollow"}
          style={ styles }
          content={"By people I follow"}
        />
      </Menu>
    </Fragment>
  );
};

export default ProductFilters;
