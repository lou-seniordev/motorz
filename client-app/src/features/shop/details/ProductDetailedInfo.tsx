import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react"; //, useState
import { Link } from "react-router-dom";
import { Segment, Grid, Icon, Image, Button } from "semantic-ui-react";
// import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IProduct } from "../../../app/models/product";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ContactForm from "../forms/ContactForm";
import ConfirmDelete from "../modals/ConfirmDelete";

const ProductDetailedInfo: React.FC<{ product: IProduct }> = ({ product }) => {
  const rootStore = useContext(RootStoreContext);
  const { setMessage, cleanMessage } = rootStore.messageStore; //

  const { openModal } = rootStore.modalStore;

  const { user } = rootStore.userStore;

  // if (loadingThread)
  // return <LoadingComponent content='Loading products...' />;

  useEffect(() => {
    setMessage(product.sellerUsername, product.id);

    return () => {
      cleanMessage();
    };
  }, [setMessage, cleanMessage, product.sellerUsername, product.id]);

  // const { openModal } = rootStore.modalStore;

  const handleDeleteProduct = (id: string) => {
    openModal(<ConfirmDelete productId={id} />);
    // console.log("id", id);
  };

  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>Title: {product.title}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='image' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <Image src={product.photoUrl} size='medium' />
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='user' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Seller: {product.sellerUsername}</span>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>Product ID: {product.id}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Category: {product.category}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={16}>
            <span>{product.model}</span>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>

          <Grid.Column width={11}>
            {product.sellerUsername !== user?.userName ? ( // threadNotEmpty &&
              <Button
                // disabled={product.sellerUsername === user?.userName}
                content='contact the seller'
                onClick={() => {
                  openModal(<ContactForm />);
                }}
              />
            ) : (
              <Fragment>
                <Button
                  onClick={() => {
                    // () =>

                    handleDeleteProduct(product.id!);
                    // history.push("/gallery");
                  }}
                  color='red'
                  floated='left'
                >
                  Delete
                </Button>
                <Button
                  as={Link}
                  to={`/manageProduct/${product.id}`}
                  color='teal'
                  floated='right'
                >
                  Manage Post
                </Button>
              </Fragment>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ProductDetailedInfo);
