import React from "react";
import { NavLink } from "react-router-dom";
import { Grid, Item, Segment } from "semantic-ui-react";
import { IMessage } from "../../../app/models/message";

const MessageThreadListItem: React.FC<{ message: IMessage; messages: IMessage[] }> =
  ({ message, messages }) => {
    //MessageThreadListItem
    const params = {
      pathname: 'messageThread',
      load: messages
    }
    return (
      <Segment.Group>
        {/* style={{ display: "block" }} */}
        {/*  */}
        {/* as={Link} */}
        <Segment>
          {/* <NavLink to='messageThread'> */}
          <NavLink to={params}>
            <Grid>
              <Grid.Column width={3}>
                <Item.Image
                  size='tiny'
                  circular
                  src={message.productPhotoUrl}
                />
                <Item.Description>{message.productTitle}</Item.Description>
              </Grid.Column>

              {/* <Grid.Column width={3}>
            <Item.Image size='tiny' circular src={message.senderPhotoUrl} />
            <Item.Description>{message.senderUsername}</Item.Description>
          </Grid.Column> */}

              <Grid.Column width={10}>
                <Item.Description>Message Id: {message.id}</Item.Description>
                <Item.Description>Sent: {message.dateSent}</Item.Description>
                <Item.Description>
                  {message.senderUsername} wrote: {message.content}
                </Item.Description>
              </Grid.Column>
            </Grid>
          </NavLink>
        </Segment>
      </Segment.Group>
    );
  };

export default MessageThreadListItem;
