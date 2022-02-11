import React, { Fragment, useContext, useEffect } from "react";
import { Button, Divider, Grid, Item, Segment } from "semantic-ui-react"; 
import { RootStoreContext } from "../../../app/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ReplyForm from "../forms/ReplyForm";

interface DetailParams {
  id: string;
}
const MessageThreadListItem: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    setUser,
    loadingMessageThread,
    loadMessageThread,
    messagesFromThread,
  } = rootStore.messageStore;

  const { openModal } = rootStore.modalStore;

  const { user } = rootStore.userStore;

  useEffect(() => {
    setUser(user!.userName, user!.image);
    loadMessageThread(match.params.id);
  }, [loadMessageThread, match.params.id, setUser, user]);

  if (loadingMessageThread)
    return <LoadingComponent content='Loading messages...' />;

  return (
    <Segment.Group>
      <Segment>
        <Fragment>
          <Button
            content='Reply to sender'
            fluid
            onClick={() => {
              openModal(<ReplyForm />);
            }}
          />
          {messagesFromThread!.map((message: any) => (
            <Fragment key={message.id}>
              <Segment>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={2}>
                      <Item.Image
                        size='tiny'
                        circular
                        src={message.senderPhotoUrl}
                      />
                    </Grid.Column>
                    <Grid.Column width={14}>
                      <Item.Header>
                        <Item.Description>
                          From{" "}
                          {message.senderUsername === user?.userName
                            ? "me"
                            : message.senderUsername}{" "} -  
                          Sent on: {message.dateSent}
                        </Item.Description>
                        <Divider />
                      </Item.Header>
                      <Item.Description>{message.content}</Item.Description>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Fragment>
          ))}
        </Fragment>
      </Segment>
    </Segment.Group>
  );
};

export default observer(MessageThreadListItem);
