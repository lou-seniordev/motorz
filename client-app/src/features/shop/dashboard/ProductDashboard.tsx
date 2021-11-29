import React, { useContext, useEffect } from "react";
import { Grid, Sticky } from "semantic-ui-react";
import ProductList from "./ProductList";

// import LoadingComponent from "../../../app/layout/LoadingComponent";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductSidebar from "./ProductSidebar";

const ProductDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadProducts } = rootStore.productStore;//, loadingInitial

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <Grid>
      <Grid.Column width={9}>
        <ProductList />
      </Grid.Column>
      <Grid.Column width={7}>
        <Sticky style={{ marginRight: 30, position: "fixed" }}>
          <ProductSidebar />
        </Sticky>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductDashboard);
