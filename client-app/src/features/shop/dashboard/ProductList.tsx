import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Card, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductListItem from "./ProductListItem";

const ProductList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { productsByDate } = rootStore.productStore;

  return (
    <Grid>
      <Grid.Column width={16}>
        <Card.Group itemsPerRow={4}>
          {productsByDate.map((product) => (
            <ProductListItem product={product} key={product.id} />
          ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductList);
