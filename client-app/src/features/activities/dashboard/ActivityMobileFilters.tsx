import { observer } from "mobx-react-lite";
import React, {  useContext } from "react"; 
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import SearchDiaries from "../modals/SearchDiaries";
import ActivityMobileInfo from "./ActivityMobileInfo";


const ActivityMobileFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;

  const { openModal } = rootStore.modalStore;

const handleSearch = () => {
  setPredicate('calendar', 'true');
  openModal(<SearchDiaries />)
}

  return (
    <>
    <Menu fluid widths={5} style={{top: '200px'}}>
      <Menu.Item
        active={predicate.size === 0}
        onClick={() => setPredicate("all", "true")}
        color={"blue"}
        icon={"home"}
      />
      <Menu.Item
        active={predicate.has("isCompleted")}
        onClick={() => setPredicate("isCompleted", "true")}
        color={"blue"}        
        icon={"history"}
      />
      <Menu.Item
        active={predicate.has("isGoing")}
        onClick={() => setPredicate("isGoing", "true")}
        color={"blue"}
        icon={"at"}
       
      />
      <Menu.Item
        active={predicate.has("isHost")}
        onClick={() => setPredicate("isHost", "true")}
        color={"blue"}
        icon={"heartbeat"}
      />
      <Menu.Item
        active={predicate.has("calendar")}
        onClick={() => handleSearch()}
        color={"blue"}
        icon={"search"}
      />
      {/* <Menu.Item style={{textAlign:"left"}}>
        <DatePicker
          onChange={(date) => setPredicate("startDate", date!)}
          withPortal
        />
      </Menu.Item> */}
    </Menu>
    <ActivityMobileInfo/>
    </>

  );
};

export default observer(ActivityMobileFilters);
