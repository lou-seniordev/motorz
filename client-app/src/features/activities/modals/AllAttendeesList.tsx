import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  Image,
} from "semantic-ui-react";
import { IAttendee } from "../../../app/models/activity";
// import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  attendees: IAttendee[];
}
const AllAttendeesList: React.FC<IProps> = ({ attendees }) => {
  // const rootStore = useContext(RootStoreContext);

  // const { closeModal } = rootStore.modalStore;

  return (

        <List animated relaxed verticalAlign='middle' >
          {attendees.map((attendee) => (
            <List.Item key={attendee.username} style={{ position: "relative" }}>
       
              
              <Image avatar size='mini' src={attendee.image || "/assets/user.png"} />

              <List.Content verticalAlign='middle'>
                <List.Header as='h4'>
                  <Link to={`/profile/${attendee.username}`}>
                    {attendee.displayName}
                  </Link>
                </List.Header>
                {attendee.following && (
                  <List.Description style={{ color: "green" }}>Following</List.Description>
                )}
              </List.Content>
            </List.Item>
          ))}
        </List>
  );
};


export default observer(AllAttendeesList);
