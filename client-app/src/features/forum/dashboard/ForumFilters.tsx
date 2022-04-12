import React, { Fragment, useContext } from "react";
import { Menu, Dropdown, Input, Divider } from "semantic-ui-react";
import { category } from "../../../app/common/options/forumCategoryOptions";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

const ForumFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.forumPostStore;

  const { t } = useTranslation(["forum"]);


  const handleOnChange = (e: any, data: any) => {
    setPredicate("category", data.value);
  };

  const handleResultSelect = (e: any) => {
    if (e.key === "Enter") {
      setPredicate("search", e.target.value);
      e.target.value = "";
    }
  };
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
            placeholder={t('Filter by category')}
            selection
            fluid
            search
            options={category}
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
          content={t("All Posts")}
          style={ styles }
        />
        <Menu.Item
          active={predicate.has("iAsked")}
          onClick={() => setPredicate("iAsked", "true")}
          color={"blue"}
          name={"iAsked"}
          icon={"question circle outline"}
          content={t("I Asked")}
          style={ styles }
        />
        <Menu.Item
          active={predicate.has("iRated")}
          onClick={() => setPredicate("iRated", "true")}
          color={"blue"}
          name={"iRated"}
          icon={"heart outline"}
          content={t("I rated")}
          style={ styles }
        />
        <Menu.Item
          active={predicate.has("trending")}
          onClick={() => setPredicate("trending", "true")}
          color={"blue"}
          name={"trending"}
          icon={"globe"}
          content={t("Trending")}
          style={ styles }
        />
        <Menu.Item
          active={predicate.has("iFollow")}
          onClick={() => setPredicate("iFollow", "true")}
          color={"blue"}
          name={"country"}
          icon={"users"}
          content={t("By people I follow")}
          style={ styles }
        />
      </Menu>
    </Fragment>
  );
};

export default observer(ForumFilters);
