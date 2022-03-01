import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  let descriptionUiShort;
  if (product.description) {
    descriptionUiShort = product.description.substring(0, 20);
  }
  const productTitleUiShort = product.title.substring(0, 15);

  const threeDots = "...";
  return (

    <Card>
      <Card.Content>
        <Card.Header style={{ textAlign: "center" }}>
          {productTitleUiShort}
        </Card.Header>
        <Image>
          <div className='ui segment'>
            <img
              className='ui centered medium image'
              style={{ height: "100px" }}
              src={product.photoUrl}
              alt='Product'
            />
          </div>
        </Image>
        {/* style={{ color: "green" }} */}
        <Card.Description>
          <span>{descriptionUiShort || "Description N/A"}</span>{" "}
          <span>{threeDots}</span>
        </Card.Description>
        <Button
          as={Link}
          to={`/product/${product.id}`}
          fluid
          content='View product'
          color='blue'
        />
      </Card.Content>
    </Card>
  );
};

export default observer(ProductListItem);
