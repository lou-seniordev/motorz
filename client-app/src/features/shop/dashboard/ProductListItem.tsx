import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Item } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Item.Group divided>
      <Item>
        <Item.Image size='tiny' src={product.photoUrl} />

        <Item.Content>
          <Item.Header as='a'>{product.title}</Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description>{product.description}</Item.Description>
          <Item.Extra>
            Additional Details
            <Button
              as={Link}
              to={`/product/${product.id}`}
              floated='right'
              content='view'
              color='blue'
            />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
};

export default observer(ProductListItem);
