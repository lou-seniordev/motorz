import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Button,
  // Grid,
  // GridColumn,
} from "semantic-ui-react"; 
import { IActivity } from "../../../app/models/activity";
import { RootStoreContext } from "../../../app/stores/rootStore";

import ConfirmDeactivate from "../modals/ConfirmDeactivate";
import ConfirmDelete from "../modals/ConfirmDelete";
import { useTranslation } from "react-i18next";


const ActivityDetailedManager: React.FC<{ activity: IActivity }> = ({activity}) => {

  const rootStore = useContext(RootStoreContext);
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
  const { addFeedItem } = rootStore.feedStore;

  const [managing, setManaging] = useState(false);

  const { t } = useTranslation(["diaries"]);

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
    addFeedItem(id, "Left Motorcycle Diary");
    setManaging(false);
  };
  const handleAttendActivity = (id: string) => {
    attendActivity();
    addFeedItem(id, "Joined Motorcycle Diary");
    setManaging(false);
  };

  const toggleManaging = () => {
    setManaging(true);
  };
  return (
    <Segment.Group raised>
      {/* {activity.isActive && ( */}
        <Segment clearing attached='bottom'>
          {activity.isHost ? (
            <Fragment>
              {!managing ? (
                <Button onClick={toggleManaging} color='instagram' fluid>
                  {t("Manage your diary")}
                </Button>
              ) : (
                <div className='ui five buttons'>
                 
                      <Button
                        as={Link}
                        to={`/createDiaryEntry/${activity.id}`}
                        color='yellow'
                        basic
                      >
                       {t("New Day")}
                      </Button>
                   
                      <Button
                        as={Link}
                        to={`/manage/${activity.id}`}
                        color='pink'
                        basic
                      >
                        {t("Edit")}
                      </Button>
                  
                      <Button
                        onClick={() => {
                          handleDeleteActivity(activity.id!);
                        }}
                        color='google plus'
                      >
                        {t("Delete")}
                      </Button>

                      <Button
                        onClick={() => {
                          handleCompleteActivity(activity.id!);
                        }}
                        color='vk'
                      >
                        {t("Complete")}
                      </Button>
  
                      <Button
                        onClick={() => {
                          setManaging(false);
                        }}
                      >
                        {t("Cancel")}
                      </Button>
                   
                </div>
              )}
            </Fragment>
          ) : activity.isGoing 
          ? (
            <Button
              loading={loading}
              onClick={() => handleCancelAttendance(activity.id)}
            >
              {t("Stop following this diary")}
            </Button>
          ) : (
            <Button
              loading={loading}
              onClick={() => handleAttendActivity(activity.id)}
              color='teal'
            >
              {t("Become a part of it")}
            </Button>
          )}
        </Segment>
      {/* )} */}
    </Segment.Group>
  );
};

export default observer(ActivityDetailedManager);
