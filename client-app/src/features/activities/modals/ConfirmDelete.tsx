import React, { Fragment, useContext } from "react";
import { Header, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { useTranslation } from "react-i18next";

interface IProps {
  activityId: string;
}
const ConfirmDelete: React.FC<IProps> = ({ activityId }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteActivity } = rootStore.activityStore;

  const { closeModal } = rootStore.modalStore;

  const { t } = useTranslation(["modals"]);


  const handleDeleteActivity = (id: string) => {
    deleteActivity(id)
    //   .then(() => addFeedItem(id, "Deactivated Motocycle Diary"))
      .then(() => closeModal());
    //   .finally(() => history.push(`/activities`));
  };

  const cancelDeleteActivity = () => {
    closeModal();
  };

  // let history = useHistory();

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content={t('Sure you want to do this? You cannot go back...')}
          color='teal'
          textAlign='center'
        />

        <Fragment>
          <Button
            fluid
            onClick={() => handleDeleteActivity(activityId)}
            color='teal'
            content={t('Yes, delete it')}
            floated='left'
          />
          <Button
            fluid
            onClick={() => cancelDeleteActivity()}
            content={t("No, don't delete")}
            floated='right'
          />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmDelete;
