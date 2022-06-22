import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import {
  combineValidators,
  isRequired,
  matchesField,
  composeValidators,
  createValidator,
  matchesPattern,
} from "revalidate";
import { v4 as uuid } from "uuid";
import { Button, Form, Header } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import TextInput from "../../app/common/form/TextInput";
// import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from "../../app/stores/rootStore";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  const { addFeedItem } = rootStore.feedStore;

  const { t } = useTranslation(["forms"]);
  
  const isValidEmail = createValidator(
    (message) => (value) => {
      if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return message;
      }
    },
    t("Invalid email address")
  );

  const regexRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  const validate = combineValidators({
    username: isRequired({ message: t("Username is required") }),
    displayName: isRequired({ message: t("Display Name is required") }),
    // password: isRequired({ message: t("Password is required") }),
    password: composeValidators(
      isRequired({ message: t("Password is required") }),
      matchesPattern((regexRule))({message: "Password requires a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"})
    )(),
    
    email: composeValidators (
      isRequired({ message: t("Email is required") }),
      isValidEmail({ message: t("Invalid email address") }),
    )(),
    confirmPassword: composeValidators(
      isRequired({ message: t("Confirmation of password is required") }),
      matchesField(
        "password",
        "confirmPassword"
      )({
        message: t("Passwords do not match"),
      })
    )(),
  });

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
            content={t("Sign up to Motoranza")}
            color='teal'
            textAlign='center'
          />
          <Field
            name='username'
            component={TextInput}
            placeholder={t("Username")}
          />
          <Field
            name='displayName'
            component={TextInput}
            placeholder={t("Display Name")}
          />
          <Field name='email' component={TextInput} placeholder={t("Email")} />
          <Field
            name='password'
            component={TextInput}
            placeholder={t("Password")}
            type='password'
          />
          <Field
            name='confirmPassword'
            component={TextInput}
            placeholder={t("Confirm Password")}
            type='password'
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}

          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color='teal'
            content={t("Register")}
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
