import { observer } from "mobx-react-lite";
import React, { useContext } from "react";//
import { RootStoreContext } from "../../../../app/stores/rootStore";

import { Button, Table } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { IAdminActivity } from "../../../../app/models/activity";
import { useHistory } from "react-router-dom";


interface IProps {
  activities: IAdminActivity[]
}

const TableUserActivity: React.FC<IProps> = ({ activities }) => {

  const rootStore = useContext(RootStoreContext);

  const history = useHistory();

  //, activityList
  const { showActivityView } =
    rootStore.adminStore;

  const handleGetActivityDetailed = (id: string) => {
    history.push(`/member/${id}/activities`);
  };

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Departure</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Destination</Table.HeaderCell>
            <Table.HeaderCell>isActive</Table.HeaderCell>
            <Table.HeaderCell>isCompleted</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {activities.map((activity) => (
            <Table.Row
              key={activity.id}
              style={{ cursor: "pointer" }}
                onClick={()=> handleGetActivityDetailed(activity.id)}
            >
              <Table.Cell>{activity.title}</Table.Cell>
              <Table.Cell>{activity.city}</Table.Cell>
              <Table.Cell>{activity.country}</Table.Cell>
              <Table.Cell>{activity.category}</Table.Cell>
              <Table.Cell>
                {formatDistance(new Date(activity.date), new Date())}
              </Table.Cell>
              <Table.Cell>{activity.departure}</Table.Cell>
              <Table.Cell>{activity.description.slice(0, 20)}</Table.Cell>
              <Table.Cell>{activity.destination}</Table.Cell>
              <Table.Cell>{String(activity.isActive)}</Table.Cell>
              <Table.Cell>{String(activity.isCompleted)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button fluid onClick={()=>showActivityView(false)}>Back</Button>
    </>
  );
};

export default observer(TableUserActivity);
