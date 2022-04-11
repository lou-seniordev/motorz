import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Label, Segment } from "semantic-ui-react";
import { ForumpostFormValues } from "../../../app/models/forumpost";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { category } from "../../../app/common/options/forumCategoryOptions";

import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";

import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from "revalidate";
import SelectInput from "../../../app/common/form/SelectInput";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { useTranslation } from "react-i18next";



interface DetailParams {
  id: string;
}
const ForumForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { createForumpost, editForumpost, submitting, loadForumPost } =
    rootStore.forumPostStore;

  const { user } = rootStore.userStore;
  const { addFeedItem } = rootStore.feedStore;

  const [editMode, setEditMode] = useState(false);

  const [forumpost, setForumpost] = useState(new ForumpostFormValues());
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(["forms"]);
  const validate = combineValidators({
    title: isRequired({ message: t("Title is required") }),
    category: isRequired({ message: t("Category is required") }),
    body: composeValidators(
      isRequired({ message: t("Description is required") }),
      hasLengthGreaterThan(4)({
        message: t("Description needs to be at least 5 characters"),
      })
    )(),
  });

  useEffect(() => {
    if (match.params.id) {
      setEditMode(true);

      setLoading(true);
      loadForumPost(match.params.id)
        .then((forumpost) => setForumpost(new ForumpostFormValues(forumpost)))
        .finally(() => setLoading(false));
    }
  }, [loadForumPost, match.params.id, setEditMode]);

  const handleFinalFormSubmit = (values: any) => {
    let newId = uuid();
    const { ...forumpost } = values;
    if (!forumpost.id) {
      let newForumpost = {
        ...forumpost,
        id: newId,
        dateAdded: new Date().toISOString(),
        displayName: user?.displayName,
        userName: user?.userName,
      };
      createForumpost(newForumpost);
      addFeedItem(newId, "Added Forumpost");
    } else {
      editForumpost(forumpost);
    }
  };

  // if (loadingInitial) return <LoadingComponent content="Loading forum post details..."/>

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column 
      // width={10}
      computer={10} mobile={16}
      >
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={forumpost}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                {editMode && <Label content={t('Title')} />}

                <Field
                  placeholder={t('Title')}
                  name='title'
                  value={forumpost.title}
                  component={TextInput}
                />
                {editMode && <Label content={t('Body')} />}

                <Field
                  placeholder={t('Body')}
                  name='body'
                  rows={4}
                  value={forumpost.body}
                  component={TextAreaInput}
                />
                {editMode && <Label content={t('Category')} />}

                <Field
                  placeholder={t('Category')}
                  name='category'
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
                  content={t('Submit')}
                />
                <Button
                  floated='right'
                  disabled={loading}
                  type='button'
                  content={t('Cancel')}
                  onClick={
                    forumpost.id
                      ? () => history.push(`/forum/${forumpost.id}`)
                      : () => history.push("/forum")
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
