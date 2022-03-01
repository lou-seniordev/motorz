import React, { Fragment, useContext } from "react";
import { Menu, Dropdown, Input, Divider } from "semantic-ui-react";
import { category } from "../../../app/common/options/forumCategoryOptions";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const ForumFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.forumPostStore;

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
            placeholder='Search all...'
            onKeyDown={(e: any) => handleResultSelect(e)}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            placeholder='Search by category'
            selection
            fluid
            search
            options={category}
            onChange={handleOnChange}
            clearable
          />
        </Menu.Item>
        <Divider horizontal content='or chose built in filters' />

        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          icon={"arrows alternate"}
          content={"All Posts"}
          style={ styles }
        />
        <Menu.Item
          active={predicate.has("iAsked")}
          onClick={() => setPredicate("iAsked", "true")}
          color={"blue"}
          name={"iAsked"}
          icon={"question circle outline"}
          content={"I Asked"}
          style={ styles }
        />
        <Menu.Item
          active={predicate.has("iRated")}
          onClick={() => setPredicate("iRated", "true")}
          color={"blue"}
          name={"iRated"}
          icon={"heart outline"}
          content={"I rated"}
          style={ styles }
        />
        <Menu.Item
          active={predicate.has("trending")}
          onClick={() => setPredicate("trending", "true")}
          color={"blue"}
          name={"trending"}
          icon={"globe"}
          content={"Trending"}
          style={ styles }
        />
        <Menu.Item
          active={predicate.has("iFollow")}
          onClick={() => setPredicate("iFollow", "true")}
          color={"blue"}
          name={"country"}
          icon={"users"}
          content={"From people I follow"}
          style={ styles }
        />
      </Menu>
    </Fragment>
  );
};

export default observer(ForumFilters);
