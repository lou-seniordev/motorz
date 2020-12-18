import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import ForumPostStore  from '../../../app/stores/forumPostStore';


const ForumList: React.FC= () => {

  const forumpostStore = useContext(ForumPostStore);
  const {forumpostsByDate, deleteForumpost, submitting, target} = forumpostStore;   //selectForum,
  
  return (
    <Segment clearing>
      <Item.Group divided>
        {forumpostsByDate.map((forumpost) => (
          <Item key={forumpost.id}>
            <Item.Content>
              <Item.Header as='a'>{forumpost.title}</Item.Header>
              <Item.Meta>{forumpost.dateAdded}</Item.Meta>

              <Item.Description>
                <div>{forumpost.body}</div>
              </Item.Description>

              <Item.Description>
                <div>Just to compare {forumpost.id}</div>
              </Item.Description>

              <Item.Extra>
                <Button
                  as={Link} to={`/forum/${forumpost.id}`}
                  floated='right'
                  content='view'
                  color='blue'
                />
                <Button
                  name={forumpost.id}
                  loading={target === forumpost.id && submitting}
                  onClick={(e) => deleteForumpost(e, forumpost.id)}
                  floated='right'
                  content='delete'
                  color='red'
                />
                <Label basic content={forumpost.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ForumList);
