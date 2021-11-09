import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import { Header, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  motofyId: string;
}
const ConfirmDelete: React.FC<IProps> = ({ motofyId }) => {
  const rootStore = useContext(RootStoreContext);
  const {  deleteMotofy } = rootStore.motofyStore; 
  const { closeModal } = rootStore.modalStore;

  const handleDeleteMotofy = (id: string) => {
    deleteMotofy(id);
    closeModal();
    history.push(`/gallery`);
  };

  const cancelDeleteMotofy = () => {
    closeModal();
  };

  let history = useHistory();

  return (
    <>
        <Header
          as='h2'
          content='Sure you want to do this (cannot undo)?'
          color='red'
          textAlign='center'
        />

        <Fragment>
          <Button
            onClick={() => handleDeleteMotofy(motofyId)}
            color='red'
            content='Yes, delete it!'
            floated='left'

          />
          <Button
            onClick={() => cancelDeleteMotofy()}
            color='blue'
            content='No, cancel'
            floated='right'
          />
        </Fragment>
    </>
  );
};

export default ConfirmDelete;
