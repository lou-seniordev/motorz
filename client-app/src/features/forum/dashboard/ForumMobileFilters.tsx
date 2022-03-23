// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react"; 
import { category } from "../../../app/common/options/forumCategoryOptions";
import { Dropdown, Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import SearchForum from "../modals/SearchForum";
import SearchForumByCategory from "../modals/SearchForumByCategory";

const ForumMobileFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.forumPostStore;

  const { openModal } = rootStore.modalStore;

  const handleOnChange = (e: any, data: any) => {
    setPredicate("category", data.value);
  };

  const handleSearch = () => {
    openModal(<SearchForum />);
  };
  const handleSearchByCategory = () => {
    openModal(<SearchForumByCategory />);
  };

  return (
    <Menu fluid widths={7}>
      <Menu.Item
        active={predicate.size === 0}
        onClick={() => setPredicate("all", "true")}
        color={"blue"}
        icon={"home"}
      />
       {/* <Dropdown
            icon={"tags"}
            selection
            fluid
            search
            options={category}
            onChange={handleOnChange}
            clearable
          /> */}
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
        onClick={() => handleSearchByCategory()}
        color={"blue"}
        icon={"tags"}
      />
      <Menu.Item
        onClick={() => handleSearch()}
        color={"blue"}
        icon={"search"}
      />
     
       {/* <Menu.Item> */}
         
        {/* </Menu.Item> */}
    </Menu>
  );
};

export default observer(ForumMobileFilters);
