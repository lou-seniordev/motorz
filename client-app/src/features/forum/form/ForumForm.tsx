import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { ForumpostFormValues } from '../../../app/models/forumpost';
import { v4 as uuid } from 'uuid';
import ForumPostStore from '../../../app/stores/forumPostStore';
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
  const forumPostStore = useContext(ForumPostStore);
  const {
    createForumpost,
    editForumpost,
    submitting,
    // cancelFormOpen,
    // forumpost: initialFormState,
    loadForumPost,
    // clearForumPost,
  } = forumPostStore;

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


  // const handleInputChange = (
  //   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = event.currentTarget;
  //   setForumpost({ ...forumpost, [name]: value });
  // };

  const handleFinalFormSubmit = (values: any) => {
    const {...forumpost} = values;
  if (!forumpost.id) {
      let newForumpost = {
        ...forumpost,
        id: uuid(),
        dateAdded: new Date().toISOString(),
      };
      createForumpost(newForumpost)
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
                  placeholder='title'
                  value={forumpost.title}
                  component={TextInput}
                />
                <Field
                  // onChange={handleInputChange}
                  name='body'
                  rows={4}
                  placeholder='body'
                  value={forumpost.body}
                  component={TextAreaInput}
                />
                <Field
                  name='category'
                  placeholder='category'
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
