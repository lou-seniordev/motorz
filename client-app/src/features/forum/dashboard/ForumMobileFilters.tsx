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
  const { predicate, setPredicate, setInfo } = rootStore.forumPostStore;

  const { openModal } = rootStore.modalStore;

  const handleSearch = () => {
    setPredicate("search", "true");
    openModal(<SearchForum />);
  };
  const handleSearchByCategory = () => {
    setPredicate("category", "true");
    openModal(<SearchForumByCategory />);
  };

  const handleSetInfo = () => {
    switch (predicate.keys().next().value) {
      case "iAsked":
        setInfo("My posts");
        break;
      case "iRated":
        setInfo("Posts I rated");
        break;
      case "trending":
        setInfo("Trending");
        break;
      case "iFollow":
        setInfo("Posts I follow");
        break;
      case "category":
        setInfo("Search by category");
        break;
      case "search":
        setInfo("Search all");
        break;
      default:
        setInfo("All posts");
        break;
    }
  };

  return (
    <>
      <Menu fluid widths={7}>
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => {
            setPredicate("all", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"home"}
        />
        <Menu.Item
          active={predicate.has("iAsked")}
          onClick={() => {
            setPredicate("iAsked", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"user circle"}
        />
        <Menu.Item
          active={predicate.has("iRated")}
          onClick={() => {
            setPredicate("iRated", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"heart outline"}
        />
        <Menu.Item
          active={predicate.has("trending")}
          onClick={() => {
            setPredicate("trending", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"diamond"}
        />
        <Menu.Item
          active={predicate.has("iFollow")}
          onClick={() => {
            setPredicate("iFollow", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"eye"}
        />
        <Menu.Item
          active={predicate.has("category")}
          onClick={() => {
            handleSearchByCategory();
            handleSetInfo();
          }}
          color={"blue"}
          icon={"filter"}
        />
        <Menu.Item
          active={predicate.has("search")}
          onClick={() => {
            handleSearch();
            handleSetInfo();
          }}
          color={"blue"}
          icon={"search"}
        />
      </Menu>
      <ForumMobileInfo />
    </>
  );
};

export default observer(ForumMobileFilters);
