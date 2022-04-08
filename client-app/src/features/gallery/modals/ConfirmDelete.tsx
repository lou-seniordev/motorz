import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Header, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  motofyId: string;
}
const ConfirmDelete: React.FC<IProps> = ({ motofyId }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteMotofy } = rootStore.motofyStore;
  const { closeModal } = rootStore.modalStore;
  const {addFeedItem} = rootStore.feedStore;

  const { t } = useTranslation(["gallery"]);


  const handleDeleteMotofy = (id: string) => {
    addFeedItem(id, 'Deleted Motofy');
    deleteMotofy(id);
    closeModal();
    history.push(`/gallery`);
  };

  const cancelDeleteMotofy = () => {
    closeModal();
  };

  let history = useHistory();

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
            onClick={() => handleDeleteMotofy(motofyId)}
            color='teal'
            content={t('Yes, delete it!')}
            floated='left'
          />
          <Button
            fluid
            onClick={() => cancelDeleteMotofy()}
            content={t('No, keep it')}
            floated='right'
          />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmDelete;
