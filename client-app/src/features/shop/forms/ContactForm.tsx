import React, { useContext,  useState } from "react";//useEffect,
import { Button, Form, Grid, Header } from "semantic-ui-react";//, Modal, ModalActions
// import { ForumpostFormValues } from "../../../app/models/forumpost";
// import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
// import { RouteComponentProps } from "react-router-dom";
// import { category } from "../../../app/common/options/forumCategoryOptions";

import { Form as FinalForm, Field } from "react-final-form";
// import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";

import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  hasLengthLessThan,
  isRequired,
} from "revalidate";
// import SelectInput from "../../../app/common/form/SelectInput";
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

const ContactForm = () => {
    const rootStore = useContext(RootStoreContext);

    const { sendMessage } = rootStore.messageStore;
    const {closeModal} = rootStore.modalStore
    

    const [loading] = useState(false);//, setLoading

 

    const handleFinalFormSubmit = (values: any) => {
      sendMessage(values.content);
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
                  
                <Header as='h2' content='Send message' color='teal' textAlign='center'/>
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
                    content='submit'
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

export default observer(ContactForm);
