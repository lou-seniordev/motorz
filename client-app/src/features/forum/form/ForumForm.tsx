import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IForumpost } from '../../../app/models/forumpost';
import { v4 as uuid } from 'uuid';
import ForumPostStore from '../../../app/stores/forumPostStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
  id: string;
}
const ForumForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const forumPostStore = useContext(ForumPostStore);
  const {
    createForumpost,
    editForumpost,
    submitting,
    cancelFormOpen,
    forumpost: initialFormState,
    loadForumPost,
    clearForumPost,
  } = forumPostStore;

  const [forumpost, setForumpost] = useState<IForumpost>({
    id: '',
    title: '',
    category: '',
    body: '',
    dateAdded: '',
  });
  useEffect(() => {
    if (match.params.id && forumpost.id.length === 0) {
      loadForumPost(match.params.id).then(
        () => initialFormState && setForumpost(initialFormState)
      );
    }
    return () => {
      clearForumPost();
    };
  }, [
    loadForumPost,
    clearForumPost,
    match.params.id,
    initialFormState,
    forumpost.id.length,
  ]);

  const handleSubmit = () => {
    if (forumpost.id.length === 0) {
      let newForumpost = {
        ...forumpost,
        id: uuid(),
        dateAdded: new Date().toISOString(),
      };
      createForumpost(newForumpost).then(() =>
        history.push(`/forum/${newForumpost.id}`)
      );
    } else {
      editForumpost(forumpost).then(() =>
        history.push(`/forum/${forumpost.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setForumpost({ ...forumpost, [name]: value });
  };

  // if (loadingInitial) return <LoadingComponent content="Loading forum post details..."/>

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='title'
          placeholder='title'
          value={forumpost.title}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name='body'
          rows={4}
          placeholder='body'
          value={forumpost.body}
        />
        <Form.Input
          onChange={handleInputChange}
          name='category'
          placeholder='category'
          value={forumpost.category}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='submit'
        />
        <Button
          floated='right'
          type='butoon'
          content='cancel'
          onClick={cancelFormOpen}
        />
      </Form>
    </Segment>
  );
};

export default observer(ForumForm);
