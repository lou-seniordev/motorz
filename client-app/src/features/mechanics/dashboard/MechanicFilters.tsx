import React, { Fragment, useContext, useEffect } from "react";
import { Menu, Dropdown, Input, Divider } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const MechanicFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.mechanicStore;
  const { countries, loadCountriesToSelect } = rootStore.countryStore;

  const handleOnChange = (e: any, data: any) => {
    setPredicate("country", data.value);
  };

  const handleResultSelect = (e: any) => {
    if (e.key === "Enter") {
      setPredicate("search", e.target.value);
      e.target.value = "";
    }
  };
  const { t } = useTranslation(["mechanics"]);

  useEffect(() => {
    loadCountriesToSelect();
  }, [loadCountriesToSelect]);

  const styles = {
    textAlign: "center"
  };

  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%" }}>
        <Menu.Item active={predicate.has("search")}>
          <Input
            icon='search'
            placeholder={t('Search all')}
            onKeyDown={(e: any) => handleResultSelect(e)}
          />
        </Menu.Item>

        <Menu.Item>
          <Dropdown
            placeholder={t('Search by country')}
            selection
            fluid
            search
            options={countries}
            onChange={handleOnChange}
            clearable
          />
        </Menu.Item>
        <Divider horizontal content={t('or choose from built in filters')} />

        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          icon={"arrows alternate"}
          content={t("All")}
          style={ styles }
        />

        <Menu.Item
          active={predicate.has("isCustomer")}
          onClick={() => setPredicate("isCustomer", "true")}
          color={"blue"}
          name={"isCustomer"}
          icon={"info"}
          content={t("My Shops (customer)")}
          style={ styles }
        />

        <Menu.Item
          active={predicate.has("mostRecommended")}
          onClick={() => setPredicate("mostRecommended", "true")}
          color={"blue"}
          name={"mostRecommended"}
          icon={"heart outline"}
          content={t("Most Recommended")}
          style={ styles }
        />

        <Menu.Item
          active={predicate.has("bestRated")}
          onClick={() => setPredicate("bestRated", "true")}
          color={"blue"}
          name={"bestRated"}
          icon={"heart"}
          content={t("Best Rated")}
          style={ styles }
        />

        <Menu.Item
          active={predicate.has("iFollow")}
          onClick={() => setPredicate("iFollow", "true")}
          color={"blue"}
          name={"country"}
          content={t("By people I follow")}
          style={ styles }
          icon={"users"}
        />
      </Menu>
    </Fragment>
  );
};

export default observer(MechanicFilters);
