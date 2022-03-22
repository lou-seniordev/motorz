import { formatDistance } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
// import { RouteComponentProps } from "react-router-dom";
import { Header, Icon, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IProduct } from "../../../app/models/product";
import { RootStoreContext } from "../../../app/stores/rootStore";
// import ProductDetailedInfo from "./ProductDetailedInfo";

// interface DetailParams {
//   id: string;
// }
const ProductDetailsStatistics: React.FC<{ product: IProduct }> = ({
  product,
}) => {
  // ) => {
  const rootStore = useContext(RootStoreContext);
  const {
    // product,
    // loadProduct,
    loadingInitial,
    visitCounter,
  } = rootStore.productStore;

  useEffect(() => {
    // loadProduct(match.params.id);
    visitCounter(product.id);
  }, [product, visitCounter]);

  if (loadingInitial || !product)
    return <LoadingComponent content='Loading product details...' />;

  return (
    <Segment raised>
      <Header as='h2' icon textAlign='center'>
        <Icon name='shopping basket' circular />
        <Header.Content>{product.title}</Header.Content>
        <Header sub>
          The {product.title} is published{" "}
          {formatDistance(new Date(product.datePublished), new Date(), {
            addSuffix: true,
          })}
          , seen {product.numberSeen} times, and active 10 more days
        </Header>

        <Header.Subheader>
          {product.numberFollowed !== 0 &&
            "The " +
              product.title +
              " is in favorites of " +
              (product.numberFollowed > 1
                ? product.numberFollowed + " people"
                : product.numberFollowed + " person")}
        </Header.Subheader>
      </Header>
    </Segment>
  );
};

export default observer(ProductDetailsStatistics);
