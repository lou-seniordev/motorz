import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Header, Button, Grid, Form } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Form as FinalForm, Field } from "react-final-form";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import { PrivateMessageToEditValues } from "../../../app/models/privatemessages";

import { combineValidators, isRequired } from "revalidate";

interface IProps {
  messageId: string;
  privateMessageThreadId: string;
  content: string;
  recipientUsername: string;
  senderPhotoUrl: string;
}
const ConfirmDelete: React.FC<IProps> = ({
  messageId,
  privateMessageThreadId,
  content,
  recipientUsername,
  senderPhotoUrl,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { editMessage } = rootStore.privateMessageStore;

  const { closeModal } = rootStore.modalStore;

  const { t } = useTranslation(["modals"]);

  const validate = combineValidators({
    content: isRequired({ message: t("Content is required") }),
  });

  const [message, setMessage] = useState(new PrivateMessageToEditValues());

  useEffect(() => {
    let message = {
      messageId,
      privateMessageThreadId,
      content,
      recipientUsername,
      senderPhotoUrl,
    };
    setMessage(message);
  }, [
    content,
    messageId,
    privateMessageThreadId,
    recipientUsername,
    senderPhotoUrl,
  ]);

  const handleFinalFormSubmit = (values: any) => {
    editMessage(
      values.messageId,
      values.privateMessageThreadId,
      values.content,
      values.recipientUsername,
      values.senderPhotoUrl
    );
    closeModal();
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content={t('Edit message')}
          color='teal'
          textAlign='center'
        />

        <FinalForm
          validate={validate}
          initialValues={message}
          onSubmit={handleFinalFormSubmit}
          render={({ handleSubmit, invalid, pristine }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                name='content'
                rows={4}
                value={message.content}
                component={TextAreaInput}
              />
              <div className='ui two buttons' style={{ paddingTop: "2rem" }}>
                <Button
                  type='button'
                  content={t("Cancel")}
                  onClick={closeModal}
                />
                <Button
                  disabled={invalid || pristine}
                  positive
                  type='submit'
                  content={t("Submit")}
                />
              </div>
            </Form>
          )}
        />
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmDelete;
