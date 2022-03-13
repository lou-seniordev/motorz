import React, { Fragment, useContext, useEffect } from "react";
import { Button, Grid, Item, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ReplyForm from "../forms/ReplyForm";
import { formatDistance } from "date-fns";

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
            color="instagram"
            onClick={() => {
              openModal(<ReplyForm />);
            }}
          />
          {messagesFromThread!.map((message: any) => (
            <Fragment key={message.id}>
              <Segment>
                <Grid>
                  <Grid.Column width={3}>
                    <Grid.Row>
                      <Link to={`/gallery/${message.senderUsername}`}>
                        <img
                          className='ui centered circular mini image'
                          src={message.senderPhotoUrl || "/assets/user.png"!}
                          alt='Sender'
                        />
                      </Link>
                    </Grid.Row>
                    {/* <Grid.Row>
                      <Item.Header>
                        <Item.Description style={{ textAlign: "center" }}>
                          {message.senderUsername === user?.userName
                            ? "Me"
                            : message.senderDisplayName},{" "}
                          {formatDistance(
                            new Date(message.dateSent),
                            new Date()
                          )}{" "}
                          ago
                        </Item.Description>
                       
                      </Item.Header>
                    </Grid.Row> */}
                  </Grid.Column>
                  <Grid.Column width={13}>
                    <Item.Description>{message.content}</Item.Description>
                  </Grid.Column>
                    <Item.Extra style={{ textAlign: "center" }}>
                          {/* {message.senderUsername === user?.userName
                            ? "Me"
                            : message.senderDisplayName},{" "} */}
                          {formatDistance(
                            new Date(message.dateSent),
                            new Date()
                          )}{" "}
                          ago
                        </Item.Extra>
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
