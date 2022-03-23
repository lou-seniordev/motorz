import React, { useContext } from "react";
import {  Dropdown, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { category } from "../../../app/common/options/forumCategoryOptions";


const SearchForumByCategory = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate } = rootStore.forumPostStore;

  const { closeModal } = rootStore.modalStore;

const handleOnChange = (e: any, data: any) => {
    setPredicate("category", data.value);
    closeModal();
  };

  return (
    <Grid>
      <Grid.Column width={16}>
      <Dropdown
            placeholder='Filter by category'
            selection
            fluid
            search
            options={category}
            onChange={handleOnChange}
            clearable
          />
      </Grid.Column>
    </Grid>
  );
};

export default SearchForumByCategory;
