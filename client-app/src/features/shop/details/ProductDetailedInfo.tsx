import { formatDistance } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react"; //, useState
import { Link } from "react-router-dom";
import { Segment, Grid, Icon, Image, Button, Label } from "semantic-ui-react";
// import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IProduct } from "../../../app/models/product";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ContactForm from "../forms/ContactForm";
import ConfirmDelete from "../modals/ConfirmDelete";

const ProductDetailedInfo: React.FC<{ product: IProduct }> = ({ product }) => {
  const rootStore = useContext(RootStoreContext);
  const { setMessage, cleanMessage } = rootStore.messageStore; //

  const { openModal } = rootStore.modalStore;
  const {
    followProduct,
    productFollowed,
    unfollowProduct,
    setProductFollowed,
    markSold,
  } = rootStore.productStore;
  const { addFeedItem } = rootStore.feedStore;

  const { user } = rootStore.userStore;

  // if (loadingThread)
  // return <LoadingComponent content='Loading product...' />;

  useEffect(() => {
    product.viewers.forEach((viewer) => {
      if (viewer.username === user?.userName) {
        setProductFollowed();
      }
    });
    setMessage(product.sellerUsername, product.id);

    return () => {
      cleanMessage();
    };
  }, [
    setMessage,
    cleanMessage,
    product.sellerUsername,
    product.id,
    setProductFollowed,
    product.viewers,
    user,
  ]);

  const handleDeleteProduct = (id: string) => {
    openModal(<ConfirmDelete productId={id} />);
  };
  const handleFollowProduct = (id: string) => {
    followProduct(id, user!.userName, user!.displayName);
    addFeedItem(id, "Added to favorites");
  };
  const handleMarkSold = (id: string) => {
    markSold(id, product);
    addFeedItem(id, "Marked Sold");
  };
  const handleUnfollowProduct = (id: string) => {
    unfollowProduct(id);
    addFeedItem(id, "Removed from favorites");
  };

  return (
    <Grid>
      <Grid.Column width={8}>
        <Segment raised>
          <Grid>
            <Grid.Column width={2}>
              <Icon size='large' color='grey' name='info' />
            </Grid.Column>
            <Grid.Column width={14}>
            {/* <Label attached='top left'>Title */}
            <Label color='yellow' horizontal>Title </Label>
              {/* <h3> */}
                 {product.title}
              {/* </h3> */}
             
            </Grid.Column>
          </Grid>

          <Grid verticalAlign='middle'>
            <Grid.Column width={2}>
              <Icon name='monero' size='large' color='grey' />
            </Grid.Column>
            <Grid.Column width={14}>
            {/* Price:  */}
            <Label color='yellow' horizontal>Price </Label>
              {/* <h4> */}
                {product.price} €
                {/* </h4> */}
            </Grid.Column>
          </Grid>

          <Grid verticalAlign='middle'>
            <Grid.Column width={2}>
              <Icon name='calendar' size='large' color='grey' />
            </Grid.Column>
            <Grid.Column width={14}>
            <Label color='yellow' horizontal>Published </Label>
              {/* <h4> */}
                {/* Published:{" "} */}
                {formatDistance(new Date(product.datePublished), new Date(), {
                  addSuffix: true,
                })}
              {/* </h4> */}
            </Grid.Column>
          </Grid>
         

          <Grid verticalAlign='middle'>
            <Grid.Column width={2}>
              <Icon name='certificate' size='large' color='grey' />
            </Grid.Column>
            <Grid.Column width={14}>
            <Label color='yellow' horizontal>Category </Label>
              {/* <h4> */}
                {/* Category:  */}
                {product.category}
                {/* </h4> */}
            </Grid.Column>
          </Grid>

          <Grid verticalAlign='middle'>
            <Grid.Column width={2}>
              <Icon name='copyright' size='large' color='grey' />
            </Grid.Column>
            <Grid.Column width={14}>
            <Label color='yellow' horizontal>Brand </Label>
              {/* <h4> */}
                {/* Brand:  */}
                {product.brand}
                {/* </h4> */}
            </Grid.Column>
          </Grid>

          <Grid verticalAlign='middle'>
            <Grid.Column width={2}>
              <Icon name='id badge outline' size='large' color='grey' />
            </Grid.Column>
            <Grid.Column width={14}>
              {/* <h4> */}
              <Label color='yellow' horizontal>Model </Label>
                {product.model}
                {/* </h4> */}
            </Grid.Column>
          </Grid>
          {product.sellerUsername !== user?.userName && (
            <>
            <Grid verticalAlign='middle'>
              <Grid.Column width={2}>
                <Icon name='location arrow' size='large' color='grey' />
              </Grid.Column>
              <Grid.Column width={14}>
                {/* <h4> */}
                <Label color='yellow' horizontal>City </Label>
                  {/* City:  */}
                  {product.city}
                  {/* </h4> */}
              </Grid.Column>
            </Grid>
            <Grid verticalAlign='middle'>
              <Grid.Column width={2}>
                <Icon name='map marker alternate' size='large' color='grey' />
              </Grid.Column>
              <Grid.Column width={14}>
                {/* <h4> */}
                <Label color='yellow' horizontal>Country </Label>
                  {/* Country:  */}
                  {product.countryName}
                  {/* </h4> */}
              </Grid.Column>
            </Grid>
             <Grid verticalAlign='middle'>
              <Grid.Column width={2}>
                <Icon name='user' size='large' color='grey' />
              </Grid.Column>
              <Grid.Column width={14}>
                {/* <h4> */}
                  {/* Seller name:  */}
                  <Label color='yellow' horizontal>Seller </Label>
                  <Link to={`/profile/${product.sellerUsername}`}>
                  {" "}
                  {product.sellerDisplayName}
                </Link>
                 {/* </h4> */}
              </Grid.Column>
            </Grid>
           { product.phoneNumber && <Grid verticalAlign='middle'>
              <Grid.Column width={2}>
                <Icon name='phone' size='large' color='grey' />
              </Grid.Column>
              <Grid.Column width={14}>
                {/* <h4> */}
                  {/* Contact number:  */}
                  <Label color='yellow' horizontal>Contact number </Label>
                  {product.phoneNumber}
                  {/* </h4> */}
              </Grid.Column>
            </Grid>}
           { product.description && <Grid verticalAlign='middle'>
              <Grid.Column width={2}>
                <Icon name='info circle' size='large' color='grey' />
              </Grid.Column>
              <Grid.Column width={14}>
               
                  <Label color='yellow' horizontal>Description </Label>
                  {product.description}
                  {/* </h4> */}
              </Grid.Column>
            </Grid>}
            </>
          )}

          <Grid verticalAlign='middle'>
            <Grid.Column width={16}>
              {product.sellerUsername !== user?.userName ? (
                <div className='ui two buttons'>
                  <Button
                    basic
                    content='Contact the seller'
                    color='blue'
                    // button
                    onClick={() => {
                      openModal(<ContactForm userName={user?.userName!} />);
                    }}
                  />
                  <Button
                    // basic
                    color='instagram'
                    // button
                    content={
                      productFollowed === true
                        ? "Unfollow this product"
                        : "Follow this product"
                    }
                    onClick={() => {
                      if (!productFollowed) {
                        handleFollowProduct(product.id);
                      } else {
                        handleUnfollowProduct(product.id);
                      }
                    }}
                  />
                </div>
              ) : (
                
                <div className='ui three buttons'>
                  <Button
                    basic
                    onClick={() => {
                      // () =>

                      handleDeleteProduct(product.id!);
                      // history.push("/gallery");
                    }}
                    color='red'
                    // floated='left'
                  >
                    Delete
                  </Button>
                  <Button
                    basic
                    color='olive'
                    content='Mark sold'
                    disabled={product.isSold}
                    onClick={() => handleMarkSold(product.id!)}
                  />
                  <Button
                    // basic
                    as={Link}
                    to={`/manageProduct/${product.id}`}
                    color='instagram'
                    // floated='right'
                  >
                    Manage
                  </Button>
                </div>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>

      <Grid.Column width={8}>
        <Segment raised>
          {product.isSold && (
            <Label style={{ position: "absolute" }} color='red' corner='right'>
              SOLD
            </Label>
          )}
          <Image src={product.photoUrl} fluid />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductDetailedInfo);
