import React, { useContext, useState } from "react";
import {
  //   Segment,
  //   Image,
  //   Grid,
  //   GridColumn,
  //   GridRow,
  TextArea,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
// import { IPrivateMessage } from "../../app/models/privatemessages";
// import { toJS } from "mobx";

const PrivateMessageReply = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  // let formattedUser: any = user;

  const {
    setRecipient,
    setMessageThreadId,
    listOfMessagesInFocus,
    // markReadInDB,
    setUsername,
    // createHubConnection,
    // stopHubConnection,
    setReply,
    addReply,
    // unreadPrivateMessages
  } = rootStore.privateMessageStore;

  const tAreatyles = {
    width: "100%",
    borderRadius: "10px",
    border: "none",
    fontSize: "18px",
    marginTop: "8px",
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
        setMessageThreadId(listOfMessagesInFocus![0]);
        setReply(input);
        setUsername(user?.userName!);
        addReply();
      }
    }
  };

  const handleSetRecipient = () => {
    if (listOfMessagesInFocus![1][0].senderUsername === user?.userName) {
      setRecipient(
        listOfMessagesInFocus![1][0].recipientUsername!,
        user?.image
      );
    } else {
      setRecipient(listOfMessagesInFocus![1][0].senderUsername!, user?.image);
    }
  };

  return (
    <TextArea
      autoFocus
      value={input}
      placeholder='Reply'
      name='reply'
      onInput={(e: any) => setInput(e.target.value)}
      onKeyDown={(e: any) => handleSendReply(e)}
      style={tAreatyles}
    />
  );
};

export default observer(PrivateMessageReply);
