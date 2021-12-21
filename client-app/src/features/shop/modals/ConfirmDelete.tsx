import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import { Header, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
    productId: string;
}
const ConfirmDelete: React.FC<IProps> = ({ productId }) => {
  const rootStore = useContext(RootStoreContext);
  const { deleteProduct } = rootStore.productStore;
  const { closeModal } = rootStore.modalStore;

  let history = useHistory();

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    closeModal();
    history.push('/shop');
  };

  const cancelDeleteProduct = () => {
    closeModal();
  };


  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content='Sure you want to do this (cannot undo)?'
          color='teal'
          textAlign='center'
        />

        <Fragment>
          <Button
            fluid
            onClick={() => handleDeleteProduct(productId)}
            color='teal'
            content='Yes, delete it!'
            floated='left'
          />
          <Button
            fluid
            onClick={() => cancelDeleteProduct()}
            content='No, cancel'
            floated='right'
          />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmDelete;
