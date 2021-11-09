import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import { Header, Button, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  motofyId: string;
}
const ConfirmDelete: React.FC<IProps> = ({ motofyId }) => {
  const rootStore = useContext(RootStoreContext);
  const { confirmDeleteMotofy, deleteMotofy } = rootStore.motofyStore;
  const { closeModal } = rootStore.modalStore;

  //confirmDeleteMotofy
  //history.push("/gallery");

  const handleDeleteMotofy = (id: string) => {
    deleteMotofy(id);
    // console.log("id is: ", id);
    closeModal();
    history.push(`/gallery`);
  };

  const cancelDeleteMotofy = () => {
    closeModal();
  };

  let history = useHistory();

  return (
    <>
      {/* <Segment textAlign='center' vertical > */}
        <Header
          as='h2'
          content='Sure you want to do this (cannot undo)?'
          color='red'
          textAlign='center'
        />

        <Fragment>
          <Button
            // disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            // loading={submitting}
            onClick={() => handleDeleteMotofy(motofyId)}
            color='red'
            content='Yes, delete it!'
            // fluid
            floated='left'

            // display: inline-block;
          />
          <Button
            // disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            // loading={submitting}
            onClick={() => cancelDeleteMotofy()}
            color='blue'
            content='No, cancel'
            // fluid
            floated='right'
          />
        </Fragment>
      {/* </Segment> */}
    </>
  );
};

export default ConfirmDelete;
