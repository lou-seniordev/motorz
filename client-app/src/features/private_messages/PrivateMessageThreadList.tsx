import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
// import { RootStoreContext } from "../../../app/stores/rootStore";
// import { useHistory } from "react-router";
// import ConfirmDelete from "../forms/ConfirmDelete";
// import { IMessage } from "../../../app/models/message";
import { formatDistance } from "date-fns";
import { RootStoreContext } from "../../app/stores/rootStore";
import { toJS } from "mobx";
import LoadingComponent from "../../app/layout/LoadingComponent";
import PrivateMessageThreadListItem from "./PrivateMessageThreadListItem";
import { IPrivateMessage } from "../../app/models/privatemessages";

interface IProps {
  last: any;
}

// const PrivateMessageThreadList: React.FC<IProps> = ({ last }) => {
const PrivateMessageThreadList = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const {
    messagesByThreadId,
    //    markReadInDB,
    // loadingInitial,
    // messageThreadsCount,
    // setLast,
    // setUser,
    last,
    getLast,
  } = rootStore.privateMessageStore;

//   const [view, setView] = useState<IPrivateMessage[]>([]);

  useEffect(() => {
    //   let isMounted = true;
    // if (view.length === 0) {
    //   console.log("view", view);

      getLast()
    //   .then((last) => {
    //     if (isMounted) setView(last[1]);
    //   });

    // } 
    // else {
    //   console.log("view in else", view);
    // }

    // return () => {
    //   isMounted = false;
    // };
  }, [getLast]);//, setView

  //   if (loadingInitial || last === {})
  //     return <LoadingComponent content='Loading messages...' />;

  //   const { openModal } = rootStore.modalStore;

  //   let history = useHistory();

  //   const removeThread = (id: string) => {
  //     openModal(<ConfirmDelete id={id} />);
  //   };

  //   const markRead = (message: IMessage) => {
  //     if (message.senderUsername !== user?.userName) {
  //       markReadInDB(message.id);
  //     }
  //   };

  return (


    <Segment
      style={{ backgroundColor: "lightblue" }} //textAlign: "center",
      raised
    >
    

      <Grid>
        <Grid.Column width={6}>
          {messagesByThreadId.map(([id, messages]) => (
            // <Fragment key={id}>
            <Segment raised key={id}>
              <Grid
                // columns={4}
                onClick={() => getLast(messages[0].privateMessageThreadId)}
                divided
                style={{ cursor: "pointer" }}
              >
                <Grid.Column width={4}>
                  <Image
                    size='mini'
                    circular
                    verticalAlign='middle'
                    src={messages[0].senderPhotoUrl || "/assets/user.png"}
                  />
                  <span>
                    {" "}
                    {messages[0].senderUsername === user?.userName
                      ? "Me"
                      : messages[0].senderDisplayName}
                  </span>
                 
                </Grid.Column>
                <Grid.Column width={12}>
                  <Grid.Row
                    style={
                      messages[0].dateRead === null &&
                      messages[0].senderUsername !== user?.userName
                        ? { fontWeight: "bold", color: "rgb(29, 115, 152)" }
                        : { fontWeight: "normal" }
                    }
                  
                  >
                     <span>
                    {formatDistance(
                      new Date(messages[0].dateSent),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>

                    <Grid.Row>{messages[0].content}</Grid.Row>
                  </Grid.Row>
                  {/* <Grid.Row>
                    <h6>
                      {formatDistance(
                        new Date(messages[0].dateSent),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}
                    </h6>
                  </Grid.Row> */}
                </Grid.Column>
              </Grid>
            </Segment>
            // </Fragment>
          ))}
        </Grid.Column>
        <Grid.Column width={10}>
          {last && <PrivateMessageThreadListItem />}
          {/* <PrivateMessageThreadListItem /> */}
          {/* {view && <PrivateMessageThreadListItem view={view} />} */}
        </Grid.Column>
      </Grid>

      {/* </Segment> */}
    </Segment>

    //   {/* <Segment> */}
    //   {messagesByDate.map(([id, messages]) => (
    //     <Fragment key={id}>
    //       <Segment raised>
    //         <Grid columns={4} divided style={{ cursor: "pointer" }}>
    //           <Grid.Row
    //             style={
    //               messages[0].dateRead === null &&
    //               messages[0].senderUsername !== user?.userName
    //                 ? { fontWeight: "bold", color: "rgb(29, 115, 152)" }
    //                 : { fontWeight: "normal" }
    //             }
    //             onClick={() => {
    //               history.push(`/messageThread/${messages[0].messageThreadId}`);
    //               markRead(messages[0]);
    //             }}
    //           >
    //             <Grid.Column width={4}>
    //               <h4>{messages[0].productTitle}</h4>
    //             </Grid.Column>
    //             <Grid.Column width={4}>
    //               <h4>
    //                 {" "}
    //                 {messages[0].senderUsername === user?.userName
    //                   ? "Me"
    //                   : messages[0].senderDisplayName}
    //               </h4>
    //             </Grid.Column>
    //             <Grid.Column width={4}>
    //               {formatDistance(new Date(messages[0].dateSent), new Date())}{" "}ago
    //             </Grid.Column>
    //             <Grid.Column
    //               width={4}
    //               onClick={(e: any) => e.stopPropagation()}
    //               style={{ cursor: "auto" }}
    //             >
    //               <Button
    //                 style={{ textAlign: "center" }}
    //                 animated
    //                 onClick={() => removeThread(messages[0].messageThreadId)}
    //               >
    //                 {/* <Icon className="btnview_show" name='delete' /> */}
    //                 <Button.Content className='btnview_hide' visible>
    //                   Delete
    //                 </Button.Content>
    //                 <Button.Content className='btnview_hide' hidden>
    //                   <Icon name='delete' />
    //                 </Button.Content>
    //               </Button>
    //             </Grid.Column>
    //           </Grid.Row>
    //         </Grid>
    //       </Segment>
    //     </Fragment>
    //   ))}
    //   {/* </Segment> */}
    // </Segment>
  );
};

export default observer(PrivateMessageThreadList);


  {/* <Segment raised>
      <Fragment>
        <Grid>
          <Grid.Column width={16}>
            <h2>
              {user?.displayName}'s shopping mailbox, contains{" "}
              {messageThreadsCount} conversations
            </h2>
          </Grid.Column>
        </Grid>
      </Fragment>
    </Segment> */}

      {/* <Segment raised>
      <Fragment>
        <Grid className='mobview' columns={4} divided>
          <Grid.Column width={4}>
            <h3>PRODUCT</h3>
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>SENDER</h3>
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>SENT</h3>
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>ACTION</h3>
          </Grid.Column>
        </Grid>
      </Fragment>
    </Segment> */}
      {/* <Segment> */}