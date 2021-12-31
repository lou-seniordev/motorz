import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Segment, List, Item, Image, Grid } from "semantic-ui-react";
import { IMechanic } from "../../../app/models/mechanic";

const MechanicDetailedSidebar: React.FC<{ mechanic: IMechanic }> = ({
  mechanic,
}) => {
  // console.log(mechanic)
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
        <Segment attached>
          <List relaxed divided>
            <Item.Group divided>
              {mechanicShop.customers && mechanicShop.customers.map((customer) => (
                <Segment key={customer.username}>
                  <Grid>
                    <Grid.Column width={6}>
                      <Image
                        size='tiny'
                        circular
                        src={customer.image || "/assets/user.png"}
                      />
                    </Grid.Column>
                    <Grid.Column width={10}>
                      <Link to={`/profile/${customer.username}`}>
                        <Item.Header as='h3'>
                          {customer.displayName}
                        </Item.Header>
                        {customer.isOwner && (
                          <Item.Extra style={{ color: "orange" }}>
                            Owner
                          </Item.Extra>
                        )}
                        {customer.customerRecommended && (
                          <Item.Extra style={{ color: "green" }}>
                            Recommends it!
                          </Item.Extra>
                        )}
                      </Link>
                    </Grid.Column>
                  </Grid>
                </Segment>
              ))}
            </Item.Group>
          </List>
        </Segment>
      </Fragment>

      <h1>Testimonials</h1>
    </div>
  );
};

export default observer(MechanicDetailedSidebar);
