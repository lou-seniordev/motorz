import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { useTranslation } from "react-i18next";
import {
  combineValidators,
  composeValidators,
  createValidator,
  isRequired,
} from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { IUserFormValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";

const RequestResetPasswordForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { handleForgottenPassword } = rootStore.userStore;

  const { t } = useTranslation(["forms"]);

  const isValidEmail = createValidator(
    (message) => (value) => {
      if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return message;
      }
    },
    t("Invalid email address")
  );
  const validate = combineValidators({
    email: composeValidators(
      isRequired({ message: t("Email is required") }),
      isValidEmail({ message: t("Invalid email address") })
    )(),
  });

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        handleForgottenPassword(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({ handleSubmit, submitting, invalid, pristine }) => (
        <Form onSubmit={handleSubmit} autoComplete='off'>
          <Header
            as='h2'
            content={t('Reset password')}
            color='teal'
            textAlign='center'
          />
          <Field name='email' component={TextInput} placeholder={t("Email")} />

          <Button
            disabled={invalid || pristine}
            loading={submitting}
            color='teal'
            content={t('Send me the reset link')}
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RequestResetPasswordForm;
