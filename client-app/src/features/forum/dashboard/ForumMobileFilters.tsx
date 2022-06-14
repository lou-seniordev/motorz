// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import SearchForum from "../modals/SearchForum";
import SearchForumByCategory from "../modals/SearchForumByCategory";
import ForumMobileInfo from "./ForumMobileInfo";

const ForumMobileFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.forumPostStore;

  const { openModal } = rootStore.modalStore;

  const handleSearch = () => {
    setPredicate("search", "true");
    openModal(<SearchForum />);
  };
  const handleSearchByCategory = () => {
    setPredicate("category", "true");
    openModal(<SearchForumByCategory />);
  };

  return (
    <>
      <Menu fluid widths={7}>
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          icon={"home"}
        />
        <Menu.Item
          active={predicate.has("iAsked")}
          onClick={() => setPredicate("iAsked", "true")}
          color={"blue"}
          icon={"question circle outline"}
        />
        <Menu.Item
          active={predicate.has("iRated")}
          onClick={() => setPredicate("iRated", "true")}
          color={"blue"}
          icon={"heart outline"}
        />
        <Menu.Item
          active={predicate.has("trending")}
          onClick={() => setPredicate("trending", "true")}
          color={"blue"}
          icon={"globe"}
        />
        <Menu.Item
          active={predicate.has("iFollow")}
          onClick={() => setPredicate("iFollow", "true")}
          color={"blue"}
          icon={"users"}
        />
        <Menu.Item
          active={predicate.has("category")}
          onClick={() => handleSearchByCategory()}
          color={"blue"}
          icon={"tags"}
        />
        <Menu.Item
          active={predicate.has("search")}
          onClick={() => handleSearch()}
          color={"blue"}
          icon={"search"}
        />
      </Menu>
      <ForumMobileInfo />
    </>
  );
};

export default observer(ForumMobileFilters);
