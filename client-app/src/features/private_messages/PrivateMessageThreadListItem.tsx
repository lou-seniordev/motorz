import React, { Fragment, useCallback, useContext, useEffect } from "react";
import {
  Segment,
  Image,
  Grid,
  GridColumn,
  GridRow,
  Icon,
} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IPrivateMessage } from "../../app/models/privatemessages";
import ConfirmDelete from "./modals/ConfirmDelete";

const PrivateMessageThreadListItem = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const {
    listOfMessagesInFocus,
    markReadInDB,
    createHubConnection,
    stopHubConnection,
    deleteSingleMessage,
  } = rootStore.privateMessageStore;

  const { openModal, setSize } = rootStore.modalStore;

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

  const markRead = useCallback(
    (messages: IPrivateMessage[]) => {
      messages.forEach((m) => {
        if (m.senderUsername !== user?.userName && m.dateRead === null) {
          markReadInDB(m.id);
        }
      });
    },
    [markReadInDB, user]
  );

  useEffect(() => {
    createHubConnection(listOfMessagesInFocus![0]);
    markRead(listOfMessagesInFocus![1]);
  }, [createHubConnection, stopHubConnection, listOfMessagesInFocus, markRead]);

  return (
    <>
      <Segment className='scrollRevert'>
        {listOfMessagesInFocus![1].map((message: IPrivateMessage) => (
          <Fragment key={message.id}>
            {message.senderUsername !== user?.userName && (
              <div className='message-list-item'>
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
                  <GridRow
                    only={"mobile"}
                    style={{
                      fontSize: "smaller",
                      paddingTop: ".3rem",
                      paddingBottom: ".3rem",
                    }}
                  >
                    <GridColumn width={14}>{message.content}</GridColumn>
                  </GridRow>
                </Grid>
              </div>
            )}
            {message.senderUsername === user?.userName && (
              <div className='message-list-item'>
                <Grid style={userStyles} textAlign='right' floated='right'>
                  <GridRow className='mobile hidden'>
                    <GridColumn width={1}>
                      <Icon
                        name='delete'
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSize("mini");
                          openModal(
                            <ConfirmDelete
                              messageId={message.id}
                              privateMessageThreadId={
                                message.privateMessageThreadId
                              }
                            />
                          );
                        }}
                      />
                      <Icon name='edit' style={{ cursor: "pointer" }} />
                    </GridColumn>
                    {/* <GridColumn width={1}>
                      <Icon
                        name='edit'
                        style={{ cursor: "pointer" }}
                        // onClick={() => {
                        //   setSize("mini");
                        //   openModal(
                        //     <ConfirmDelete
                        //       messageId={message.id}
                        //       privateMessageThreadId={
                        //         message.privateMessageThreadId
                        //       }
                        //     />
                        //   );

                        // }}
                      />
                    </GridColumn> */}
                    <GridColumn width={13}>{message.content}</GridColumn>
                    <GridColumn width={2}>
                      <Image
                        size='mini'
                        circular
                        verticalAlign='middle'
                        src={message.senderPhotoUrl || "/assets/user.png"}
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow
                    only={"mobile"}
                    style={{
                      fontSize: "smaller",
                      paddingTop: ".3rem",
                      paddingBottom: ".3rem",
                    }}
                  >
                    <GridColumn width={1}>
                      <Icon
                        name='delete'
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSize("mini");
                          openModal(
                            <ConfirmDelete
                              messageId={message.id}
                              privateMessageThreadId={
                                message.privateMessageThreadId
                              }
                            />
                          );
                        }}
                      />
                      <Icon name='edit' style={{ cursor: "pointer" }} />
                    </GridColumn>
                    <GridColumn width={13}>{message.content}</GridColumn>
                  </GridRow>
                </Grid>
              </div>
            )}
          </Fragment>
        ))}
      </Segment>
    </>
  );
};

export default observer(PrivateMessageThreadListItem);
