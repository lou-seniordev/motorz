import { observer } from "mobx-react-lite";
import React, { useContext } from "react";//
import { RootStoreContext } from "../../../../app/stores/rootStore";

import { Button, Table } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { useHistory } from "react-router-dom";
import { IAdminMotofy } from "../../../../app/models/motofy";


interface IProps {
  motofies: IAdminMotofy[]
}

const TableUserMotofy: React.FC<IProps> = ({ motofies }) => {

  const rootStore = useContext(RootStoreContext);

  const history = useHistory();

  //, activityList
  const { showMotofyView } =
    rootStore.adminStore;

  const handleGetMotofyDetailed = (id: string) => {
    history.push(`/member/${id}/activities`);
  };

  return (
    <>
      <Table celled>
       <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Publisher</Table.HeaderCell>
            <Table.HeaderCell>Brand</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>CC</Table.HeaderCell>
            {/* <Table.HeaderCell>Description</Table.HeaderCell> */}
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell>Published</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Paid</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
            <Table.HeaderCell>Km</Table.HeaderCell>
            <Table.HeaderCell>Times embraced</Table.HeaderCell>
            <Table.HeaderCell>Average Rating</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {motofies.map((motofy) => (
            <Table.Row
              key={motofy.id}
              style={{ cursor: "pointer" }}
                onClick={()=> handleGetMotofyDetailed(motofy.id)}
            >
              <Table.Cell>{motofy.name}</Table.Cell>
              <Table.Cell>{motofy.publisherDisplayName}</Table.Cell>
                <Table.Cell>{motofy.brandName}</Table.Cell>
                <Table.Cell>{motofy.model}</Table.Cell>
                <Table.Cell>{motofy.cubicCentimeters}</Table.Cell>
                {/* <Table.Cell>{motofy.description || 'N/A'}</Table.Cell> */}
                <Table.Cell>{String(motofy.yearOfProduction)}</Table.Cell>
                <Table.Cell>
                {
                // formatDistance(new Date(
                  motofy.datePublished
                  // ), new Date())
                  }
              </Table.Cell>
              <Table.Cell>{motofy.city}</Table.Cell>
              <Table.Cell>{motofy.countryName}</Table.Cell>
                <Table.Cell>{String(motofy.pricePaid)}</Table.Cell>
                <Table.Cell>{String(motofy.estimatedValue)}</Table.Cell>
                <Table.Cell>{String(motofy.numberOfKilometers)}</Table.Cell>
                <Table.Cell>{String(motofy.totalEmbraced)}</Table.Cell>
                <Table.Cell>{String(motofy.averageRating)}</Table.Cell>
            
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button fluid onClick={()=>showMotofyView(false)}>Back</Button>
    </>
  );
};

export default observer(TableUserMotofy);
