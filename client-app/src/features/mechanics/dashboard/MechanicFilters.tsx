import React, { Fragment, useContext, useEffect } from "react";
import { Menu, Header, Dropdown } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const MechanicFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.mechanicStore;
  const { countries, loadCountriesToSelect } = rootStore.countryStore;

  const handleOnChange = (e: any, data: any) => {
    // console.log( 'eki', data);
    setPredicate( 'country', data.value)
  };

  useEffect(() => {
    loadCountriesToSelect();
  }, [loadCountriesToSelect])

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
          active={predicate.has("isCustomer")}
          onClick={() => setPredicate("isCustomer", "true")}
          color={"blue"}
          name={"isCustomer"}
          icon={'info'}
          content={"I am a customer"}
          />
   
        {/* <Menu.Item
          active={predicate.has("iRated")}
          onClick={() => setPredicate("iRated", "true")}
          color={"blue"}
          name={"iRated"}
          icon={'home'}
          content={"Close to you"}
          /> */}
        <Menu.Item
          active={predicate.has("mostRecommended")}
          onClick={() => setPredicate("mostRecommended", "true")}
          color={"blue"}
          name={"mostRecommended"}
          icon={'heart outline'}
          content={"Most Recommended"}
        />
        <Menu.Item
          active={predicate.has("bestRated")}
          onClick={() => setPredicate("bestRated", "true")}
          color={"blue"}
          name={"bestRated"}
          icon={'heart'}
          content={"Best Rated"}
        />
        <Menu.Item>
          <Dropdown
            placeholder='Choose country'
            selection
            floating
            search
            options={countries}
            onChange={handleOnChange}
            clearable
          />
        </Menu.Item>
      </Menu>
    </Fragment>
  );
};

export default observer(MechanicFilters);
