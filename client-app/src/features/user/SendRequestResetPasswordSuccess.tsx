import React from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import useQuery from "../../app/common/util/hooks";

const SendRequestResetPasswordSuccess = () => {
  const email = useQuery().get("email") as string;
  const { t } = useTranslation(["forms"]);

  function handleResetPasswordResend() {
    agent.User.resendPasswordRequest(email)
      .then(() => {
        toast.success(t("Password reset link resent - please check your email"));
      })
      .catch((error) => console.log(error));
  }

  return (
    <Segment placeholder textAlign='center'>
      <Header icon color='green'>
        <Icon name='check' />
        {/* {t("Successfully registered!")} */}
        {"Password reset link sent"}
      </Header>
      <p>
        {t("Please check your email (including junk email) for the password reset link")}
      </p>
      {email && (
        <>
          <p>{t("Didn't receive the email? Click the below button to resend")}</p>
          <Button
            primary
            onClick={handleResetPasswordResend}
            content={t('Resend request')}
            // content={t('Resend email')}
            size='huge'
          />
        </>
      )}
    </Segment>
  );
};

export default SendRequestResetPasswordSuccess;
