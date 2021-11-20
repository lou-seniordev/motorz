import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
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

const validate = combineValidators({
  content: composeValidators(
    isRequired("Body"),
    hasLengthGreaterThan(4)({
      message: "Body needs to be at least 5 characters",
    })
  )(),
});

const ContactForm = () =>
  //: React.FC<RouteComponentProps>
  //<DetailParams>
  //     {
  //   match,
  //   history,
  // }
  {
    const rootStore = useContext(RootStoreContext);

    const { sendMessage } = rootStore.messageStore;


    const [loading, setLoading] = useState(false);

    //   useEffect(() => {
    //     if (match.params.id) {
    //       setLoading(true);
    //       loadForumPost(match.params.id)
    //         .then((forumpost) => setForumpost(new ForumpostFormValues(forumpost)))
    //         .finally(() => setLoading(false));
    //     }
    //   }, [loadForumPost, match.params.id]);

    // const handleInputChange = (
    //   event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
    // ) => {
    //   const { name, value } = event.currentTarget;
    //   setForumpost({ ...forumpost, [name]: value });
    // };

    const handleFinalFormSubmit = (values: any) => {
      // console.log(values);
      sendMessage(values.content);
    };

    // if (loadingInitial) return <LoadingComponent content="Loading forum post details..."/>

    return (
      <Grid>
        {/* <Grid.Column width={3} /> */}
        <Grid.Column width={16}>
          {/* <Segment clearing> */}
          <FinalForm
            //   validate={validate}
            // initialValues={forumpost}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                {/* <Field
                  name='title'
                  placeholder='title'
                //   value={forumpost.title}
                  component={TextInput}
                /> */}
                <Field
                  // onChange={handleInputChange}
                  name='content'
                  rows={4}
                  placeholder='content'
                  //   value={forumpost.body}
                  component={TextAreaInput}
                />
                <Button
                  //   loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated='right'
                  positive
                  type='submit'
                  content='submit'
                />
                {/* <Button
                  floated='right'
                  disabled={loading}
                  type='button'
                  content='cancel'
                  onClick={
                    forumpost.id
                      ? () => history.push(`/forum/${forumpost.id}`)
                      : () => history.push('/forum')
                  }
                /> */}
              </Form>
            )}
          />
          {/* </Segment> */}
        </Grid.Column>
      </Grid>
    );
  };

export default observer(ContactForm);
