import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { ForumpostFormValues } from '../../../app/models/forumpost';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { category } from '../../../app/common/options/forumCategoryOptions';

import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';

import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from 'revalidate';
import SelectInput from '../../../app/common/form/SelectInput';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired('Category'),
  body: composeValidators(
    isRequired('Body'),
    hasLengthGreaterThan(4)({
      message: 'Body needs to be at least 5 characters',
    })
  )()
});

interface DetailParams {
  id: string;
}
const ForumForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  // const {forumpostsByDate } = rootStore.forumPostStore;

  const {
    createForumpost,
    editForumpost,
    submitting,
    loadForumPost,
  } = rootStore.forumPostStore;

  const { user } = rootStore.userStore;
  const { addFeedItem } = rootStore.feedStore;


  const [forumpost, setForumpost] = useState(new ForumpostFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadForumPost(match.params.id)
        .then((forumpost) => setForumpost(new ForumpostFormValues(forumpost)))
        .finally(() => setLoading(false));
    }
  }, [loadForumPost, match.params.id]);


  const handleFinalFormSubmit = (values: any) => {
    let newId = uuid();
    const {...forumpost} = values;
  if (!forumpost.id) {
      let newForumpost = {
        ...forumpost,
        id: newId,
        dateAdded: new Date().toISOString(),
        displayName: user?.displayName,
        userName: user?.userName
      };
      createForumpost(newForumpost);
      addFeedItem(newId, 'Added Forumpost');
    } else {
      editForumpost(forumpost);
    }
  };

  // if (loadingInitial) return <LoadingComponent content="Loading forum post details..."/>

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
          validate={validate}
            initialValues={forumpost}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name='title'
                  placeholder='Title'
                  value={forumpost.title}
                  component={TextInput}
                />
                <Field
                  // onChange={handleInputChange}
                  name='body'
                  rows={4}
                  placeholder='Body'
                  value={forumpost.body}
                  component={TextAreaInput}
                />
                <Field
                  name='category'
                  placeholder='Category'
                  options={category}
                  value={forumpost.category}
                  component={SelectInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated='right'
                  positive
                  type='submit'
                  content='submit'
                />
                <Button
                  floated='right'
                  disabled={loading}
                  type='button'
                  content='cancel'
                  onClick={
                    forumpost.id
                      ? () => history.push(`/forum/${forumpost.id}`)
                      : () => history.push('/forum')
                  }
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ForumForm);
