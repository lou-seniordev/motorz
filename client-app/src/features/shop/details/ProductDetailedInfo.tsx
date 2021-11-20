import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Segment, Grid, Icon, Image, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IProduct } from "../../../app/models/product";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ProductDetailedInfo: React.FC<{ product: IProduct }> = ({ product }) => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadMessageThread,
    checkMessageThread,
    cleanMessageThread,
    // threadNotEmpty,
    threadExist,
    setMessageThreadData,
  } = rootStore.messageStore; //

  const { user } = rootStore.userStore;

  // const [contactData, setContactData] = useState();

  //==tmp com==
  const handleContactSeller = (productId: string, sellerUsername: string) => {
    // setMessageThreadData(sellerUsername, productId);
    loadMessageThread(sellerUsername, productId);
  };
  //==tmp com==
  const handleChoice = (productId: string, sellerUsername: string) => {
    setMessageThreadData(sellerUsername, productId);
    checkMessageThread();
  };

  // if (loadingThread)
  // return <LoadingComponent content='Loading forum posts...' />;

  const exe1 = () => {
    cleanMessageThread();
  }

  useEffect(() => {
    cleanMessageThread();
    console.log("iamworking in useEffect")
    console.log("product id:", product.id)
    console.log("sellerusername", product.sellerUsername)
    return () => {
      //your cleanup code codes here
    };


  }, [cleanMessageThread]);

//   useEffect(() => {
//    // setMessageThreadData(sellerUsername, productId);
//    setMessageThreadData(product.sellerUsername, product.id);
//    checkMessageThread();
//    console.log("iamworking in useEffect")
//    console.log("product id:", product.id)
//    console.log("sellerusername", product.sellerUsername)
//    return () => {
//      cleanMessageThread();
//      //your cleanup code codes here
//    };
//  }, [cleanMessageThread, checkMessageThread, setMessageThreadData]);

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
      {product.sellerUsername !== user?.userName && (// threadNotEmpty &&
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={1}>
              <Icon name='marker' size='large' color='teal' />
            </Grid.Column>

            <Grid.Column width={11}>
              {/* BUTTON HERE */}
              <Button
                // disabled={product.sellerUsername === user?.userName}
                content='contact the seller'
                onClick={() => {
                    //==tmp com==
                  handleChoice(product.id, product.sellerUsername);
                  handleContactSeller(product.id, product.sellerUsername);
                }}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      )}
    </Segment.Group>
  );
};

export default observer(ProductDetailedInfo);
