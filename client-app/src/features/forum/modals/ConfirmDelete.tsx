import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
// import { useHistory } from "react-router";
import { Header, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  forumpostId: string;
}
const ConfirmDelete: React.FC<IProps> = ({ forumpostId }) => {
  const rootStore = useContext(RootStoreContext);
  const {deleteForumpost } = rootStore.forumPostStore;
 
  const { closeModal } = rootStore.modalStore;
  let history = useHistory();

  const { t } = useTranslation(["modals"]);


  const handleDeleteForumpost = (id: string) => {
    deleteForumpost(id)
    //   .then(() => addFeedItem(id, "Deactivated Motocycle Diary"))
      .then(() => closeModal())
      .finally(() => history.push(`/forum`));
  };

  const cancelDeleteForumpost = () => {
    closeModal();
  };

  // let history = useHistory();

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content={t('Irreversible action! Are you sure you want to do this?')}
          color='teal'
          textAlign='center'
        />

        <Fragment>
          <Button
            fluid
            onClick={() => handleDeleteForumpost(forumpostId)}
            color='teal'
            content={t('Yes, delete it')}
            floated='left'
          />
          <Button
            fluid
            onClick={() => cancelDeleteForumpost()}
            content={t("No, don't delete")}
            floated='right'
          />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmDelete;
