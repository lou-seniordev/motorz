import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import useQuery from "../../app/common/util/hooks";

const RegisterSuccess = () => {
  const email = useQuery().get("email") as string;
  const { t } = useTranslation(["forms"]);

  function handleConfirmEmailResend() {
    agent.User.resendVerifyEmailConfirm(email)
      .then(() => {
        toast.success(t("Verification email resent - please check your email"));
      })
      .catch((error) => console.log(error));
  }

  return (
    <Segment placeholder textAlign='center'>
      <Header icon color='green'>
        <Icon name='check' />
        {t("Successfully registered!")}
      </Header>
      <p>
        {t("Please check your email (including junk email) for the verification email")}
      </p>
      {email && (
        <>
          <p>{t("Didn't receive the email? Click the below button to resend")}</p>
          <Button
            primary
            onClick={handleConfirmEmailResend}
            content={t('Resend email')}
            size='huge'
          />
        </>
      )}
    </Segment>
  );
};

export default RegisterSuccess;
