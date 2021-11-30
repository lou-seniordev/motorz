import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Header, Item, Table, Image } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import MessageThreadListItem from "./MessageThreadListItem";
import { useHistory } from "react-router";
import { toJS } from "mobx";
import { IMessage } from "../../../app/models/message";

const MessageThreadList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { messagesByDate, setThread} = rootStore.messageStore;//, setThread

  let history = useHistory();

  // const handleClick = (id: string) => {
  const handleClick = (messageThread: any) => {
    console.log(messageThread);
    setThread(toJS(messageThread));
    history.push("/messageThread/");
  };

  return (
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
        {messagesByDate.map(([group, messages]) => (
          <Fragment key={group}>
            <Table.Body>
              {/* as={Link} to='gallery' */}
              <Table.Row
                onClick={() => {
                  
                  handleClick(messages);
                  // history.push(`/messageThread/${messages[0].messageThreadId}`);
                }}
              >
                <Table.Cell>
                  <Checkbox />
                </Table.Cell>
                {/* <Table.Cell>{messages[0].productTitle}</Table.Cell> */}
                <Table.Cell>
                  <Header as='h4' image>
                    <Image
                      src={messages[0].productPhotoUrl}
                      rounded
                      size='mini'
                    />
                    <Header.Content>{messages[0].productTitle}</Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{messages[0].senderUsername}</Table.Cell>
                <Table.Cell>{messages[0].content}</Table.Cell>
                <Table.Cell>{messages[0].dateSent}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Fragment>
        ))}
      </Fragment>
    </Table>
  );
};

export default observer(MessageThreadList);

{
  /* <Table.Cell>
                  <Header as='h4' image>
                    <Image
                      src={messages[0].senderPhotoUrl}
                      rounded
                      size='mini'
                    />
                    <Header.Content>
                    {messages[0].senderUsername}
                      <Header.Subheader>In Motoranza Since</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell> */
}
{
  /* <Fragment>
{messagesByDate.map(([group, messages]) => (
  <Fragment key={group}>
    <Item.Group>
      <MessageThreadListItem message={messages[0]} messages={messages} />
    </Item.Group>
  </Fragment>
))}
</Fragment> */
}

{
  /* <Table celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Action</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Notes</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell><Checkbox/></Table.Cell>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>No Action</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
    
    </Table.Body>
  </Table> */
}

{
  /* <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill</Table.Cell>
        <Table.Cell>Denied</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row warning>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>No Action</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell positive>Approved</Table.Cell>
        <Table.Cell warning>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill</Table.Cell>
        <Table.Cell negative>Denied</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row> */
}
