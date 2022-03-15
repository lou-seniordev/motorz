import React, { useContext, useState } from "react";
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

  const { setRecipient, setMessageThreadId, sendReply, last } =
    rootStore.privateMessageStore;

  const userStyles = {
    fontWeight: "bold",
    borderRadius: "50px",
    color: "rgb(29, 115, 152)",
    width: "80%",
    // height: "fit-content",
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
    // display: "inline-flex",
    backgroundColor: "inherit",
  };

  const [input, setInput] = useState(""); // '' is the initial state value

  const handleSendReply = (e: any) => {
    if (e.key === "Enter") {
      // console.log(e);
      e.target.value = "";
      // console.log(input);
      // console.log(toJS(last[1]));
      handleSetRecipient();
      setMessageThreadId(last[0]);
      sendReply(input);
      // last[0]
    }
  };

  const handleSetRecipient = () => {
    if (last[1][0].senderUsername === user?.userName) {
      setRecipient(last[1][0].recipientUsername, user?.image);
    } else {
      setRecipient(last[1][0].senderUsername, user?.image);
    }
  };

  return (
    <>
      {/* style={{height: '100vh '}} */}

      {last[1].map((message: IPrivateMessage) => (
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
          <h4>
            {/* {message.senderUsername === user?.userName
              ? "Me"
              : message.senderDisplayName} */}
            {message.senderDisplayName}
          </h4>
          <h6>{message.content}</h6>
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
    </>
  );
};

export default observer(PrivateMessageThreadListItem);

// // <Segment.Group>
//   <Segment style={{ textAlign: "center", backgroundColor: 'lightblue' }} raised>
//     <Fragment>
//       <Button
//         content='Reply to sender'
//         fluid
//         color="instagram"
//         // onClick={() => {
//         //   openModal(<ReplyForm />);
//         // }}
//       />
//       {messagesFromThread!.map((message: any) => (
//         <Fragment key={message.id}>
//           <Segment>
//             <Grid>
//               <Grid.Column width={3}>
//                 <Grid.Row>
//                   <Link to={`/gallery/${message.senderUsername}`}>
//                     <img
//                       className='ui centered circular mini image'
//                       src={message.senderPhotoUrl || "/assets/user.png"!}
//                       alt='Sender'
//                     />
//                   </Link>
//                 </Grid.Row>
//                 {/* <Grid.Row>
//                   <Item.Header>
//                     <Item.Description style={{ textAlign: "center" }}>
//                       {message.senderUsername === user?.userName
//                         ? "Me"
//                         : message.senderDisplayName},{" "}
//                       {formatDistance(
//                         new Date(message.dateSent),
//                         new Date()
//                       )}{" "}
//                       ago
//                     </Item.Description>

//                   </Item.Header>
//                 </Grid.Row> */}
//               </Grid.Column>
//               <Grid.Column width={13}>
//                 <Item.Description>{message.content}</Item.Description>
//               </Grid.Column>
//                 <Item.Extra style={{ textAlign: "center" }}>
//                       {/* {message.senderUsername === user?.userName
//                         ? "Me"
//                         : message.senderDisplayName},{" "} */}
//                       {formatDistance(
//                         new Date(message.dateSent),
//                         new Date()
//                       )}{" "}
//                       ago
//                     </Item.Extra>
//             </Grid>
//           </Segment>
//         </Fragment>
//       ))}
//     </Fragment>
//   </Segment>
// // </Segment.Group>

// const [last, setLast] = useState<IPrivateMessage[]>([]);
// useEffect(() => {
//   let isMounted = true;
//   getLast().then((last) => {
//     if (isMounted) setLast(last[1]);
//   });
//   return () => {
//     isMounted = false;
//   };
// }, [getLast, setLast]);

// let isMounted = true;
// const [view, setView] = useState<IPrivateMessage[]>([]);
// useEffect(() => {
//   if (view.length === 0) {
//     console.log('view', view)
//     getLast().then((last) => {
//       if (isMounted) setView(last[1]);
//     });
//   }
//   else if (view.length !== 0) {
//       console.log('view in else', view)
//   }
//   return () => {
//     isMounted = false;
//   };
// }, [getLast, setView]);

// console.log("before");
// console.log(toJS(last));

// if (!last) return <LoadingComponent content='Still not ready...' />;

// console.log("after");
// console.log(toJS(last));

// if (view.length === 0)
