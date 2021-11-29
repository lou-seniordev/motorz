import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductDetailedInfo from "./ProductDetailedInfo";

interface DetailParams {
  id: string;
}
const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    product,
    loadProduct,
    loadingInitial,

  } = rootStore.productStore;


  // const { user } = rootStore.userStore;

  useEffect(() => {
    loadProduct(match.params.id); 

  }, [loadProduct, match.params.id]); 

  if (loadingInitial || !product )
    return <LoadingComponent content='Loading product details...' />;

  return (
    <Grid>
      <Grid.Column width={9}>
        <ProductDetailedInfo product={product} />
      </Grid.Column>
      
        <Grid.Column width={7}>
          <h1>This is your product</h1>
          <h2>Some statistics?</h2>
        </Grid.Column>
      {/* )} */}
    </Grid>
  );
};

export default observer(ProductDetails);
