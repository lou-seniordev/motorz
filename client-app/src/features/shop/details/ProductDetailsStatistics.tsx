import { formatDistance } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Header, Icon, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IProduct } from "../../../app/models/product";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ProductDetailsStatistics: React.FC<{ product: IProduct }> = ({
  product,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {

    loadingInitial,
    visitCounter,
  } = rootStore.productStore;

  const { t } = useTranslation(["shop"]);

  useEffect(() => {
    visitCounter(product.id);
  }, [product, visitCounter]);

  if (loadingInitial || !product)
    return <LoadingComponent content={t('Loading product details...')} />;

  return (
    <Segment raised>
      <Header as='h2' icon textAlign='center'>
        <Icon name='shopping basket' circular />
        <Header.Content>{product.title}</Header.Content>
        <Header sub>
          {t("The")} {product.title} {t("is published")}{" "}
          {formatDistance(new Date(product.datePublished), new Date(), {
            addSuffix: true,
          })}
          , {t("seen")} {product.numberSeen} {t("times and expires")} {" "} 
          {formatDistance(new Date(product.inactivityExpirationDate), new Date(), {
            addSuffix: true,
          })}
           
        </Header>

        <Header.Subheader>
          {product.numberFollowed !== 0 &&
            t("The") +
              product.title +
              t("is in favorites of") +
              (product.numberFollowed > 1
                ? product.numberFollowed + t("people")
                : product.numberFollowed + t("person"))}
        </Header.Subheader>
      </Header>
    </Segment>
  );
};

export default observer(ProductDetailsStatistics);
