// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react"; //, useState
// Input,
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ActivityMobileMenu = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    predicate,
    setPredicate,
  } = rootStore.activityStore;
  
  return (
    <Menu>
      <Menu.Item
        active={predicate.size === 0}
        onClick={() => setPredicate("all", "true")}
        color={"blue"}
        name={"all"}
        content={"All "}
      />
      <Menu.Item
        active={predicate.has("isGoing")}
        onClick={() => setPredicate("isGoing", "true")}
        color={"blue"}
        name={"username"}
        content={"I joined"}
      />
      <Menu.Item
        active={predicate.has("isHost")}
        onClick={() => setPredicate("isHost", "true")}
        color={"blue"}
        name={"host"}
        content={"I'm organizing"}
      />
      <Menu.Item>
        <DatePicker
          // selected={startDate}
          placeholderText="After Date"
          // onChange={(date) => setStartDate(date)}
          onChange={(date) => setPredicate('startDate', date!)}
          // wrapperClassName="datePicker prudence"
          withPortal
        />
      </Menu.Item>
      {/* <Menu.Item
        active={predicate.has("calendar")}
        onClick={() => setPredicate("isHost", "true")}
        color={"blue"}
        name={"calendar"}
        content={"Calendar"}
      /> */}
    </Menu>
  );
};

export default observer(ActivityMobileMenu);
