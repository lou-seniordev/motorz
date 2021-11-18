import React, { useContext, useEffect, useState } from "react"; //, createRef
import { Grid, Sticky } from "semantic-ui-react"; //Rail,

import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import MessageList from "./MessageList";
import MessageContent from "./MessageContent";

const MessageDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMessages,loadingInitial } = rootStore.messageStore;// 

  const [activeTab, setActiveTab]= useState(1)

  
  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  if (loadingInitial)
    return <LoadingComponent content='Loading messages...' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <MessageList />
      </Grid.Column>
      <Grid.Column width={6}>
        {/* <Sticky style={{ marginRight: 30, position: "fixed" }}> */}
          <MessageContent setActiveTab={setActiveTab}/>
        {/* </Sticky> */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(MessageDashboard);
