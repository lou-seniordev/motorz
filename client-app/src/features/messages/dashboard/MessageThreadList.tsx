import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useState } from "react";
import {
  Checkbox,
  Header,
  Table,
  Image,
  Segment,
  Button,
  Grid,
  Divider,
} from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { useHistory } from "react-router";
import ConfirmDelete from "../forms/ConfirmDelete";
import { IMessage } from "../../../app/models/message";
import LoadingComponent from "../../../app/layout/LoadingComponent";



const MessageThreadList = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const {
    messagesByDate,
    markReadInDB,
    setPage,
    page,
    totalPages,
    loadMessages,
    loadingInitial,
  } = rootStore.messageStore;

  const [ loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadMessages().then(() => setLoadingNext(false));
  };

  const { openModal } = rootStore.modalStore;

  let history = useHistory();

  let deletionList: string[] = [];

  const handleChange = (id: string, data: any) => {
    deletionList.includes(id)
      ? deletionList.splice(deletionList.indexOf(id), 1)
      : deletionList.push(id);
  };

  const removeThread = () => {
    openModal(<ConfirmDelete ids={deletionList} />);
  };

  const markRead = (message: IMessage) => {
    if (message.senderUsername !== user?.userName) {
      markReadInDB(message.id);
    }
  };


  if ( loadingInitial && page === 0)
    return <LoadingComponent content={"Loading messages..."} />;

  return (
    <Segment>
      <Segment>
        <Fragment>
          <Grid>
            <Grid.Column width={6}>
              <Button
                content='delete'
                onClick={removeThread}
                // disabled={Object.keys(deletionList).length === 0}
              />
              <Divider vertical>iNFO</Divider>
            </Grid.Column>
            <Grid.Column width={10}>
              <h1>Statistix placeholder</h1>
            </Grid.Column>
          </Grid>
        </Fragment>
      </Segment>
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Product Title</Table.HeaderCell>
            <Table.HeaderCell>Sender</Table.HeaderCell>
            <Table.HeaderCell>Content</Table.HeaderCell>
            <Table.HeaderCell>Date Sent</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Fragment>
          {messagesByDate.map(([id, messages]) => (
            <Fragment key={id}>
              <Table.Body>
                <Table.Row
                  //
                  style={
                    messages[0].dateRead === null &&
                    messages[0].senderUsername !== user?.userName
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                  // {messages[0].dateRead}
                  onClick={() => {
                    history.push(
                      `/messageThread/${messages[0].messageThreadId}`
                    );
                    markRead(messages[0]);
                  }}
                >
                  <Table.Cell
                    onClick={(e: any) => e.stopPropagation()}
                    style={{
                      verticalAlign: "middle",
                      textAlign: "center",
                      // height: "200px",
                    }}
                  >
                    <Checkbox
                      // name='myCheckBox1'
                      onChange={(e, data) =>
                        handleChange(messages[0].messageThreadId, data)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {/* <Header as='h4' image> */}
                    {/* <Image
                        src={messages[0].productPhotoUrl}
                        rounded
                        size='mini'
                      /> */}
                    {/* <Header.Content> */}
                    {messages[0].productTitle}
                    {/* </Header.Content> */}
                    {/* </Header> */}
                  </Table.Cell>
                  <Table.Cell>
                    {messages[0].senderUsername === user?.userName
                      ? "me"
                      : messages[0].senderUsername}
                  </Table.Cell>
                  <Table.Cell>{messages[0].content} </Table.Cell>
                  <Table.Cell>{messages[0].dateSent}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Fragment>
          ))}
        </Fragment>
      </Table>
      {/* { <Button
        fluid
        content='more...'
        positive
        onClick={handleGetNext}
        loading={loadingNext}
        disabled={totalPages === page + 1}
      />} */}
    </Segment>
  );
};

export default observer(MessageThreadList);
