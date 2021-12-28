import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import { Header, Button, Grid } from "semantic-ui-react";
import { IUser } from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
    mechanicId: string;
    // user: IUser;
}
const ConfirmBecomeCustomer: React.FC<IProps> = ({ mechanicId}) => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const { becomeCustomer } = rootStore.mechanicStore;
  const { closeModal } = rootStore.modalStore;

  const handleBecomeCustomer = (id: string) => {

    becomeCustomer(id, user);
    closeModal();
    // history.push(`/mechanics`);
  };

  const cancelBecomeCustomer = () => {
    closeModal();
  };
  let history = useHistory();

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content='You are customer of this premise?'
          color='teal'
          textAlign='center'
        />

        <Fragment>
          <Button
            // fluid
            onClick={() => handleBecomeCustomer(mechanicId)}
            color='teal'
            content='Yes, gladly!'
            floated='left'
          />
          <Button
            // fluid
            onClick={() => cancelBecomeCustomer()}
            content='No, cancel'
            floated='right'
          />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmBecomeCustomer;
