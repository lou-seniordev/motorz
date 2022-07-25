import { toJS } from "mobx";
import React, { useContext } from "react";
import { Icon, Input, Menu, Table } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IMember } from "../../../app/models/member";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface RouteParams {
  memberList: IMember[];
}
const UsersOverview: React.FC<RouteParams> = ({ memberList }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadingMembers } = rootStore.adminStore;

  if (loadingMembers)
    return <LoadingComponent content={"Loading profile..."} />;
  console.log(toJS(memberList));
  return (
    <>
      <Input
        name='search'
        fluid
        //   placeholder={t('Search all')}
        placeholder={"Search all"}
        //   value={input}
        //   onInput={(e: any) => setInput(e.target.value)}
        //   onKeyDown={(e: any) => handleSearchResults(e)}
      />
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>User Name</Table.HeaderCell>
            <Table.HeaderCell>Display Name</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {(memberList).map((member) => (
            <Table.Row key={member.id} >
              <Table.Cell>{member.id}</Table.Cell>
              <Table.Cell>{member.username}</Table.Cell>
              <Table.Cell>{member.displayName}</Table.Cell>
              <Table.Cell>{member.city}</Table.Cell>
              <Table.Cell>{member.country}</Table.Cell>
              <Table.Cell>{member.email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='chevron left' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='chevron right' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};
export default UsersOverview;
