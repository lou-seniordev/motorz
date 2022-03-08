import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Segment, List, Item, Image, Grid, Label } from "semantic-ui-react";
import { IMechanic } from "../../../app/models/mechanic";

const MechanicDetailedSidebar: React.FC<{ mechanic: IMechanic }> = ({
  mechanic,
}) => {
  const mechanicShop = toJS(mechanic);
  return (
    <div>
      <Fragment>
        <Segment
          textAlign='center'
          style={{ border: "none" }}
          attached='top'
          secondary
          inverted
          color='teal'
        >
          {mechanicShop.customers && mechanicShop.customers.length} People are customers of this shop
        </Segment>
        <>
          <List divided>
            <Item.Group divided>
              {mechanicShop.customers && mechanicShop.customers.map((customer) => (
                <Segment key={customer.username}>
                  
                  <Grid>
                    <Grid.Column width={4}>
                      <Image
                        size='mini'
                        circular
                        src={customer.image || "/assets/user.png"}
                      />
                    </Grid.Column>
                    <Grid.Column width={12}>
                      <Link to={`/profile/${customer.username}`}>
                        <Item.Extra as='h5'>
                          {customer.displayName} 
                          {customer.customerRecommended && (
                          <p style={{ color: "green" }}>
                          {/* // <Item.Meta style={{ color: "green" }}> */}
                            Recommending
                          {/* // </Item.Meta> */}
                          </p>
                        )}
                        </Item.Extra>
                       
                        {customer.isOwner && (
                          <Label
                          style={{ position: 'top' }}
                          color='teal'
                          corner='right'
                        >
                          Owner
                        </Label>
                        )}
                        
                        {/* {customer.testimonial && (
                          <p>
                            
                          {customer.testimonial.text}
                          </p>
                        )} */}
                        
                      </Link>
                    </Grid.Column>
                  </Grid>
                </Segment>
              ))}
            </Item.Group>
          </List>
        </>
      </Fragment>

      <h1>Testimonials</h1>
    </div>
  );
};

export default observer(MechanicDetailedSidebar);
