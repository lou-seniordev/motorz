import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Segment, Button, Grid, Icon } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { useHistory } from "react-router";
import ConfirmDelete from "../forms/ConfirmDelete";
import { IMessage } from "../../../app/models/message";

const MessageThreadList = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const { messagesByDate, markReadInDB, messageThreadsCount } =
    rootStore.messageStore;

  const { openModal } = rootStore.modalStore;

  let history = useHistory();

  const removeThread = (id: string) => {
    openModal(<ConfirmDelete id={id} />);
  };

  const markRead = (message: IMessage) => {
    if (message.senderUsername !== user?.userName) {
      markReadInDB(message.id);
    }
  };

  return (
    <Segment style={{ textAlign: "center" }}>
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
          <Grid className="mobview" columns={4} divided>
            <Grid.Column width={4}>
              <p>PRODUCT</p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p>SENDER</p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p>SENT</p>
            </Grid.Column>
            <Grid.Column width={4}>
              <p>ACTION</p>
            </Grid.Column>
          </Grid>
        </Fragment>
      </Segment>
      {/* <Segment> */}
      {messagesByDate.map(([id, messages]) => (
        <Fragment key={id}>
          <Segment raised>
            <Grid columns={4} divided style={{ cursor: "pointer" }}>
              <Grid.Row
                style={
                  messages[0].dateRead === null &&
                  messages[0].senderUsername !== user?.userName
                    ? { fontWeight: "bold", color: "rgb(29, 115, 152)" }
                    : { fontWeight: "normal" }
                }
                onClick={() => {
                  history.push(`/messageThread/${messages[0].messageThreadId}`);
                  markRead(messages[0]);
                }}
              >
                <Grid.Column width={4}>
                  <h4>{messages[0].productTitle}</h4>
                </Grid.Column>
                <Grid.Column width={4}>
                  <h4>
                    {" "}
                    {messages[0].senderUsername === user?.userName
                      ? "me"
                      : messages[0].senderUsername}
                  </h4>
                </Grid.Column>
                <Grid.Column width={4}>
                  <h4>{messages[0].dateSent}</h4>
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
                  {/* <Icon className="btnview_show" name='delete' /> */}
                    <Button.Content className="btnview_hide" visible>Delete</Button.Content>
                    <Button.Content className="btnview_hide" hidden>
                      <Icon name='delete' />
                    </Button.Content>
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Fragment>
      ))}
      {/* </Segment> */}
    </Segment>
  );
};

export default observer(MessageThreadList);
