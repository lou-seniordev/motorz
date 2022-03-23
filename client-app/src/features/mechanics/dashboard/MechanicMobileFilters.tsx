import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import SearchMechanic from "../modals/SearchMechanic";
import SearchMechanicByCountry from "../modals/SearchMechanicByCountry";

const MechanicMobileFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.mechanicStore;

  const { openModal } = rootStore.modalStore;

  const handleSearch = () => {
    openModal(<SearchMechanic />);
  };
  const handleSearchByCountry = () => {
    setPredicate("all", "true");
    openModal(<SearchMechanicByCountry />);
  };

  return (
    <Menu fluid widths={7} style={{ top: "200px" }}>
      <Menu.Item
        active={predicate.size === 0}
        onClick={() => setPredicate("all", "true")}
        color={"blue"}
        icon={"home"}
      />
      <Menu.Item
        active={predicate.has("isCustomer")}
        onClick={() => setPredicate("isCustomer", "true")}
        color={"blue"}
        icon={"users"}
      />
      <Menu.Item
        active={predicate.has("mostRecommended")}
        onClick={() => setPredicate("mostRecommended", "true")}
        color={"blue"}
        icon={"winner"}
      />
      <Menu.Item
        active={predicate.has("bestRated")}
        onClick={() => setPredicate("bestRated", "true")}
        color={"blue"}
        icon={"chess king"}
      />
      <Menu.Item
        active={predicate.has("iFollow")}
        onClick={() => setPredicate("iFollow", "true")}
        color={"blue"}
        icon={"eye"}
      />
      <Menu.Item
        onClick={() => handleSearchByCountry()}
        color={"blue"}
        icon={"tags"}
      />
      <Menu.Item
        onClick={() => handleSearch()}
        color={"blue"}
        icon={"search"}
      />
      Î
    </Menu>
  );
};

export default observer(MechanicMobileFilters);
