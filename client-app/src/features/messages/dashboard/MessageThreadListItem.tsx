import React, { Fragment, useContext, useEffect } from "react";
import { Button, Grid, Item, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { RouteComponentProps, Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ReplyForm from "../forms/ReplyForm";
import { formatDistance } from "date-fns";
import { toJS } from "mobx";

interface DetailParams {
  id: string;
}
const MessageThreadListItem: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingMessageThread,
    loadMessageThread,
    messagesFromThread,
    messagesByDate,
    setUsername,
    // createHubConnection,
    // stopHubConnection,
    // messageThreadId
  } = rootStore.messageStore;

  const { openModal } = rootStore.modalStore;

  // console.log('messagesFromThread in item', toJS(messagesFromThread))
  // console.log('messagesByDate in item', messagesByDate)
  // console.log('match in item', match)

  const { user } = rootStore.userStore;

  useEffect(() => {
    setUsername(user?.userName!);
    loadMessageThread(match.params.id);
  }, [loadMessageThread, match.params.id, setUsername,  user]);

//   useEffect(() => {
//     createHubConnection(messageThreadId);
//    return () => {
//      stopHubConnection(messageThreadId);
//    };
//  }, 
//  [
//   createHubConnection, stopHubConnection, 
//   messageThreadId]
//  );

  if (loadingMessageThread)
    return <LoadingComponent content='Loading messages...' />;

  return (
      <Segment style={{ textAlign: "center", backgroundColor: 'lightblue' }} raised>
        <Fragment>
          <Button
            content='Reply'
            fluid
            attached='top'
            color="instagram"
            onClick={() => {
              openModal(<ReplyForm messageThreadId={match.params.id} />);
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
  );
};

export default observer(MessageThreadListItem);
