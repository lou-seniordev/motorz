import { formatDistance } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Form, Button, Comment } from 'semantic-ui-react';
import { Form as FinalForm, Field } from "react-final-form";
import { RootStoreContext } from '../../../app/stores/rootStore';
import TextAreaInput from '../../../app/common/form/TextAreaInput';


const MechanicDetailedChat= () => {

    const rootStore = useContext(RootStoreContext);
    const {
      createHubConnection,
      stopHubConnection,
      addComment,
      mechanic,
    } = rootStore.mechanicStore;

    const connectionArgument = 'RecieveMechanicComment';
    useEffect(() => {
  
      createHubConnection(mechanic!.id, connectionArgument);//, mechanic!
      return () => {
        stopHubConnection();
      };
    }, [createHubConnection, stopHubConnection, mechanic]);
  
    
  return (
    <>
    
    <Segment
      textAlign='center'
      attached='top'
      inverted
      color='teal'
      style={{ border: "none" }}
    >
      <Header>Chat about this mechanic</Header>
    </Segment>
    <Segment attached >
      <Comment.Group style={{maxWidth:'none'}}>
        {mechanic &&
          mechanic.commentMechanics &&
          mechanic.commentMechanics.map((comment) => (
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
                  {' '}ago
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
                placeholder='Add your comment'
               
              />
              <Button
                content='Add Reply'
                labelPosition='left'
                icon='edit'
                color='instagram'
                loading={submitting}
                fluid
                disabled={pristine}
              />
            </Form>
          )}
        />
      </Comment.Group>
    </Segment>
  </>
  );
};

export default observer(MechanicDetailedChat);
