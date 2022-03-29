import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Segment,
  Image,
  Grid,
  GridColumn,
  GridRow,
  TextArea,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IPrivateMessage } from "../../app/models/privatemessages";

const PrivateMessageThreadListItem = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  // let formattedUser: any = user;

  const {
    setRecipient,
    setMessageThreadId,
    last,
    setUsername,
    createHubConnection,
    stopHubConnection,
    setReply,
    addReply,
  } = rootStore.privateMessageStore;

  const userStyles = {
    fontWeight: "normal",
    borderRadius: "20px",
    border: "solid 1px",
    color: "rgb(29, 115, 152)",
    width: "97%",
    marginTop: "20px",
    backgroundColor: "lightblue",
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: "1rem",
  };
  const senderStyles = {
    fontWeight: "normal",
    borderRadius: "20px",
    border: "solid 1px",
    color: "black",
    width: "97%",
    marginTop: "20px",
    backgroundColor: "inherit",
  };

  const [input, setInput] = useState("");

  const handleSendReply = (e: any) => {
    if (e.key === "Enter") {
      e.target.value = "";
      console.log(e);
      if (input === "") {
        console.log("need to validate");
      } else {
        setInput("");
        handleSetRecipient();
        setMessageThreadId(last![0]);
        setReply(input);
        setUsername(user?.userName!);
        addReply();
      }
    }
  };

  const handleSetRecipient = () => {
    if (last![1][0].senderUsername === user?.userName) {
      setRecipient(last![1][0].recipientUsername!, user?.image);
    } else {
      setRecipient(last![1][0].senderUsername!, user?.image);
    }
  };

  useEffect(() => {
    createHubConnection(last![0]);
    return () => {
      stopHubConnection(last![0]);
    };
  }, [createHubConnection, stopHubConnection, last]);

  return (
    <>
      <Segment
        className='scrollRevert'
        style={{ height: "70vh", width: "100%" }}
      >
        {last![1].map((message: IPrivateMessage) => (
          <Fragment key={message.id}>
            {message.senderUsername !== user?.userName && (
              <Grid
                key={message.id}
                style={senderStyles}
                textAlign='left'
                floated='left'
              >
                <GridRow className='mobile hidden'>
                  <GridColumn width={2}>
                    <Image
                      size='mini'
                      circular
                      verticalAlign='middle'
                      src={message.senderPhotoUrl || "/assets/user.png"}
                    />
                  </GridColumn>

                  <GridColumn width={14}>{message.content}</GridColumn>
                </GridRow>
                <GridRow only={"mobile"} style={{fontSize: "smaller", paddingTop: '.3rem', paddingBottom: '.3rem'}}>
                  <GridColumn width={14}>{message.content}</GridColumn>
                </GridRow>
              </Grid>
            )}
            {message.senderUsername === user?.userName && (
              <div>
                <Grid style={userStyles} textAlign='right' floated='right'>
                  <GridRow className='mobile hidden'>
                    <GridColumn width={14}>{message.content}</GridColumn>
                    <GridColumn width={2}>
                      <Image
                        size='mini'
                        circular
                        verticalAlign='middle'
                        src={message.senderPhotoUrl || "/assets/user.png"}
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow only={"mobile"} style={{fontSize: "smaller", paddingTop: '.3rem', paddingBottom: '.3rem'}}>
                    <GridColumn width={14}>{message.content}</GridColumn>
                  </GridRow>
                </Grid>
              </div>
            )}
          </Fragment>
        ))}
      </Segment>
      <TextArea
        autoFocus
        value={input}
        placeholder='Reply'
        onInput={(e: any) => setInput(e.target.value)}
        onKeyDown={(e: any) => handleSendReply(e)}
        style={{ width: "100%", borderRadius: "10px", border: 'none' }}
      />
    </>
  );
};

export default observer(PrivateMessageThreadListItem);
