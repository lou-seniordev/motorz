import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../app/stores/rootStore';

import { useHistory } from "react-router";
import ConfirmDeactivate from '../modals/ConfirmDeactivate';

const activityImageStyle = {
  filter: 'brightness(30%)',
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};
const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const host = activity.attendees.filter((h) => h.isHost)[0];

  const rootStore = useContext(RootStoreContext);
  const { attendActivity, cancelAttendance, loading, deactivateActivity } = rootStore.activityStore;

  const { openModal } = rootStore.modalStore;

  let history = useHistory();

  const handleDeactivateActivity = (id: string) => {
    //==yes in needs a modal
    openModal(<ConfirmDeactivate activityId={id}/>);
    // console.log("id", id);
    // deleteActivity(id);
    // history.push('/activities');
  };

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{format(activity.date, 'eeee do MMMM')}</p>
                <p>
                  Hosted by{' '}
                  <Link to={`/profile/${host.username}`}>
                    <strong>{host.displayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {activity.isHost ? (
          <Fragment>

          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            color='orange'
            floated='right'
          >
            Manage Your Diary
          </Button>
          <Button
              onClick={() => {
                
                handleDeactivateActivity(activity.id!);
              }}
              color='red'
              floated='left'
              >
              Deactivate
            </Button>
          </Fragment>
          
        ) : activity.isGoing ? (
          <Button loading={loading} onClick={cancelAttendance}>
            Cancel your place
          </Button>
        ) : (
          <Button loading={loading} onClick={attendActivity} color='teal'>
            Join Us
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ActivityDetailedHeader);
