import React, { Fragment, useContext } from "react";
import { Menu, Header, Input, Divider } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const ActivityFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;

  const handleResultSelect = (e: any) => {
    if (e.key === "Enter") {
      setPredicate("search", e.target.value);
      e.target.value = "";
    }
  };
  const styles = {
    textAlign: "center",
  };
  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%" }}>
        <Menu.Item active={predicate.has("search")}>
          <Input
            icon='search'
            placeholder='Search all...'
            onKeyDown={(e: any) => handleResultSelect(e)}
          />
        </Menu.Item>
        <Divider horizontal content='or chose built in filters' />

        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          content={"All Activities"}
          style={styles}
        />
        <Menu.Item
          active={predicate.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
          color={"blue"}
          name={"username"}
          content={"I have joined"}
          style={styles}
        />
        <Menu.Item
          active={predicate.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
          color={"blue"}
          name={"host"}
          content={"I own"}
          style={styles}
        />
        <Menu.Item
          active={predicate.has("iFollow")}
          onClick={() => setPredicate("iFollow", "true")}
          color={"blue"}
          name={"country"}
          content={"From people I follow"}
          style={styles}
        />
        {/* <Menu.Item>
          <Header
            icon={"calendar"}
            attached
            color={"teal"}
            content={"Select Diaries After A Date"}
          />
          <Calendar
            onChange={(date) => setPredicate("startDate", date!)}
            value={predicate.get("startDate") || new Date()}
          />
        </Menu.Item> */}
      </Menu>
      <Header
        icon={"calendar"}
        attached
        color={"blue"}
        content={"Select Diaries After A Date"}
      />
      <Calendar
        onChange={(date) => setPredicate("startDate", date!)}
        value={predicate.get("startDate") || new Date()}
      />
    </Fragment>
  );
};

export default observer(ActivityFilters);
