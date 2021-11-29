import React from "react";
import { Grid, Item, Segment } from "semantic-ui-react";
import { IMessage } from "../../../app/models/message";

const MessageListItem: React.FC<{ message: IMessage }> = ({ message }) => {

  return (
    <Segment.Group>
      <Segment>
        <Grid>
          <Grid.Column width={3}>
            <Item.Image size='tiny' circular src={message.senderPhotoUrl} />
            <Item.Description>{message.senderUsername}</Item.Description>
            {/* <Label basic content={message.senderUsername} /> */}
          </Grid.Column>
       
          <Grid.Column width={12}>
            <Item.Description>Sent: {message.dateSent}</Item.Description>
            <Item.Description>Content: {message.content}</Item.Description>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default MessageListItem;
