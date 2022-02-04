import React, { Fragment, useContext } from "react";
import { Menu, Header, Dropdown, Icon } from "semantic-ui-react";
import { category } from "../../../app/common/options/forumCategoryOptions";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const ForumFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.forumPostStore;

  const handleOnChange = (e: any, data: any) => {
    // console.log(data.value);
    setPredicate( 'category', data.value)
  };

  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%" }}>
        <Header icon={"filter"} attached color={"teal"} content={"Filters"} />
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
          name={"username"}
          icon={'question circle outline'}
          content={"I Asked"}
          />
        {/* <Icon name='question circle outline' /> */}
        {/* </Menu.Item> */}
        <Menu.Item
          active={predicate.has("iRated")}
          onClick={() => setPredicate("iRated", "true")}
          color={"blue"}
          name={"host"}
          icon={'heart outline'}
          content={"I rated"}
          />
        <Menu.Item
          active={predicate.has("trending")}
          onClick={() => setPredicate("trending", "true")}
          color={"blue"}
          name={"host"}
          icon={'globe'}
          content={"Trending"}
        />
        <Menu.Item>
          <Dropdown
            placeholder='Choose category'
            // icon={'angle double right'}
            selection
            floating
            search
            options={category}
            onChange={handleOnChange}
          />
        </Menu.Item>
      </Menu>
    </Fragment>
  );
};

export default observer(ForumFilters);
