import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Image, Label } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';

import ForumPostStore from '../../../app/stores/forumPostStore';

interface DetailParams {
  id: string
}
const ForumDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
  const forumpostStore = useContext(ForumPostStore);
  const {
    forumpost,
    loadForumPost,
    loadingInitial
  } = forumpostStore;

  useEffect(()=> {
    loadForumPost(match.params.id)
  }, [loadForumPost, match.params.id])
  if (loadingInitial || !forumpost) return <LoadingComponent content="Loading forum post details..."/> 

  return (
    <Card fluid>
      <Image
        src={`/assets/forumCategoryImages/${forumpost!.category}.jpg`}
        wrapped
        ui={false}
      />

      <Card.Content>
        <Card.Header>{forumpost!.title}</Card.Header>
        <Label>{forumpost!.category}</Label>
        <Card.Meta>
          <span>{forumpost!.dateAdded}</span>
        </Card.Meta>
        <Card.Description>{forumpost!.body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color='blue'
            content='edit'
            as={Link} to={`/manageForum/${forumpost.id}`}
          />
          <Button
            basic
            color='grey'
            content='cancel'
            onClick={()=> history.push('/forum')}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ForumDetails);
