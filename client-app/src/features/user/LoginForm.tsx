import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { useTranslation } from "react-i18next";
import { combineValidators, isRequired } from "revalidate";
import { Button, Form, Header } from "semantic-ui-react";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import TextInput from "../../app/common/form/TextInput";
import { IUserFormValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";
import RegisterForm from "./RegisterForm";
import ResetPasswordForm from "./RequestResetPasswordForm";

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  const { openModal, setSize, closeModal } = rootStore.modalStore;

  const { t } = useTranslation(["forms"]);
  const validate = combineValidators({
    email: isRequired({ message: t("Email is required") }),
    password: isRequired({ message: t("Password is required") }),
  });
  return (
    <>
      <FinalForm
        onSubmit={(values: IUserFormValues) =>
          login(values).catch((error) => ({
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
          <Form onSubmit={handleSubmit} error={submitError} autoComplete='off'>
            <Header
              as='h2'
              content={t("Login to Motoranza")}
              color='teal'
              textAlign='center'
            />
            <Field
              name='email'
              component={TextInput}
              placeholder={t("Email")}
            />
            <Field
              name='password'
              component={TextInput}
              placeholder={t("Password")}
              type='password'
            />
            {submitError && !dirtySinceLastSubmit && (
              <ErrorMessage
                error={submitError}
                text={t("Invalid email address or password")}
              />
            )}
            <Button
              disabled={(invalid && !dirtySinceLastSubmit) || pristine}
              loading={submitting}
              color='teal'
              content={t("Login")}
              fluid
            />
          </Form>
        )}
      />
      <div className='ui two buttons' style={{marginTop:"1rem"}}>
        <Button
          basic
          color='teal'
          onClick={() => {
            closeModal();
            setSize("mini");
            openModal(<ResetPasswordForm />);
          }}
        >
          {t("Forgot your password?")}
        </Button>
        {/* onClick={ openModal(<RegisterForm />)} */}
        <Button color='teal' onClick={()=>{closeModal(); setSize("mini"); openModal(<RegisterForm />)}}>
          {t("Don't have an account yet? Sign Up!")}
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
