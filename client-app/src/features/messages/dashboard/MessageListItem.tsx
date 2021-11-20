import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { IMessage } from "../../../app/models/message";

const MessageListItem: React.FC<{ message: IMessage }> = ({ message }) => {
  console.log("message in list", message.content)

  return (
    <Segment.Group>
      <Segment>
        <Item.Image size='tiny' circular src={message.senderPhotoUrl} />
        <Label basic content={message.senderUsername} />
      </Segment>
    </Segment.Group>
  );
};

export default MessageListItem;
{
  /* <Item>
  <Item.Group>
    <Label basic content={message.id} />
    <Item>
      <Item.Content>
        <Item.Header as='a'>{message.senderId}</Item.Header>
        <Item.Description>{message.content}</Item.Description>
      </Item.Content>
    </Item>
  </Item.Group>
</Item>
</Segment>
<Segment>
<Icon name='clock outline' /> {message.dateRead}
</Segment>
<Segment clearing>
<span>
  <Icon name='sitemap' /> {message.recipientUsername}
</span>
</Segment>
<Segment clearing>
<Icon name='envelope outline' /> {message.id}, {message.senderUsername}, 
{message.content}
  <Button
    onClick={() => selectmessage(message.id)}
    as={Link}
    to={`/messages/${message.id}`}
    floated='right'
    content='View'
    color='blue'
  ></Button> */
}
