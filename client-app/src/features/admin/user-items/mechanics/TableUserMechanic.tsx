import { observer } from "mobx-react-lite";
import React, { useContext } from "react";//
import { RootStoreContext } from "../../../../app/stores/rootStore";

import { Button, Table } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { useHistory } from "react-router-dom";
import { IAdminMechanic } from "../../../../app/models/mechanic";


interface IProps {
  mechanics: IAdminMechanic[]
}

const TableUserActivity: React.FC<IProps> = ({ mechanics }) => {

  const rootStore = useContext(RootStoreContext);

  const history = useHistory();

  //, activityList
  const { showMechanicView } =
    rootStore.adminStore;

  const handleGetMechanicDetailed = (id: string) => {
    history.push(`/member/${id}/activities`);
  };

  return (
    <>
      <Table celled style={{fontSize: '0.8rem'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Publisher</Table.HeaderCell>
            <Table.HeaderCell>Owner</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Year of start</Table.HeaderCell>
            <Table.HeaderCell>Date published</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Phone</Table.HeaderCell>
            <Table.HeaderCell>Website</Table.HeaderCell>
            <Table.HeaderCell>Recommended by</Table.HeaderCell>
            <Table.HeaderCell>Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {mechanics.map((mechanic) => (
            <Table.Row
              key={mechanic.id}
              style={{ cursor: "pointer" }}
                onClick={()=> handleGetMechanicDetailed(mechanic.id)}
            >
              <Table.Cell>{mechanic.name}</Table.Cell>
              <Table.Cell>{mechanic.publisher}</Table.Cell>
              <Table.Cell>{mechanic.owner}</Table.Cell>
              <Table.Cell>{mechanic.description.slice(0, 20)}...</Table.Cell>
              <Table.Cell>{mechanic.yearOfStart}</Table.Cell>
              <Table.Cell>
                {formatDistance(new Date(mechanic.datePublished), new Date())}
              </Table.Cell>
              <Table.Cell>{mechanic.countryName}</Table.Cell>
              <Table.Cell>{String(mechanic.city)}</Table.Cell>
              <Table.Cell>{String(mechanic.address)}</Table.Cell>
              <Table.Cell>{mechanic.email !== null ? String(mechanic.email):'No info' }</Table.Cell>
              <Table.Cell>{mechanic.phone !== null ? String(mechanic.phone ):'No info'}</Table.Cell>
              <Table.Cell>{mechanic.website !== null ?  String(mechanic.website ): 'No info'}</Table.Cell>
              <Table.Cell>{String(mechanic.totalRecommended)}</Table.Cell>
              <Table.Cell>{String(mechanic.averageRating)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button fluid onClick={()=> showMechanicView(false)}>Back</Button>
    </>
  );
};

export default observer(TableUserActivity);
