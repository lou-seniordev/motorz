import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Item } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityListItem from "./ActivityListItem";

const ActivityList = () => {
  const rootStore = useContext(RootStoreContext);
  const { activitiesByDate } = rootStore.activityStore;
  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Item.Group divided>
            {activities.map((activity) => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);
