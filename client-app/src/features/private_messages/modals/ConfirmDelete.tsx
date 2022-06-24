import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Header, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  messageId: string;
  privateMessageThreadId: string;
}
const ConfirmDelete: React.FC<IProps> = ({ messageId, privateMessageThreadId }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteSingleMessage} = rootStore.privateMessageStore;
 
  const { closeModal } = rootStore.modalStore;

  const { t } = useTranslation(["modals"]);


  const handleDeleteSingleMessage = () => {
    deleteSingleMessage(messageId, privateMessageThreadId)
      .then(() => closeModal())
  };

  const cancelDeleteSingleMessage = () => {
    closeModal();
  };


  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content={t('This action is irreversible')}
          color='teal'
          textAlign='center'
        />
        <Header
          sub
          content={t('Are you sure you want to delete this message?')}
          color='teal'
          textAlign='center'
        />

        <Fragment>
          <Button
            fluid
            onClick={() => handleDeleteSingleMessage()}
            color='teal'
            content={t('Yes, delete it')}
            floated='left'
          />
          <Button
            fluid
            onClick={() => cancelDeleteSingleMessage()}
            content={t("No, don't delete")}
            floated='right'
          />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmDelete;
