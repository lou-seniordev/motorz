import React, { useContext, useState } from "react";
import { Menu, Input, Divider, Icon, SegmentGroup } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";


const ActivityFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate } = rootStore.activityStore;

  const [calendarFilter, setCalendarFilter] = useState(false);

  const { t } = useTranslation(["diaries"]);


  const handleResultSelect = (e: any) => {
    if (e.key === "Enter") {
      setPredicate("search", e.target.value);
      e.target.value = "";
    }
  };

  const toggleCalendar = () => {
    setCalendarFilter(!calendarFilter);
  };
  const styles = {
    textAlign: "center",
  };
  return (
    <SegmentGroup raised>
      <Menu vertical size={"large"} style={{ width: "100%" }}>
        {!calendarFilter && (
          <>
            <Menu.Item active={predicate.has("search")}>
              <Input
                icon='search'
                placeholder={t("Search all")}
                onKeyDown={(e: any) => handleResultSelect(e)}
              />
            </Menu.Item>
            <Divider horizontal 
            content={t("or choose from built in filters")}
            />
          </>
        )}
        {!calendarFilter && (
          <Menu.Item
            active={predicate.size === 0}
            onClick={() => setPredicate("all", "true")}
            color={"blue"}
            name={"all"}
            content={t("Active Diaries")}
            style={styles}
          />
        )}
        {!calendarFilter && (
          <Menu.Item
            active={predicate.has("isCompleted")}
            onClick={() => setPredicate("isCompleted", "true")}
            color={"blue"}
            name={"isCompleted"}
            content={t("Completed Diaries")}
            style={styles}
          />
        )}
        {!calendarFilter && (
          <Menu.Item
            active={predicate.has("isHost")}
            onClick={() => setPredicate("isHost", "true")}
            color={"blue"}
            name={"host"}
            content={t("My own")}
            style={styles}
          />
        )}
        {!calendarFilter && (
          <Menu.Item
            active={predicate.has("isGoing")}
            onClick={() => setPredicate("isGoing", "true")}
            color={"blue"}
            name={"username"}
            content={t("Diaries I follow")}
            style={styles}
          />
        )}
        {!calendarFilter && (
          <Menu.Item
            active={predicate.has("iFollow")}
            onClick={() => setPredicate("iFollow", "true")}
            color={"blue"}
            name={"country"}
            content={t("By people I follow")}
            style={styles}
          />
        )}
        <Menu.Item
          active={calendarFilter}
          color={"blue"}
          content={!calendarFilter ? t("Select Diaries After A Date")
          : <span><Icon name="arrow left"/>{ t("Go back to built-in filters")}</span> }
          style={styles}
          onClick={toggleCalendar}
        />
      </Menu>
      {calendarFilter && (
          <Calendar
            onChange={(date) => setPredicate("startDate", date!)}
            value={predicate.get("startDate") || new Date()}
          />
      )}
    </SegmentGroup>
  );
};

export default observer(ActivityFilters);
