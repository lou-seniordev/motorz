import React, { Fragment, useContext } from "react";
import { Menu, Dropdown, Input } from "semantic-ui-react";
import { category } from "../../../app/common/options/forumCategoryOptions";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const ForumFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.forumPostStore;

  const handleOnChange = (e: any, data: any) => {
    setPredicate( 'category', data.value)
  };

  const handleResultSelect = (e: any) => {
    if(e.key === 'Enter') {
      setPredicate( 'search', e.target.value)   
      e.target.value = '';
  }
}

  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%" }}>
        {/* <Header icon={"filter"} attached color={"teal"} content={"Filters"} /> */}
        <Menu.Item active={predicate.has("search")}>
          <Input
            icon='search'
            placeholder='Search...'
            onKeyDown={(e: any) => handleResultSelect(e)}
          />
        </Menu.Item>
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          icon={'arrows alternate'}
          content={"All Posts"}
          />  
        <Menu.Item
          active={predicate.has("iAsked")}
          onClick={() => setPredicate("iAsked", "true")}
          color={"blue"}
          name={"iAsked"}
          icon={'question circle outline'}
          content={"I Asked"}
          />
        {/* <Icon name='question circle outline' /> */}
        {/* </Menu.Item> */}
        <Menu.Item
          active={predicate.has("iRated")}
          onClick={() => setPredicate("iRated", "true")}
          color={"blue"}
          name={"iRated"}
          icon={'heart outline'}
          content={"I rated"}
          />
        <Menu.Item
          active={predicate.has("trending")}
          onClick={() => setPredicate("trending", "true")}
          color={"blue"}
          name={"trending"}
          icon={'globe'}
          content={"Trending"}
        />
        <Menu.Item>
          <Dropdown
            placeholder='Choose category'
            selection
            floating
            search
            options={category}
            onChange={handleOnChange}
            clearable
          />
        </Menu.Item>
      </Menu>
    </Fragment>
  );
};

export default observer(ForumFilters);
