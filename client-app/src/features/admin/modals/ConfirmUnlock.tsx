import React, { useContext, useState } from "react";
import { Header, Button, Grid, Input, GridRow } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  username: string;
}
const ConfirmUnlock: React.FC<IProps> = ({ username }) => {
  const rootStore = useContext(RootStoreContext);
  const { unlockMember } = rootStore.adminStore;

  const { closeModal } = rootStore.modalStore;



  const handleLockoutMember = () => {
    unlockMember(username)
      .then(() => closeModal());
  };


  const cancelDeleteMember = () => {
    closeModal();
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <GridRow>
          <Header
            as='h2'
            content={
              "Unlock member."
            }
            color='teal'
            textAlign='center'
          />
        </GridRow>
       
        <GridRow style={{marginTop: "10px"}}>
          {/* <Fragment> */}
            <Button
              onClick={handleLockoutMember}
              color='teal'
              content={"Yes, unlock this member"}
              floated='left'
            />
            <Button
              onClick={() => cancelDeleteMember()}
              content={"No, keep it locket"}
              floated='right'
            />
          {/* </Fragment> */}
        </GridRow>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmUnlock;
