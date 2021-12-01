import React, { Fragment, useContext, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import {  Segment } from "semantic-ui-react";//Grid, Item,
// import { IMessage } from "../../../app/models/message";
import { RootStoreContext } from "../../../app/stores/rootStore";
// import { useLocation, useParams } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";

//loadMessageThread
interface DetailParams {
  id: string;
}
const MessageThreadListItem: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  // const MessageThreadListItem = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingMessageThread ,
    // messageThread,
    loadMessageThread,
    messagesFromThread
  } = rootStore.messageStore;

  useEffect(() => {
    loadMessageThread(match.params.id)
  }, [
    loadMessageThread,match.params.id
  ]);

  if (loadingMessageThread)
    return <LoadingComponent content='Loading messages...' />;

  return (
    <Segment.Group>
      <Segment>
       

        <Fragment>
          {messagesFromThread!.map((message: any) => (
            <Fragment key={message.id}>
              <h6>***</h6>
              <h5>
                Hallo from {message.senderUsername} my message is=
                {message.content} sent on {message.dateSent}
              </h5>
            </Fragment>
          ))}
        </Fragment>
        {/* <Fragment>
          {messageThread!.map((message: any) => (
            <Fragment key={message.id}>
              <h6>***</h6>
              <h5>
                Hallo from {message.senderUsername} my message is=
                {message.content} sent on {message.dateSent}
              </h5>
            </Fragment>
          ))}
        </Fragment> */}


        {/* <NavLink to={params}>
            <Grid>
              <Grid.Column width={3}>
                <Item.Image
                  size='tiny'
                  circular
                  src={message.productPhotoUrl}
                />
                <Item.Description>{message.productTitle}</Item.Description>
              </Grid.Column>

              <Grid.Column width={3}>
            <Item.Image size='tiny' circular src={message.senderPhotoUrl} />
            <Item.Description>{message.senderUsername}</Item.Description>
          </Grid.Column>

              <Grid.Column width={10}>
                <Item.Description>Message Id: {message.id}</Item.Description>
                <Item.Description>Sent: {message.dateSent}</Item.Description>
                <Item.Description>
                  {message.senderUsername} wrote: {message.content}
                </Item.Description>
              </Grid.Column>
            </Grid>
          </NavLink> */}
      </Segment>
    </Segment.Group>
  );
};

export default observer(MessageThreadListItem);
