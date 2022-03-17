import React, {  useContext, useEffect, useState } from "react";
import { Input, Segment } from "semantic-ui-react"; //, Segment
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IPrivateMessage } from "../../app/models/privatemessages";


const PrivateMessageThreadListItem = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;


  const { setRecipient, setMessageThreadId, 
    last, setUsername,
    createHubConnection, stopHubConnection,
     setReply, addReply } =
    rootStore.privateMessageStore;

  const userStyles = {
    fontWeight: "bold",
    borderRadius: "50px",
    color: "rgb(29, 115, 152)",
    width: "80%",
    // height: "fit-content",
    height: "50px",
    // display: "inline-flex",
    backgroundColor: "white",
    // display: "flex",
    // // flexWrap: "wrap",
    // justifyContent: "flex-end",
  };
  const senderStyles = {
    fontWeight: "normal",
    borderRadius: "50px",
    border: "solid 1px",
    color: "black",
    width: "80%",
    // height: "fit-content",
    height: "50px",

    // display: "inline-flex",
    backgroundColor: "inherit",
  };

  const [input, setInput] = useState(""); // '' is the initial state value

  const handleSendReply = (e: any) => {
    if (e.key === "Enter") {
      e.target.value = "";

      handleSetRecipient();
      setMessageThreadId(last![0]);
      setReply(input)
      setUsername(user?.userName!);
      addReply();

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
    <Segment className="sideScroll">
      {/* style={{height: '100vh '}} */}

      {last![1].slice().reverse().map((message: IPrivateMessage) => (//slice().
        <Segment
          key={message.id}
          floated={user!.userName === message.senderUsername ? "right" : "left"}
          style={
            user!.userName === message.senderUsername
              ? userStyles
              : senderStyles
          }
        >
         
            from {message.senderUsername === user?.userName
              ? "Me"
              : message.senderDisplayName}{': '}{message.content}
        </Segment>
      ))}
      <Input
        value={input}
        placeholder='Reply'
        onInput={(e: any) => setInput(e.target.value)}
        onKeyDown={(e: any) => handleSendReply(e)}
        style={{ width: "100%", borderRadius: "40px" }}
      />
    </Segment>
  );
};

export default observer(PrivateMessageThreadListItem);