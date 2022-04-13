import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, Card, Label } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    toogleActivate
  } = rootStore.productStore;

  const { t } = useTranslation(["shop"]);

  const handleToogleActivate = () => {
    toogleActivate(product.id, product)
  }
  
  let descriptionUiShort;
  if (product.description) {
    descriptionUiShort = product.description.substring(0, 20);
  }
  // const productTitleUiShort = product.title.substring(0, 15);

  const threeDots = "...";
  return (
    <Card raised>
      <Card.Content>
        <Card.Header style={{ textAlign: "center" }}>
          {product.title.substring(0, 15)}
        </Card.Header>
        {product.isSold && (
          <Label style={{ position: "absolute" }} color='red' corner='right'>
            {t("SOLD")}
          </Label>
        )}
        {!product.isActive && (
          <Label color='red' attached='top' style={{textAlign: 'center'}}>
            {t("INACTIVE")}
          </Label>
        )}
        <div className='ui segment'>
          <img
            className='ui centered medium image'
            src={product.photoUrl}
            alt='Product'
            
          />
        </div>

        <Card.Content extra>
          <span>{descriptionUiShort || "Description N/A"}</span>{" "}
          <span>{threeDots}</span>
        </Card.Content>
        {product.isActive ?
        <Button
          as={Link}
          to={`/product/${product.id}`}
          fluid
          content={t('View product')}
          color='instagram'
        /> :

        <Button
          onClick={()=> handleToogleActivate()}
          fluid
          content={t('Activate')}
          color='instagram'
        />
        }
      </Card.Content>
    </Card>
  );
};

export default observer(ProductListItem);
