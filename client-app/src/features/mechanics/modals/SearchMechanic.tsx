import React, { useContext } from "react";
import {  Grid, Input } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";


const SearchMechanic = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate } = rootStore.mechanicStore;

  const { closeModal } = rootStore.modalStore;
  const handleResultSelect = (e: any) => {
    if (e.key === "Enter") {
      setPredicate("search", e.target.value);
      e.target.value = "";
      closeModal();
    }
  };

  return (
    <Grid>
      <Grid.Column width={16}>
            <Input
              style={{ width: "100%" }}
              icon='search'
              placeholder='Search all...'
              onKeyDown={(e: any) => handleResultSelect(e)}
            />
      </Grid.Column>
    </Grid>
  );
};

export default SearchMechanic;
