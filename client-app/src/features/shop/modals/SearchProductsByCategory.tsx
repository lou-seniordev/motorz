import React, { useContext } from "react";
import { Dropdown, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { categories } from "../../../app/common/options/productOptions";
import { useTranslation } from "react-i18next";

const SearchProductsByCategory = () => {
  const rootStore = useContext(RootStoreContext);
  const { setPredicate } = rootStore.productStore;

  const { closeModal } = rootStore.modalStore;
  const { t } = useTranslation(["modals"]);

  const handleOnChange = (e: any, data: any) => {
    setPredicate("category", data.value);
    closeModal();
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <Dropdown
          placeholder={t('Filter by category')}
          selection
          fluid
          search
          options={categories}
          onChange={handleOnChange}
          clearable
        />
      </Grid.Column>
    </Grid>
  );
};

export default SearchProductsByCategory;
