import { observer } from "mobx-react-lite";
import React, {useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedManager from "./ActivityDetailedManager";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebarRight 
from "./ActivityDetailedSidebarRight";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedSidebarLeft 
from "./ActivityDetailedSidebarLeft";
import { useTranslation } from "react-i18next";


interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivity, activity, loadingInitial} = rootStore.activityStore;

  const { t } = useTranslation(["gallery"]);


  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial || !activity ) return <LoadingComponent content={t('Loading activity...')} />;


  return (
    <Grid>
      <Grid.Column computer={3} mobile={16} className={'mobile hidden'}>
      <ActivityDetailedSidebarLeft attendees={activity!.attendees} />
      </Grid.Column>
      <Grid.Column computer={10} mobile={16}>
 
          <ActivityDetailedHeader activity={activity!} />
          <ActivityDetailedInfo activity={activity!} />
          <ActivityDetailedManager activity={activity!} />
          <ActivityDetailedChat />

      </Grid.Column>
      <Grid.Column computer={3} mobile={16} className={'hideScroll'} >
          <ActivityDetailedSidebarRight activity={activity!} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);

