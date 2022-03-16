import React, { Fragment, useContext, useEffect, useState } from "react";
import { Input, Segment } from "semantic-ui-react"; //, Segment
import { observer } from "mobx-react-lite";
// import { RouteComponentProps, Link } from "react-router-dom";
// import { formatDistance } from "date-fns";
import { RootStoreContext } from "../../app/stores/rootStore";
// import LoadingComponent from "../../app/layout/LoadingComponent";
// import { toJS } from "mobx";
import { IPrivateMessage } from "../../app/models/privatemessages";
import { toJS } from "mobx";
// import LoadingComponent from "../../../app/layout/LoadingComponent";
// import ReplyForm from "../forms/ReplyForm";

// interface IProps {
//   view: any;
// }

const PrivateMessageThreadListItem = () => {
  // const PrivateMessageThreadListItem: React.FC<IProps> = ({ view }) => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  // const {
  //   setUser,
  //   loadingMessageThread,
  //   loadMessageThread,
  //   messagesFromThread,
  // } = rootStore.messageStore;

  const { setRecipient, setMessageThreadId, 
    // sendReply, 
    last, setUsername,
    createHubConnection, stopHubConnection,
     setReply, addComment } =
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
      // console.log(e);
      e.target.value = "";
      // console.log(input);
      // console.log('toJS(last[1])');
      // console.log(toJS(last![1]));
      // console.log('toJS(last)');
      // console.log(toJS(last));

      // last!.push('3B8D4A2F-F3C3-4199-BF5C-2B8ED6C94CF7', last![1])

      // console.log('new last:');
      // console.log(toJS(last));

      handleSetRecipient();
      setMessageThreadId(last![0]);
      setReply(input)
      setUsername(user?.userName!);
      addComment();

      // sendReply(input);
      // last[0]
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

      {last![1].reverse().map((message: IPrivateMessage) => (//slice().
        // <>
        <Segment
          key={message.id}
          floated={user!.userName === message.senderUsername ? "right" : "left"}
          style={
            user!.userName === message.senderUsername
              ? userStyles
              : senderStyles
          }
        >
          {/* <h4>
            
            {message.senderDisplayName}
          </h4> */}
          {/* <h6> */}
            from {message.senderUsername === user?.userName
              ? "Me"
              : message.senderDisplayName}{': '}{message.content}
              {/* </h6> */}
        </Segment>
        // </>
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