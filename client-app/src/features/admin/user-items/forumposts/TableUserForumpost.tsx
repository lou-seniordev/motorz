import { observer } from "mobx-react-lite";
import React, { useContext } from "react";//
import { RootStoreContext } from "../../../../app/stores/rootStore";

import { Button, Table } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { useHistory } from "react-router-dom";
import { IAdminForumpost } from "../../../../app/models/forumpost";


interface IProps {
  forumposts: IAdminForumpost[]
}

const TableUserActivity: React.FC<IProps> = ({ forumposts }) => {

  const rootStore = useContext(RootStoreContext);

  const history = useHistory();

  // //, activityList
  const { showForumpostView } =
    rootStore.adminStore;

  const handleGetForumpostDetailed = (id: string) => {
    history.push(`/member/${id}/activities`);
  };

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Author</Table.HeaderCell>
            <Table.HeaderCell>Body</Table.HeaderCell>
            {/* <Table.HeaderCell>Date</Table.HeaderCell> */}
            <Table.HeaderCell>Date Added</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Rating</Table.HeaderCell>
            
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {forumposts.map((forumpost) => (
            <Table.Row
              key={forumpost.id}
              style={{ cursor: "pointer" }}
                onClick={()=> handleGetForumpostDetailed(forumpost.id)}
            >
              <Table.Cell>{forumpost.title}</Table.Cell>
              <Table.Cell>{forumpost.displayName}</Table.Cell>
              <Table.Cell>{forumpost.body.slice(0, 20)}...</Table.Cell>
              <Table.Cell>
                {formatDistance(new Date(forumpost.dateAdded), new Date())}
              </Table.Cell>
              <Table.Cell>{forumpost.category}</Table.Cell>
              <Table.Cell>{forumpost.forumpostRating}</Table.Cell>

            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button fluid onClick={()=> showForumpostView(false)}>Back</Button>
    </>
  );
};

export default observer(TableUserActivity);
