import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import SearchDiaries from "../modals/SearchDiaries";
import ActivityMobileInfo from "./ActivityMobileInfo";

import { useTranslation } from "react-i18next";

const ActivityMobileFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate, setInfo } = rootStore.activityStore;

  const { openModal } = rootStore.modalStore;

  const { t } = useTranslation(["mobile-info"]);

  const handleSearch = () => {
    setPredicate("calendar", "true");
    openModal(<SearchDiaries />);
  };

  useEffect(()=>{
    setInfo(t('Active diaries'))

  },[setInfo])

  const handleSetInfo = () => {
    switch (predicate.keys().next().value) {
      case "isCompleted":
        setInfo(t("Completed diaries"));
        break;
      case "isGoing":
        setInfo(t("Diaries I Follow"));
        break;
      case "isHost":
        setInfo(t("My diaries"));
        break;
      case "calendar":
        setInfo(t("Search diaries"));
        break;
      default:
        setInfo(t("Active diaries"));
        break;
    }
  };


  return (
    <>
      <Menu fluid widths={5} style={{ top: "200px" }}>
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
          active={predicate.has("isCompleted")}
          onClick={() => {
            setPredicate("isCompleted", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"hourglass end"}
        />
        <Menu.Item
          active={predicate.has("isGoing")}
          onClick={() => {
            setPredicate("isGoing", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"eye"}
        />
        <Menu.Item
          active={predicate.has("isHost")}
          onClick={() => {
            setPredicate("isHost", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"user circle"}
        />
        <Menu.Item
          active={predicate.has("calendar")}
          onClick={() => {
            handleSearch();
            handleSetInfo();
          }}
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
      <ActivityMobileInfo />
    </>
  );
};

export default observer(ActivityMobileFilters);
