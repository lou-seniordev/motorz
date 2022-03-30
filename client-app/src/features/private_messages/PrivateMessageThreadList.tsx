import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Grid, Image, Container } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IPrivateMessage } from "../../app/models/privatemessages";
import { toJS } from "mobx";
// import PrivateMessageThreadListItem from "./PrivateMessageThreadListItem";

// const PrivateMessageThreadList: React.FC<IProps> = ({ last }) => {
const PrivateMessageThreadList = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const {
    messagesByThreadId,
    //  markReadInDB,
    // loadingInitial,
    // messageThreadsCount,
    // last,
    setInitialView,
    setView,
    createHubConnection,
    // , stopHubConnection,
  } = rootStore.privateMessageStore;

  useEffect(() => {
    setInitialView();
  }, [setInitialView]);

  // const markRead = (messages: IPrivateMessage[]) => {
  //   messages.forEach((m) => {
  //     if (m.senderUsername !== user?.userName && m.dateRead === null) {
  //       // console.log(toJS(m));
  //       markReadInDB(m.id);
  //     }
  //   });
  // };

  // getSenderPhoto();
  // const getSenderPhoto =()=> {
  //   messagesByThreadId.map(([id, message]) => {
  //     console.log(toJS(message[0]))
  //   })
  // }

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={16}>
          {messagesByThreadId.map(([id, messages]) => (
            <Container
              key={id}
              style={{ backgroundColor: "lightblue", paddingTop: "3em" }}
            >
              <Grid
                onClick={() => {
                  // markRead(messages);
                  setView(messages[0].privateMessageThreadId);
                  createHubConnection(messages[0].privateMessageThreadId);
                }}
                divided
                style={{ cursor: "pointer" }}
              >
                <Grid.Column
                  mobile={16}
                  className='mobile only'
                  style={{ padding: "0px", margin: "0px" }}
                >
                  <img
                    className='ui centered medium image'
                    style={{ borderRadius: "50%" }}
                    width={"40px"}
                    src={messages[0].senderPhotoUrl || "/assets/user.png"}
                    alt='sender'
                  />
                </Grid.Column>

                <Grid.Column computer={4} className='mobile hidden'>
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
                <Grid.Column width={12} className='mobile hidden'>
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

                    <Grid.Row>
                      {messages[0].content.substring(0, 18)}...
                    </Grid.Row>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Container>
          ))}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PrivateMessageThreadList);
