import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Card, Grid, Item } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductListItem from "./ProductListItem";

const ProductList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { 
    productsByDate, 
   } =
    rootStore.productStore;

  return (
    // <Fragment>
    //   <Item.Group divided>
        // {productsByDate.map((product) => (
        //   <ProductListItem product={product} key={product.id} />
        // ))}
    //   </Item.Group>
    // </Fragment>
    <Grid>
    <Grid.Column width={16}>
      <Card.Group itemsPerRow={4}>
        {/* {displayPeople.map((member) => (
          <PeopleListItem member={member} key={member.id} />
        ))} */}
        {productsByDate.map((product) => (
          <ProductListItem product={product} key={product.id} />
        ))}
      </Card.Group>
    </Grid.Column>
  </Grid>
  );
};

export default observer(ProductList);
