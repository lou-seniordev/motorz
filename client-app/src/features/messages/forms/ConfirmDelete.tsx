import React, { useContext } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  ids: string[];
}

const ConfirmDelete: React.FC<IProps> = ({ ids }) => {
  const rootStore = useContext(RootStoreContext);

  const { deleteThread } = rootStore.messageStore; //, setThread
  const { closeModal } = rootStore.modalStore;

  const handleDeleteMessageThread = () => {
    deleteThread(ids);
    closeModal();
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content='Sure you want to do this? All the data will be deleted'
          color='teal'
          textAlign='center'
        />
        <Button
          fluid
          floated='right'
          color='teal'
          // type='submit'
          content='delete'
          onClick={() => handleDeleteMessageThread()}
        />
        <Button
          fluid
          floated='left'
          type='button'
          content='cancel'
          onClick={() => closeModal()}
        />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ConfirmDelete);
