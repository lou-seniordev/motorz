import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Grid, Item, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import MessageListItem from './MessageListItem';

const MessageList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { messagesByDate } = rootStore.messageStore;
  console.log("message in list", messagesByDate)


  return (
      // <Grid width={8}>

    <Segment clearing>
      <Item.Group divided>
        {messagesByDate.map((message) => (
          <MessageListItem message={message} key={message.id} />
        ))}
      </Item.Group>
    </Segment>
      // </Grid>
  );
};

export default observer(MessageList);