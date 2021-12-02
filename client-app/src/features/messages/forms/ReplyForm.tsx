import React, { useContext,  useState } from "react";
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
    hasLengthGreaterThan(4)({
      message: "Body needs to be at least 5 characters",
    }),
    hasLengthLessThan(255)({
      message: "Maximum number of characters is 500"
    })
  )(),
});

const ReplyForm = () => {
    const rootStore = useContext(RootStoreContext);

    const { sendReply } = rootStore.messageStore;
    const {closeModal} = rootStore.modalStore
    

    const [loading] = useState(false);//, setLoading

 

    const handleFinalFormSubmit = (values: any) => {
      sendReply(values.content);
    };

    

    // if (loadingInitial) return <LoadingComponent content="Loading forum post details..."/>

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
