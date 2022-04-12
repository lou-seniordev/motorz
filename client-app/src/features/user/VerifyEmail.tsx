import React, { useContext, useState, useEffect } from 'react';
import { RootStoreContext } from '../../app/stores/rootStore';
import agent from '../../app/api/agent';
import { Button, Segment, Header, Icon } from 'semantic-ui-react';
import LoginForm from './LoginForm';
import { toast } from 'react-toastify';
import useQuery from '../../app/common/util/hooks';
import { useTranslation } from 'react-i18next';

const VerifyEmail = () => {
    const email = useQuery().get('email') as string;
    const token = useQuery().get('token') as string;

  const rootStore = useContext(RootStoreContext);
  const Status = {
    Verifying: 'Verifying',
    Failed: 'Failed',
    Success: 'Success',
  };

  const [status, setStatus] = useState(Status.Verifying);
  const { openModal } = rootStore.modalStore;
  const { t } = useTranslation(["forms"]);

  useEffect(() => {
    agent.User.verifyEmail(token as string, email as string)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => {
        setStatus(Status.Failed);
      });
  }, [Status.Failed, Status.Success, token, email]);

  const handleConfirmEmailResend = () => {
    agent.User.resendVerifyEmailConfirm(email as string)
      .then(() => {
        toast.success(t('Verification email resent - please check your email'));
      })
      .catch((error) => console.log(error));
  };

  const getBody = () => {
    switch (status) {
      case Status.Verifying:
        return <p>{t("Verifying...")}</p>;
      case Status.Failed:
        return (
          <div className='center'>
            <p>
              {t("Verication failed - you can try resending the verification email")}
            </p>
            <Button onClick={handleConfirmEmailResend} primary size='huge' content={t('Resend email')} />
          </div>
        );
      case Status.Success:
        return (
          <div className='center'>
            <p>{t("Email has been verified - you can now login")}</p>
            <Button
              primary
              onClick={() => openModal(<LoginForm />)}
              size='large'
              content={t('Login')}
            />
          </div>
        );
    }

  };
  return (
    <Segment placeholder>
        <Header icon>
            <Icon name='envelope' />
            {t("Email verification")}
        </Header>

        <Segment.Inline>
            {getBody()}
        </Segment.Inline>
    </Segment>
)
};

export default VerifyEmail