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
    // loadLastMessage 
  } = rootStore.messageStore;// 

  // const [activeTab, setActiveTab]= useState(1)

  
  useEffect(() => {
    loadMessages();
    // loadLastMessage();
  }, [loadMessages, 
    // loadLastMessage
  ]);

  if (loadingInitial)
    return <LoadingComponent content='Loading messages...' />;

  return (
    <Grid>
      <Grid.Column width={13}>
        <MessageThreadList />
      </Grid.Column>
      <Grid.Column width={3}>
        {/* <Sticky style={{ marginRight: 30, position: "fixed" }}> */}
          {/* <MessageContent setActiveTab={setActiveTab}/> */}
        {/* </Sticky> */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(MessageDashboard);
