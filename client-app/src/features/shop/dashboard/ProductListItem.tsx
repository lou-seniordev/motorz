import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { IForumpost } from '../../../app/models/forumpost';
import { IProduct } from '../../../app/models/products';

const ProductListItem: React.FC<{ product: IProduct }> = ({ product }) => {
    console.log('product: ', product)
  return (
    <Segment.Group>
      <Segment>
        <Item>
            <Item.Header as='a'>{product.title}</Item.Header>
          {/* <Item.Image size='tiny' src={`/assets/forumCategoryImages/${forumpost.category}.jpg`} />
          <Item.Content>
            <Item.Meta>{forumpost.dateAdded}</Item.Meta>

            <Item.Description>Posted by Bob</Item.Description>
            <Item.Description>
              <div>{forumpost.body}</div>
            </Item.Description>

            <Item.Description>
              <div>Just to compare {forumpost.id}</div>
            </Item.Description>

            <Item.Extra>
              <Button
                as={Link}
                to={`/forum/${forumpost.id}`}
                floated='right'
                content='view'
                color='blue'
              />
              <Label basic content={forumpost.category} /> 
            </Item.Extra>
          </Item.Content> */}
        </Item>
      </Segment>
      <Segment>
          {/* <Icon name='clock' /> {forumpost.dateAdded} */}
      </Segment>
      <Segment secondary>
        {/* 12 Responses from 3 Members */}
      </Segment>
      
    </Segment.Group>
  );
};

export default ProductListItem;
