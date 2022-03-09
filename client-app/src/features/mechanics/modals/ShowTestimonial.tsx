import { formatDistance } from "date-fns";
// import { toJS } from "mobx";
import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import { IMechanic, IMechanicCustomer } from "../../../app/models/mechanic";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
 
    customer: IMechanicCustomer
    mechanic:IMechanic
}
const ShowTestimonial: React.FC<IProps> = ({  customer, mechanic }) => {
  const rootStore = useContext(RootStoreContext);

//   console.log('customer', customer)
//   console.log('mechanic', toJS(mechanic))

  const { closeModal } = rootStore.modalStore;

  return (
    <Fragment>
      <Container text>
        <Segment
          textAlign='center'
          style={{ border: "none" }}
          attached='top'
          secondary
          inverted
          color='teal'
        >
          <Grid>
           
            <Grid.Column width={10}>
           
              <p>
               
                Published {" "}
                {formatDistance(
                  new Date(customer.testimonial?.dateAdded!),
                  new Date()
                )}{" "}
                ago{" "}
              </p>
              <Header.Subheader as='h2' color='pink'>
                <Link
                  to={`/profile/${customer.username}`}
                  onClick={() => closeModal()}
                >
                  by {customer.displayName}
                </Link>
              
              </Header.Subheader>
            </Grid.Column>
            <Grid.Column width={3}>
             
              <Image src={mechanic.photoUrl} size='small' floated="left"/>
            </Grid.Column>
           
          </Grid>
        </Segment>
        <Segment>
              <Image src={customer.image} size='tiny' circular floated="left"/>
         
          
              <p style={{ whiteSpace: 'pre-wrap' }}>{customer.testimonial?.text}</p>
             
         
              <Button fluid onClick={() => closeModal()} content='Close' />
         
        </Segment>
      </Container>
    </Fragment>
  );
};

export default ShowTestimonial;
