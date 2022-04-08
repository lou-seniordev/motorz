import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {  Grid, Input } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";


const SearchGallery = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate } = rootStore.motofyStore;

  const { closeModal } = rootStore.modalStore;

  const { t } = useTranslation(["modals"]);

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
              placeholder={t('Search all')}
              onKeyDown={(e: any) => handleResultSelect(e)}
            />
      </Grid.Column>
    </Grid>
  );
};

export default SearchGallery;
