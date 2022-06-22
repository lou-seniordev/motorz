import React, { useContext } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import { FORM_ERROR } from "final-form";
import { IUserFormValues } from "../../app/models/user";
import TextInput from "../../app/common/form/TextInput";

import useQuery from "../../app/common/util/hooks";
import { useTranslation } from "react-i18next";
import { Form as FinalForm, Field } from "react-final-form";
import {
  combineValidators,
  composeValidators,
  matchesField,
  isRequired,
  matchesPattern
} from "revalidate";

const ResetPasswordForm = () => {
  const email = useQuery().get("email") as string;
  const token = useQuery().get("token") as string;

  const rootStore = useContext(RootStoreContext);
  const { resetPassword } = rootStore.userStore;

  const { t } = useTranslation(["forms"]);

  const regexRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validate = combineValidators({
    password: composeValidators(

      isRequired({ message: t("Password is required") }),
      matchesPattern((regexRule))({message: t("Password requires a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")})
    )(),
    
    
    confirmPassword: composeValidators(
      isRequired({ message: t("Confirmation of password is required") }),
      matchesField(
        "password",
        "confirmPassword"
      )({
        message: t("Passwords do not match"),
      }),
    )(),
    
  });

  //


  const handleResetPassword = async (values: any) => {
    resetPassword(token, email, values.password)
  };

  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='envelope' />
        {t("Forgotten password")}
      </Header>

      <FinalForm
        onSubmit=
        {(values: IUserFormValues) =>
          handleResetPassword(values).catch((error) => ({
            [FORM_ERROR]: error,
          }))
        }

       
        validate={validate}
        render={({
          handleSubmit,
          submitting,
          invalid,
          pristine,
        }) => (
          <Form
            onSubmit={handleSubmit}
            autoComplete='off'
            style={{paddingBottom:"8rem"}}
          >
            <Header
              as='h2'
              content={t('Reset password')}
              color='teal'
              textAlign='center'
            />
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

            <Button
              disabled={invalid || pristine}
              loading={submitting}
              color='teal'
              content={t('Reset your password')}
              fluid
            />
          </Form>
        )}
      />
    </Segment>
  );
};

export default ResetPasswordForm;
