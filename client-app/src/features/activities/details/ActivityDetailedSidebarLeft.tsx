import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  List,
  Item,
  Label,
  Image,
  SegmentGroup,
} from "semantic-ui-react";
import { IAttendee } from "../../../app/models/activity";
import { RootStoreContext } from "../../../app/stores/rootStore";
import AllAttendeesList from "../modals/AllAttendeesList";

interface IProps {
  attendees: IAttendee[];
}
const ActivityDetailedSidebarLeft: React.FC<IProps> = ({ attendees }) => {
  const rootStore = useContext(RootStoreContext);

  const { openModal, setSize } = rootStore.modalStore;

  const handleShowAll = () => {
    setSize('mini')
    openModal(<AllAttendeesList attendees={attendees}/>)
  }
  return (
    <SegmentGroup raised>
      <Segment
        textAlign='center'
        style={{ border: "none" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees.length} {attendees.length === 1 ? "Person" : "People "}{" "}
        following
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.slice(0, 10).map((attendee) => (
            <Item key={attendee.username} style={{ position: "relative" }}>
              {attendee.isHost && (
                <Label
                  style={{ position: "absolute" }}
                  color='teal'
                  corner='right'
                >
                  Host
                </Label>
              )}
              
              <Image size='mini' src={attendee.image || "/assets/user.png"} />

              <Item.Content verticalAlign='middle'>
                <Item.Header as='h4'>
                  <Link to={`/profile/${attendee.username}`}>
                    {attendee.displayName}
                  </Link>
                </Item.Header>
                {attendee.following && (
                  <Item.Extra style={{ color: "green" }}>Following</Item.Extra>
                )}
              </Item.Content>
            </Item>
          ))}
        </List>
        {attendees.length > 10 && 
        <span style={{cursor: 'pointer'}} onClick={handleShowAll}>and {attendees.length - 10} more</span>
        }
      </Segment>
    </SegmentGroup>
  );
};

export default observer(ActivityDetailedSidebarLeft);
