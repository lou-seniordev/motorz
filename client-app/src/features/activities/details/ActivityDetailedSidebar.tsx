import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Segment, List, Item, Label, Image, Sidebar, Menu, Header } from "semantic-ui-react";
import { IAttendee } from "../../../app/models/activity";

interface IProps {
  attendees: IAttendee[];
}
const ActivityDetailedSidebar: React.FC<IProps> = ({ attendees }) => {
  return (
    <Fragment>
    {/* // <Sidebar.Pushable as={Segment}>
    //   <Sidebar
    //   // as={Menu}
    //   // animation='overlay'
    //   // icon='labeled'
    //   // inverted
    //   // vertical
    //   visible
    //   horizontal
    //   // width='thin'
    // > */}

      <Segment
        textAlign='center'
        style={{ border: "none" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {attendees.length} {attendees.length === 1 ? "Person" : "People "} in it
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <Item key={attendee.username} style={{ position: "relative" }}>
              {attendee.isHost && (
                <Label
                  style={{ position: "absolute" }}
                  color='teal'
                  icon='ioxhost'
                  // ribbon='right'
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
      </Segment>
    {/* </Sidebar>
    <Sidebar.Pusher>
      <Segment basic>
        <Header as='h3'>Application Content</Header>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Segment>
    </Sidebar.Pusher>
    </Sidebar.Pushable> */}
     </Fragment>
  );
};

export default observer(ActivityDetailedSidebar);
