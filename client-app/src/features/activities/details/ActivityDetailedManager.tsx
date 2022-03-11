import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  // Item, Header,
  Button,
  Grid,
  GridColumn,
} from "semantic-ui-react"; //, Image
import { IActivity } from "../../../app/models/activity";
// import { format } from "date-fns";
import { RootStoreContext } from "../../../app/stores/rootStore";

import ConfirmDeactivate from "../modals/ConfirmDeactivate";
import ConfirmDelete from "../modals/ConfirmDelete";

// const activityImageStyle = {
//   filter: "brightness(70%)",
// };

// const activityImageTextStyle = {
//   position: "absolute",
//   bottom: "5%",
//   left: "5%",
//   width: "100%",
//   height: "auto",
//   color: "white",
// };
const ActivityDetailedManager: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  // const host = activity.attendees.filter((h) => h.isHost)[0];

  const rootStore = useContext(RootStoreContext);
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
  const { removeFeedItem, addFeedItem } = rootStore.feedStore;

  const [managing, setManaging] = useState(false);

  const { openModal } = rootStore.modalStore;

  const handleCompleteActivity = (id: string) => {
    openModal(<ConfirmDeactivate activityId={id} />);
    setManaging(false);
  };
  const handleDeleteActivity = (id: string) => {
    openModal(<ConfirmDelete activityId={id} />);
    setManaging(false);
  };
  const handleCancelAttendance = (id: string) => {
    cancelAttendance();
    removeFeedItem(id, "Joined Motocycle Diary");
    addFeedItem(id, "Left Motorcycle Diary");
    setManaging(false);
  };
  const handleAttendActivity = (id: string) => {
    attendActivity();
    addFeedItem(id, "Joined Motocycle Diary");
    setManaging(false);
  };

  const toggleManaging = () => {
    setManaging(true);
  };
  return (
    <Segment.Group raised>
      {activity.isActive && (
        <Segment clearing attached='bottom'>
          {activity.isHost ? (
            <Fragment>
              {!managing ? (
                <Button onClick={toggleManaging} color='instagram' fluid>
                  Manage your diary
                </Button>
              ) : (
                <Fragment>
                  <Grid>
                    <GridColumn width={4}>
                      <Button
                        as={Link}
                        to={`/createDiaryEntry/${activity.id}`}
                        color='teal'
                        // floated='right'
                        fluid
                      >
                        New Day
                      </Button>
                    </GridColumn>
                    {/* </Grid>
                  <Grid> */}
                    <GridColumn width={3}>
                      <Button
                        as={Link}
                        to={`/manage/${activity.id}`}
                        color='teal'
                        fluid
                        // fluid
                      >
                        Edit
                      </Button>
                    </GridColumn>
                    {/* </Grid>
                  <Grid> */}
                    <GridColumn width={3}>
                      <Button
                        onClick={() => {
                          handleCompleteActivity(activity.id!);
                        }}
                        color='vk'
                        // floated='left'
                        fluid
                      >
                        Complete
                      </Button>
                    </GridColumn>
                    {/* </Grid>
                  <Grid> */}
                    <GridColumn width={3}>
                      <Button
                        onClick={() => {
                          handleDeleteActivity(activity.id!);
                        }}
                        color='google plus'
                        // floated='left'
                        fluid
                      >
                        Delete
                      </Button>
                    </GridColumn>
                    {/* </Grid>
                  <Grid> */}
                    <GridColumn width={3}>
                      <Button
                        onClick={() => {
                          setManaging(false);
                        }}
                        color='grey'
                        // floated='right'
                        fluid
                      >
                        Cancel
                      </Button>
                    </GridColumn>
                  </Grid>
                </Fragment>
              )}
            </Fragment>
          ) : activity.isGoing ? (
            <Button
              loading={loading}
              // onClick={cancelAttendance}>
              onClick={() => handleCancelAttendance(activity.id)}
            >
              Stop following this diary
            </Button>
          ) : (
            // onClick={attendActivity}
            <Button
              loading={loading}
              onClick={() => handleAttendActivity(activity.id)}
              color='teal'
            >
              Become a part of it
            </Button>
          )}
        </Segment>
      )}
    </Segment.Group>
  );
};

export default observer(ActivityDetailedManager);
