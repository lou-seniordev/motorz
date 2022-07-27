import { formatDistance } from "date-fns";
import React, { useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import {
  Button,
  Dropdown,
  Icon,
  Input,
  Menu,
  Pagination,
  Table,
} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IMember } from "../../../app/models/member";
import { RootStoreContext } from "../../../app/stores/rootStore";

const UsersOverview = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadingMembers,
    actualPage,
    setActualPage,
    totalPages,
    memberList,
    changePage,
  } = rootStore.adminStore;

  const { countries, loadCountriesToSelect } = rootStore.countryStore;

  const history = useHistory();

  const handlePaginationChange = (e: any, data: any) => {
    setActualPage(data.activePage);
    changePage(data.activePage);
  };

  const handleGetUserDetailed = (username: string) => {
    console.log(username);
    history.push(`/member/${username}`);
  };

  //!!Warning Mem Leak
  useEffect(() => {
    loadCountriesToSelect();
  }, [loadCountriesToSelect]);

  if (loadingMembers)
    return <LoadingComponent content={"Loading members..."} />;

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
      <Menu fluid widths={3} style={{ top: "200px" }}>
        <Menu.Item>
          <Dropdown
            placeholder={"filter by country"}
            selection
            fluid
            search
            options={countries}
            // onChange={handleOnChange}
            clearable
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            placeholder={"filter by city"}
            selection
            fluid
            search
            options={countries}
            // onChange={handleOnChange}
            clearable
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            placeholder={"filter by gender"}
            selection
            fluid
            search
            options={countries}
            // onChange={handleOnChange}
            clearable
          />
        </Menu.Item>
      </Menu>
      <div className='ui three buttons'>
        <Button basic color='grey' content='Sort by Date Joined' />

        <Button color='grey' basic>
          Sort by Display Name
        </Button>
        <Button basic color='grey'>
          Sort by ...
        </Button>
      </div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>User Name</Table.HeaderCell>
            <Table.HeaderCell>Display Name</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Member Since</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {memberList.map((member) => (
            <Table.Row
              key={member.id}
              style={{ cursor: "pointer" }}
              // onClick={history.push(`/member/${member.username}`)}
              onClick={()=> handleGetUserDetailed(member.username)}
              // as={Link}
              // to={`/admin/user/${member.username}`}
            >
              <Table.Cell>{member.id}</Table.Cell>
              <Table.Cell>{member.username}</Table.Cell>
              <Table.Cell>{member.displayName}</Table.Cell>
              <Table.Cell>{member.age}</Table.Cell>
              <Table.Cell>{member.city}</Table.Cell>
              <Table.Cell>{member.country}</Table.Cell>
              <Table.Cell>{member.email}</Table.Cell>
              <Table.Cell>{formatDistance(new Date(member.joinedUs), new Date)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan='8'>
              {totalPages !== undefined && (
                <Pagination
                  // defaultActivePage={1}
                  activePage={actualPage}
                  totalPages={totalPages}
                  onPageChange={(e, data) => handlePaginationChange(e, data)}
                  ellipsisItem={{
                    content: <Icon name='ellipsis horizontal' />,
                    icon: true,
                  }}
                  firstItem={{
                    content: <Icon name='angle double left' />,
                    icon: true,
                  }}
                  lastItem={{
                    content: <Icon name='angle double right' />,
                    icon: true,
                  }}
                  prevItem={{ content: <Icon name='angle left' />, icon: true }}
                  nextItem={{
                    content: <Icon name='angle right' />,
                    icon: true,
                  }}
                />
              )}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};
export default UsersOverview;
