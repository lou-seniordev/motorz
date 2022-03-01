import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Image, Item, Segment } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  let descriptionUiShort;
  if (product.description) {
    descriptionUiShort = product.description.substring(0, 20);
  }
  const productTitleUiShort = product.title.substring(0, 15);

  const threeDots = "...";
  return (
    // <Segment clearing>

    // <Item.Group divided>
    //   <Item>
    //     <Item.Image size='tiny' src={product.photoUrl} />

    //     <Item.Content>
    //       <Item.Header as='a'>{product.title}</Item.Header>
    //       <Item.Meta>Description</Item.Meta>
    //       <Item.Description>{product.description}</Item.Description>
    //       <Item.Extra>
    //         Additional Details
    // <Button
    //   as={Link}
    //   to={`/product/${product.id}`}
    //   floated='right'
    //   content='view'
    //   color='blue'
    // />
    //       </Item.Extra>
    //     </Item.Content>
    //   </Item>
    // </Item.Group>
    // </Segment>

    <Card>
      <Card.Content>
        <Card.Header style={{ textAlign: "center" }}>
          {productTitleUiShort}
          {/* {member.displayName || "display name"} */}
        </Card.Header>
      
      <Image>
        <div className='ui segment'>
          <img className='ui centered medium image' style={{height:'100px'} }src={product.photoUrl} />
        </div>
      </Image>


        <Card.Meta>{/* {member.followersCount} Followers */}</Card.Meta>

        <Card.Description style={{ color: "green" }}>
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
