import React, { Fragment, useContext } from "react";
import { Menu, Header, Dropdown, Icon } from "semantic-ui-react";
import { category } from "../../../app/common/options/forumCategoryOptions";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const MechanicFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.forumPostStore;

  const handleOnChange = (e: any, data: any) => {
    // console.log(data.value);
    setPredicate( 'category', data.value)
  };

   {/* <h2>Mechanic around you</h2>
          <h2>Mechanic You went to</h2>
          <h2>Mechanics everbody recommends</h2> */}

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
          content={"All"}
          />  
        <Menu.Item
          active={predicate.has("iAsked")}
          onClick={() => setPredicate("iAsked", "true")}
          color={"blue"}
          name={"iAsked"}
          icon={'info'}
          content={"You visited"}
          />
        {/* <Icon name='question circle outline' /> */}
        {/* </Menu.Item> */}
        <Menu.Item
          active={predicate.has("iRated")}
          onClick={() => setPredicate("iRated", "true")}
          color={"blue"}
          name={"iRated"}
          icon={'home'}
          content={"Close to you"}
          />
        <Menu.Item
          active={predicate.has("trending")}
          onClick={() => setPredicate("trending", "true")}
          color={"blue"}
          name={"trending"}
          icon={'heart'}
          content={"Highest Recommended"}
        />
        <Menu.Item>
          <Dropdown
            placeholder='Choose country'
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

export default observer(MechanicFilters);
