import { toJS } from "mobx";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment, Image } from "semantic-ui-react";
import { IProduct } from "../../../app/models/product";

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    // <Segment.Group>
    //   <Segment clearing>
    //     <Item>
    //     {/* <Item.Image size='tiny' src={`/assets/forumCategoryImages/${product.pictureUrl}.jpg`} /> */}
    //         <Item.Header as='a'>{product.title}</Item.Header>
    //         <Item.Content>
    //               <Label basic content={product.category} />
    //           <Item.Meta>{product.datePublished}</Item.Meta>
    //           <Item.Description>Posted by Bob</Item.Description>
    //           <Item.Description>
    //             <div>{product.description}</div>
    //           </Item.Description>
    //           <Item.Extra>
    //             <Button
    //               as={Link}
    //               to={`/product/${product.id}`}
    //               floated='right'
    //               content='view'
    //               color='blue'
    //             />
    //           </Item.Extra>
    //         </Item.Content>
    //         </Item>
    //   </Segment>
    // </Segment.Group>
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

      {/* <Item>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header as='a'>Header</Item.Header>
        <Item.Meta>Description</Item.Meta>
        <Item.Description>
          <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item> */}
    </Item.Group>
  );
};

export default ProductListItem;

{
  /* 
</Segment>
<Segment>
<Icon name='clock' /> {product.datePublished}
</Segment>
<Segment secondary>
{/* 12 Responses from 3 Members */
}
