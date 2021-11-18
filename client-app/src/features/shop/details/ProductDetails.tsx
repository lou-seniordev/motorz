import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductMessagesPage from "../productMessages/ProductMessagesPage";
import ProductDetailedInfo from "./ProductDetailedInfo";

interface DetailParams {
  id: string;
}
const ProductDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { product, loadProduct, loadingInitial } = rootStore.productStore;

  useEffect(() => {
    loadProduct(match.params.id);
  }, [loadProduct, match.params.id]);

  if (loadingInitial || !product)
    return <LoadingComponent content='Loading forum post details...' />;

  return (
    <Grid>
      <Grid.Column width={9}>
        <ProductDetailedInfo product={product}/>
      </Grid.Column>
      <Grid.Column width={7}>
        <ProductMessagesPage/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductDetails);
