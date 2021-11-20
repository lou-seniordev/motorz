import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Icon, Item, Label, Segment } from "semantic-ui-react";
import { IMessage } from "../../../app/models/message";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ProductMessageListItem: React.FC<{ message: IMessage }> = ({
  message,
}) => {
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

export default observer(ProductMessageListItem);
