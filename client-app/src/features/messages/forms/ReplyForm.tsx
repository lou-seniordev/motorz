import React, { useContext,  useEffect,  useState } from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Form as FinalForm, Field } from "react-final-form";
import TextAreaInput from "../../../app/common/form/TextAreaInput";

import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  hasLengthLessThan,
  isRequired,
} from "revalidate";

import { RootStoreContext } from "../../../app/stores/rootStore";



const validate = combineValidators({
  content: composeValidators(
    isRequired("Body"),
    hasLengthGreaterThan(1)({
      message: "Body needs to be at least 2 characters",
    }),
    hasLengthLessThan(255)({
      message: "Maximum number of characters is 255"
    })
  )(),
});

const ReplyForm: React.FC<{ messageThreadId: string }> = ({ messageThreadId }) => {
// const ReplyForm = () => {
    const rootStore = useContext(RootStoreContext);

    const { sendReply, setContent, createHubConnection, stopHubConnection} = rootStore.messageStore;
    const {closeModal} = rootStore.modalStore
    

    const [loading] = useState(false);//, setLoading

 

    const handleFinalFormSubmit = (values: any) => {
      console.log(messageThreadId)
      setContent(values.content)
      sendReply();
    };

    useEffect(() => {
      // console.log(messageThreadId)
      createHubConnection(messageThreadId);
     return () => {
       stopHubConnection(messageThreadId);
     };
   }, 
   [
    createHubConnection, stopHubConnection, 
    messageThreadId]
   );

  
    return (
      
        <Grid>
          <Grid.Column width={16}>
            <FinalForm
              validate={validate}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} 
                loading={loading}>
                  
                <Header as='h2' content='Reply to sender' color='teal' textAlign='center'/>
                  <Field
                    name='content'
                    rows={4}
                    placeholder='content'
                    component={TextAreaInput}
                  />
                  <Button
                      // loading={submitting}loading ||
                    disabled={ invalid || pristine}
                    floated='right'
                    color='teal'
                    type='submit'
                    content='send'
                  />
                  <Button
                  floated='right'
                  disabled={loading}
                  type='button'
                  content='cancel'
                  onClick={
                    () => closeModal()
                  }
                />
                </Form>
              )}
            />
          </Grid.Column>
        </Grid>
    );
  };

export default observer(ReplyForm);
