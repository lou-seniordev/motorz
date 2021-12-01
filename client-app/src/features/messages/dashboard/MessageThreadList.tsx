import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import {
  Checkbox,
  Header,
  Table,
  Image,
  Segment,
} from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { useHistory } from "react-router";


const MessageThreadList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { messagesByDate, 
    
  } = rootStore.messageStore; //, setThread

  let history = useHistory();


  return (
    <Segment>
      {/* <Table>
      <Table.Header> <Table.Row>
        //Posible solution for 
        </Table.Row></Table.Header>
      </Table> */}
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
                <Table.Row>
                  <Table.Cell>
                    <Checkbox />
                  </Table.Cell>
                  {/* <Table.Cell>{messages[0].productTitle}</Table.Cell> */}
                  <Table.Cell
                    onClick={() => {
                      history.push(`/messageThread/${messages[0].messageThreadId}`);
                    }}
                  >
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
                  <Table.Cell
                    onClick={() => {
                      history.push(`/messageThread/${messages[0].messageThreadId}`);
                    }}
                  >
                    {messages[0].senderUsername}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => {
                      history.push(`/messageThread/${messages[0].messageThreadId}`);
                    }}
                  >
                    {messages[0].content}
                  </Table.Cell>
                  <Table.Cell
                    onClick={() => {
                      history.push(`/messageThread/${messages[0].messageThreadId}`);
                    }}
                  >
                    {messages[0].dateSent}
                  </Table.Cell>
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
