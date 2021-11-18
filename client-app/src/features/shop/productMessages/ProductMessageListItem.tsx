import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { IMessage } from "../../../app/models/message";

const ProductMessageListItem: React.FC<{ message: IMessage }> = ({ message }) => {
    console.log("message in list", message)
  return (
    <Segment.Group>
      <Segment>
        <Item.Image size='tiny' circular src={message.senderPhotoUrl} />
        <Label basic content={message.senderUsername} />
      </Segment>
    </Segment.Group>
  );
};

export default observer(ProductMessageListItem);