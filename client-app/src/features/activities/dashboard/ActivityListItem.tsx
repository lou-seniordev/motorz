import React
// , { useContext } 
from "react";
import { Link } from "react-router-dom";
import { Accordion, Button, Item,  Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendees from "./ActivityListItemAttendees";
// import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  // const rootStore = useContext(RootStoreContext);
  // const { user } = rootStore.userStore;

  // const namedMessage =
  //   user?.displayName + ", you are taking part in this diary";
  // const userMessage = user?.displayName + ", you created this diary";

  const host = activity.attendees.filter((h) => h.isHost)[0];

  const panels = [
    {
      key: "when",
      title: "When does it start?",
      content: ["On " + format(activity.date, "MMMM d yyyy h:mm:a")].join(" "),
    },
    {
      key: "starting_point",
      title: "Where is a starting Point?",
      content: ["In " + activity.city + ", " + activity.departure].join(" "),
    },
    {
      key: "destination",
      title: "What is the destination?",
      content: [activity.destination],
    },
  ];

  const descriptionUiShort = activity.description.substring(0, 60);
  const seeMore = "...see more";

  return (
    <Segment.Group raised>
      <Segment>
        <Item.Group>
          <Item>
            {/* <Item.Content> */}
              {/* <Item.Description>
                {activity.isHost && (
                  <Label
                    // pointing='below'
                    basic
                    color='teal'
                    content={userMessage}
                  />
                )}
                {activity.isGoing && !activity.isHost && (
                  <Label
                    // pointing='below'
                    basic
                    color='green'
                    content={namedMessage}
                    //
                  />
                )}
              </Item.Description> */}
              <Item.Image
                size='tiny'
                circular
                src={host.image || "/assets/user.png"}
                style={{ marginBottom: 3 }}
              />
            {/* </Item.Content> */}
            <Item.Content
              verticalAlign='middle'
              style={{ textAlign: "center" }}
            >
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                <h2>{activity.title}</h2>
              </Item.Header>
              <Item.Meta>
                by{" "}
                <Link to={`/profile/${host.username}`}>
                  {" "}
                  {host.displayName}
                </Link>
              </Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        {/* <Icon name='clock' /> {format(activity.date, 'h:mm:a')}
        <Icon name='marker' /> Starting Point: {activity.venue}, {activity.city}
        <Icon name='marker' /> Destination: {activity.destination}  */}

        <Accordion fluid panels={panels} styled exclusive={false} />
      </Segment>
      <Segment clearing>
        <Item.Group>
          <Item.Description as={Link} to={`/activities/${activity.id}`}>
            <span>{descriptionUiShort}</span> <span>{seeMore}</span>
          </Item.Description>
        </Item.Group>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees attendees={activity.attendees} />
      </Segment>
      <Segment secondary>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          // floated='right'
          content='Check This Diary'
          color='blue'
          fluid
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
