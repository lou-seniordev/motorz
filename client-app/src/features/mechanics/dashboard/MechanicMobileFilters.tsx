import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import SearchMechanic from "../modals/SearchMechanic";
import SearchMechanicByCountry from "../modals/SearchMechanicByCountry";
import MechanicMobileInfo from "./MechanicMobileInfo";

const MechanicMobileFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate, setInfo } = rootStore.mechanicStore;

  const { openModal } = rootStore.modalStore;

  const handleSearch = () => {
    setPredicate("search", "true");
    openModal(<SearchMechanic />);
  };
  const handleSearchByCountry = () => {
    // setPredicate("all", "true");
    setPredicate("country", "true");
    openModal(<SearchMechanicByCountry />);
  };

  const handleSetInfo = () => {
    switch (predicate.keys().next().value) {
      case "isCustomer":
        setInfo("I am customer");
        break;
      case "mostRecommended":
        setInfo("Most recommended");
        break;
      case "bestRated":
        setInfo("Best rated");
        break;
      case "iFollow":
        setInfo("Mechanics I follow");
        break;
      case "country":
        setInfo("Search by country");
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
      <Menu fluid widths={7} >
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
          active={predicate.has("isCustomer")}
          onClick={() => {
            setPredicate("isCustomer", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"heart outline"}
        />
        <Menu.Item
          active={predicate.has("mostRecommended")}
          onClick={() => {
            setPredicate("mostRecommended", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"chess king"}
        />
        <Menu.Item
          active={predicate.has("bestRated")}
          onClick={() => {
            setPredicate("bestRated", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"winner"}
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
          active={predicate.has("country")}
          onClick={() => {
            handleSearchByCountry();
            handleSetInfo();
          }}
          color={"blue"}
          icon={"globe"}
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
      <MechanicMobileInfo />
    </>
  );
};

export default observer(MechanicMobileFilters);
