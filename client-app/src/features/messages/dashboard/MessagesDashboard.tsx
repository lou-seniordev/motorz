import React, { useContext, useEffect } from "react"; //, createRef, useState
import { Grid } from "semantic-ui-react"; //Rail,, Sticky

import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import MessageThreadList from "./MessageThreadList";
// import MessageContent from "./MessageContent";

const MessageDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMessages,loadingInitial, 
  } = rootStore.messageStore;// 


  
  useEffect(() => {
    loadMessages();
  }, [loadMessages, 
  ]);

  if (loadingInitial)
    return <LoadingComponent content='Loading messages...' />;

  return (
    <Grid>
      <Grid.Column width={13}>
        <MessageThreadList />
      </Grid.Column>
      <Grid.Column width={3}>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MessageDashboard);
