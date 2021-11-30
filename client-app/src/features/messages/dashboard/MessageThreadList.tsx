import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Checkbox, Item, Table } from "semantic-ui-react"; 
import { RootStoreContext } from "../../../app/stores/rootStore";
import MessageThreadListItem from "./MessageThreadListItem";

const MessageThreadList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { messagesByDate } = rootStore.messageStore;

  return (
    <Fragment>
      {messagesByDate.map(([group, messages]) => (
        <Fragment key={group}>
          {/* <Segment clearing> */}
          {/* <Label key={group} size='mini' color='teal'>{group}</Label> */}
          <Item.Group>
            <MessageThreadListItem message={messages[0]} messages={messages} />
          </Item.Group>
          {/* </Segment> */}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(MessageThreadList);





{/* <Table celled selectable>
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
  </Table> */}

  {/* <Table.Row>
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
      </Table.Row> */}