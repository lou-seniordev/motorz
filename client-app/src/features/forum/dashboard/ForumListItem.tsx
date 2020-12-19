import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { IForumpost } from '../../../app/models/forumpost';

const ForumListItem: React.FC<{ forumpost: IForumpost }> = ({ forumpost }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item>
          <Item.Image size='tiny' circular src={`/assets/forumCategoryImages/${forumpost.category}.jpg`} />
          <Item.Content>
            <Item.Header as='a'>{forumpost.title}</Item.Header>
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
          </Item.Content>
        </Item>
      </Segment>
      <Segment>
          <Icon name='clock' /> {forumpost.dateAdded}
      </Segment>
      <Segment secondary>
        12 Responses from 3 Members
      </Segment>
      
    </Segment.Group>
  );
};

export default ForumListItem;
