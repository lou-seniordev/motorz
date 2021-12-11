import React, { Fragment, useContext, useEffect } from "react";
import { Segment, Header, Form, Button, Comment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import { Link } from "react-router-dom";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { observer } from "mobx-react-lite";
import { formatDistance } from "date-fns";

const GaleryDetailedChat = () => {
  const rootStore = useContext(RootStoreContext);
  const { createHubConnection, stopHubConnection, addComment, motofy } =
    rootStore.motofyStore;

  const connectionArgument = "RecieveMotofyComment";
  useEffect(() => {
    // console.log('motofy', motofy)

    createHubConnection(motofy!.id, connectionArgument); //, motofy!
    return () => {
      stopHubConnection();
    };
  }, [createHubConnection, stopHubConnection, motofy]);

  return (
    <Fragment>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: "none" }}
      >
        <Header>Chat about this motofy</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          {motofy &&
            motofy.commentMotofies &&
            motofy.commentMotofies.map((comment) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.image || "/assets/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.username}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>
                      {formatDistance(new Date(comment.createdAt), new Date())}
                    </div>
                    {/* <div>{formatDistance(comment.createdAt, new Date())}</div> */}
                  </Comment.Metadata>
                  <Comment.Text>{comment.body}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}
          <FinalForm
            onSubmit={addComment}
            render={({ handleSubmit, submitting, form }) => (
              <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                <Field
                  name='body'
                  component={TextAreaInput}
                  rows={2}
                  placeholder='Add your comment'
                />
                <Button
                  content='Add Reply'
                  labelPosition='left'
                  icon='edit'
                  primary
                  loading={submitting}
                />
              </Form>
            )}
          />
        </Comment.Group>
      </Segment>
      {/* <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src='/assets/user.png' />
            <Comment.Content>
              <Comment.Author as='a'>Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar src='/assets/user.png' />
            <Comment.Content>
              <Comment.Author as='a'>Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>5 days ago</div>
              </Comment.Metadata>
              <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <Form.TextArea />
            <Button
              content='Add Reply'
              labelPosition='left'
              icon='edit'
              primary
            />
          </Form>
        </Comment.Group>
      </Segment> */}
    </Fragment>
  );
};

export default observer(GaleryDetailedChat);
