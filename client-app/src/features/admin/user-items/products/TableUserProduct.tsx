import { observer } from "mobx-react-lite";
import React, { useContext } from "react";//
import { RootStoreContext } from "../../../../app/stores/rootStore";

import { Button, Table } from "semantic-ui-react";
import { formatDistance } from "date-fns";
import { useHistory } from "react-router-dom";
import { IAdminProduct } from "../../../../app/models/product";


interface IProps {
  products: IAdminProduct[]
}

const TableUserActivity: React.FC<IProps> = ({ products }) => {

  const rootStore = useContext(RootStoreContext);

  const history = useHistory();

  //, activityList
  const { showProductView } =
    rootStore.adminStore;

  const handleGetProductDetailed = (id: string) => {
    history.push(`/member/${id}/activities`);
  };

  return (
    <>
      <Table celled style={{fontSize: '0.8rem'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Model</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Brand</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>Active</Table.HeaderCell>
            <Table.HeaderCell>Sold</Table.HeaderCell>
            <Table.HeaderCell>Advertised</Table.HeaderCell>
            <Table.HeaderCell>Seen times</Table.HeaderCell>
            <Table.HeaderCell>Followed by</Table.HeaderCell>
            <Table.HeaderCell>Published on</Table.HeaderCell>
            {/* <Table.HeaderCell>Advertised on</Table.HeaderCell> */}
            {/* <Table.HeaderCell>Advertised end date</Table.HeaderCell> */}
            <Table.HeaderCell>Advertised type</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {products.map((product) => (
            <Table.Row
              key={product.id}
              style={{ cursor: "pointer" }}
                onClick={()=> handleGetProductDetailed(product.id)}
            >
              <Table.Cell>{product.title}</Table.Cell>
              <Table.Cell>{product.model}</Table.Cell>
              <Table.Cell>{product.description!==null ? product.description.slice(0, 20) : 'No info'}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.brand}</Table.Cell>
              <Table.Cell>{product.category}</Table.Cell>
              <Table.Cell>{product.city}</Table.Cell>
              <Table.Cell>{product.countryName}</Table.Cell>
              <Table.Cell>{String(product.isActive)}</Table.Cell>
              <Table.Cell>{String(product.isSold)}</Table.Cell>
              <Table.Cell>{String(product.isAdvertised)}</Table.Cell>
              <Table.Cell>{product.numberSeen}</Table.Cell>
              <Table.Cell>{product.numberFollowed}</Table.Cell>
              <Table.Cell>
                {formatDistance(new Date(product.typeAdvertising), new Date())}
              </Table.Cell>
              {/* <Table.Cell>
                {formatDistance(new Date(product.dateAdvertised), new Date())}
              </Table.Cell> */}
              {/* <Table.Cell>
                {formatDistance(new Date(product.advertisingEndDate), new Date())}
              </Table.Cell> */}
              <Table.Cell>{product.typeAdvertising ? product.typeAdvertising : 'No info'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Button fluid onClick={()=> showProductView(false)}>Back</Button>
    </>
  );
};

export default observer(TableUserActivity);
