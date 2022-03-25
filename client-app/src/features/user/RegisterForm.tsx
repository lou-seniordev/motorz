import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  combineValidators,
  isRequired,
  matchesField,
  composeValidators,
} from "revalidate";
import { v4 as uuid } from "uuid";
import { Button, Form, Header } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import TextInput from "../../app/common/form/TextInput";
// import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from "../../app/stores/rootStore";


const validate = combineValidators({
  username: isRequired("Username"),
  displayName: isRequired("DisplayName"),
  password: isRequired("Password"),
  email: isRequired("Email"),
  confirmPassword: composeValidators(
    isRequired("Confirmation of password"),
    matchesField(
      "password",
      "confirmPassword"
    )({
      message: "Passwords do not match",
    })
  )(),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  const { addFeedItem } = rootStore.feedStore;

  return (
    <FinalForm
      onSubmit={(values: any) =>
        register(values)
          .then(() => addFeedItem(uuid(), "Registered", values.username))
          .catch((error) => ({
            [FORM_ERROR]: error,
          }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error={submitError}>
          <Header
            as='h2'
            content='Sign up to Motoranza'
            color='teal'
            textAlign='center'
          />
          <Field name='username' component={TextInput} placeholder='Username' />
          <Field
            name='displayName'
            component={TextInput}
            placeholder='Display Name'
          />
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field
            name='password'
            component={TextInput}
            placeholder='Password'
            type='password'
          />
          <Field
            name='confirmPassword'
            component={TextInput}
            placeholder='Confirm Password'
            type='password'
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}

          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='teal'
            content='Register'
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
