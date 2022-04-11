import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Header, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
    mechanicId: string;
}
const ConfirmDelete: React.FC<IProps> = ({ mechanicId }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteMechanic } = rootStore.mechanicStore;
  const { closeModal } = rootStore.modalStore;

  const handleDeleteMechanic = (id: string) => {
    deleteMechanic(id);
    closeModal();
    history.push(`/mechanics`);
  };

  const cancelDeleteMechanic = () => {
    closeModal();
  };
  let history = useHistory();

  const { t } = useTranslation(["modals"]);


  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content={t('Sure you want to do this (cannot undo)?')}
          color='teal'
          textAlign='center'
        />

        <Fragment>
          <Button
            fluid
            onClick={() => handleDeleteMechanic(mechanicId)}
            color='teal'
            content={t('Yes, delete it!')}
            floated='left'
          />
          <Button
            fluid
            onClick={() => cancelDeleteMechanic()}
            content={t('No, cancel')}
            floated='right'
          />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmDelete;
