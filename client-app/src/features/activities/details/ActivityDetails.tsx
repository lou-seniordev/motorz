import { observer } from "mobx-react-lite";
import React, { 
  // createRef, 
  useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid
  // , Ref, Sticky 
} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />;

  // const contextRef = createRef();
  //!!! what to do with this? //
  if (!activity) return <h2>Not found</h2>;
  // console.log(attendees);
  return (
    <Grid>
      <Grid.Column computer={12} mobile={16}>
        {/* <Ref innerRef={contextRef}>
          <> */}
          <ActivityDetailedHeader activity={activity} />
          <ActivityDetailedInfo activity={activity} />
          <ActivityDetailedChat />
          {/* </>
        </Ref> */}
      </Grid.Column>
      <Grid.Column computer={4} mobile={16}>
        {/* style={{ marginRight: 30, position: "fixed" }} */}
        {/* <Sticky context={contextRef} pushing style={{ overflow:"auto"  }}> */}
          <ActivityDetailedSidebar attendees={activity.attendees} />
        {/* </Sticky> */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);

{
  /* <Sticky style={{ marginRight: 30, position: "fixed" }}>
</Sticky> */
}
