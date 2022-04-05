import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Segment, Button, Grid, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { useHistory } from "react-router";
import ConfirmDelete from "../forms/ConfirmDelete";
import { IMessage } from "../../../app/models/message";
import { formatDistance } from "date-fns";
import { toJS } from "mobx";

const MessageThreadList = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const { messagesByDate, markReadInDB, messageThreadsCount } =
    rootStore.messageStore;

    // console.log('messagesByDate in list', messagesByDate)

  const { openModal } = rootStore.modalStore;

  let history = useHistory();

  const removeThread = (id: string) => {
    openModal(<ConfirmDelete id={id} />);
  };

  const markRead = (messages: IMessage[]) => {
    // if (message.senderUsername !== user?.userName) {
    //   markReadInDB(message.id);
    // }

    // console.log(toJS(messages))

    messages.forEach((message) => {
      if (
        message.senderUsername !== user?.userName &&
        message.dateRead === null
      ) {
        markReadInDB(message.id);
        // console.log(toJS(message))
      }
    });
  };

  // const markRead = (messages: IPrivateMessage[]) => {
  //   messages.forEach((m) => {
  //     if (m.senderUsername !== user?.userName && m.dateRead === null) {
  //       markReadInDB(m.id);
  //     }
  //   });
  // };

  return (
    <Segment
      style={{ textAlign: "center", backgroundColor: "lightblue" }}
      raised
    >
      <Segment raised>
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
      </Segment>
      <Segment raised>
        <Fragment>
          {/* className='mobview' */}
          <Grid columns={4} divided>
            <Grid.Row className='mobile hidden'>
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
            </Grid.Row>
            <Grid.Row className='mobile only'>
              <Grid.Column width={4} style={{ textAlign: "center" }}>
                <h5>PRODUCT</h5>
              </Grid.Column>
              <Grid.Column width={4}>
                <h5>SENDER</h5>
              </Grid.Column>
              <Grid.Column width={4}>
                <h5>SENT</h5>
              </Grid.Column>
              <Grid.Column width={4}>
                <h5>ACTION</h5>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Fragment>
      </Segment>
      {messagesByDate.map(([id, messages]) => (
        <Fragment key={id}>
          <Segment raised>
            <Grid columns={4} divided style={{ cursor: "pointer" }}>
              <Grid.Row
                style={
                  messages[0].dateRead === null &&
                  messages[0].senderUsername !== user?.userName
                    ? { fontWeight: "bold", color: "rgb(211, 81, 21)" }
                    : { fontWeight: "normal" }
                }
                onClick={() => {
                  history.push(`/messageThread/${messages[0].messageThreadId}`);
                  markRead(messages);
                }}
              >
                <Grid.Column width={4}>
                  <h4>{messages[0].productTitle}</h4>
                </Grid.Column>
                <Grid.Column width={4}>
                  <h4>
                    {" "}
                    {messages[0].senderUsername === user?.userName
                      ? "Me"
                      : messages[0].senderDisplayName}
                  </h4>
                </Grid.Column>
                <Grid.Column width={4}>
                  {formatDistance(new Date(messages[0].dateSent), new Date(), {
                    addSuffix: true,
                  })}
                </Grid.Column>
                <Grid.Column
                  width={4}
                  onClick={(e: any) => e.stopPropagation()}
                  style={{ cursor: "auto" }}
                >
                  <Button
                    style={{ textAlign: "center" }}
                    animated
                    onClick={() => removeThread(messages[0].messageThreadId)}
                  >
                    <Button.Content className='btnview_hide' visible>
                      Delete
                    </Button.Content>
                    <Button.Content className='btnview_hide' hidden>
                      <Icon name='delete' />
                    </Button.Content>
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Fragment>
      ))}
    </Segment>
  );
};

export default observer(MessageThreadList);
