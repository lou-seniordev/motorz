import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
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

const MessageThreadList = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const { messagesByDate } = rootStore.messageStore; //, setThread

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
                  onClick={() => {
                    history.push(
                      `/messageThread/${messages[0].messageThreadId}`
                    );
                  }}
                >
                  <Table.Cell
                    onClick={(e: any) => e.stopPropagation()}
                    style={{ verticalAlign: "middle", textAlign: "center" }}
                  >
                    <Checkbox
                      name='myCheckBox1'
                      onChange={(e, data) =>
                        handleChange(messages[0].messageThreadId, data)
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Header as='h4' image>
                      <Image
                        src={messages[0].productPhotoUrl}
                        rounded
                        size='mini'
                      />
                      <Header.Content>
                        {messages[0].productTitle}
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    {messages[0].senderUsername === user?.userName
                      ? "me"
                      : messages[0].senderUsername}
                  </Table.Cell>
                  <Table.Cell>{messages[0].content}</Table.Cell>
                  <Table.Cell>{messages[0].dateSent}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Fragment>
          ))}
        </Fragment>
      </Table>
    </Segment>
  );
};

export default observer(MessageThreadList);
