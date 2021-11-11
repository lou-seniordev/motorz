import { toJS } from 'mobx';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { IProduct } from '../../../app/models/product';

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <Segment.Group>
      <Segment clearing>
        <Item>
        {/* <Item.Image size='tiny' src={`/assets/forumCategoryImages/${product.pictureUrl}.jpg`} /> */}
            <Item.Header as='a'>{product.title}</Item.Header>
            <Item.Content>
                  <Label basic content={product.category} /> 
              <Item.Meta>{product.datePublished}</Item.Meta>
  
              <Item.Description>Posted by Bob</Item.Description>
              <Item.Description>
                <div>{product.description}</div>
              </Item.Description>
  
            
              <Item.Extra>
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
          {/* 
      </Segment>
      <Segment>
          <Icon name='clock' /> {product.datePublished}
      </Segment>
      <Segment secondary>
        {/* 12 Responses from 3 Members */}
      </Segment>
      
    </Segment.Group>
  );
};

export default ProductListItem;
