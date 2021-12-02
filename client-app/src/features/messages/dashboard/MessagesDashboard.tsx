import React, { useContext, useEffect } from "react"; 
import { Grid } from "semantic-ui-react"; 

import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import MessageThreadList from "./MessageThreadList";

const MessageDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMessages, loadingInitial } = rootStore.messageStore; //

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  if (loadingInitial) return <LoadingComponent content='Loading messages...' />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <MessageThreadList />
      </Grid.Column>
    </Grid>
  );
};

export default observer(MessageDashboard);
