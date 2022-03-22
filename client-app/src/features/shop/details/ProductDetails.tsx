import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductDetailedInfo from "./ProductDetailedInfo";
import ProductDetailsStatistics from "./ProductDetailsStatistics";

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
    visitCounter
  } = rootStore.productStore;



  useEffect(() => {
    loadProduct(match.params.id); 
    visitCounter(match.params.id);
  }, [loadProduct, match.params.id, visitCounter]); 

  if (loadingInitial || !product )
    return <LoadingComponent content='Loading product details...' />;

  return (
    <Grid>
      <Grid.Row>
          <Grid.Column width={16}>
         
          <ProductDetailsStatistics product={product}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>

      <Grid.Column width={16}>
        <ProductDetailedInfo product={product} />
      </Grid.Column>
      </Grid.Row>
      
      
    </Grid>
  );
};

export default observer(ProductDetails);
