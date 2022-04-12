import React, { Fragment, useContext, useEffect } from 'react';
import { Segment, Header, Form, Button, Comment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import { Form as FinalForm, Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import { observer } from 'mobx-react-lite';
import { formatDistance } from 'date-fns';
import { useTranslation } from "react-i18next";


const ActivityDetailedChat = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    createHubConnection,
    stopHubConnection,
    addComment,
    activity,
  } = rootStore.activityStore;

  const { t } = useTranslation(["comments"]);


  useEffect(() => {
    createHubConnection(activity!.id);
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection, activity]);

  return (
    <Fragment>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>{t("Comment This Diary")}</Header>
      </Segment>
      <Segment attached>
        <Comment.Group style={{maxWidth:'none'}}>
          {activity &&
            activity.comments &&
            activity.comments.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || '/assets/user.png'} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.username}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                  <div>
                      {formatDistance(
                        new Date(comment.createdAt),
                        new Date()
                      )}
                    </div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form, pristine }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field 
                name='body'
                component={TextAreaInput}
                rows={2}
                placeholder={t('Add your comment')}
                />
                <Button
                  content={t('Add Reply')}
                  labelPosition='left'
                  icon='edit'
                  fluid
                  color='instagram'
                  loading={submitting}
                  disabled={pristine}
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedChat);
