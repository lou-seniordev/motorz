import React, { useContext, useEffect } from "react";
import {  Dropdown, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";


const SearchProductsByCountry = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate } = rootStore.productStore;
  const { countries, loadCountriesToSelect } = rootStore.countryStore;
  const { closeModal } = rootStore.modalStore;

  //!!Warning Mem Leak
  useEffect(() => {
    loadCountriesToSelect();
  }, [loadCountriesToSelect]);

const handleOnChange = (e: any, data: any) => {
    setPredicate("country", data.value);
    closeModal();
  };

  return (
    <Grid>
      <Grid.Column width={16}>
           <Dropdown
            placeholder='Filter by country'
            selection
            fluid
            search
            options={countries}
            onChange={handleOnChange}
            clearable
          />
      </Grid.Column>
    </Grid>
  );
};

export default SearchProductsByCountry;
