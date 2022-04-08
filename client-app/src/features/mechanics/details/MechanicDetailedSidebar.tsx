import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Segment,
  List,
  Item,
  Image,
  Grid,
  Label,
  Button,
  Popup,
} from "semantic-ui-react";
import { IMechanic, IMechanicCustomer } from "../../../app/models/mechanic";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ShowTestimonial from "../modals/ShowTestimonial";


const MechanicDetailedSidebar: React.FC<{ mechanic: IMechanic }> = ({
  mechanic,
}) => {
  const mechanicShop = toJS(mechanic);
  const rootStore = useContext(RootStoreContext);

  const { openModal } = rootStore.modalStore;

  const { t } = useTranslation(["mechanics"]);


  const handleShowTestimonial = (customer: IMechanicCustomer, mechanic:IMechanic) => {
    openModal(<ShowTestimonial customer={customer} mechanic={mechanic}/>);
  };
  return (
    <>
      <Fragment>
        <Segment
          textAlign='center'
          style={{ border: "none" }}
          attached='top'
          secondary
          inverted
          color='teal'
        >
          {mechanicShop.customers && mechanicShop.customers.length > 1 
          ? mechanicShop.customers.length + t("People are customers") : mechanicShop.customers.length + t("Person is customer")}  
           {t("of this shop")}
        </Segment>
        <>
          <List divided>
            <Item.Group divided>
              {mechanicShop.customers &&
                mechanicShop.customers.map((customer) => (
                  <Segment key={customer.username}>
                    <Grid>
                      <Grid.Column width={4}>
                        <Image
                          size='mini'
                          circular
                          src={customer.image || "/assets/user.png"}
                        />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Link to={`/profile/${customer.username}`}>
                          <Item.Extra as='h5'>
                            {customer.displayName}
                            {customer.customerRecommended && (
                              <p style={{ color: "green" }}>{t("Recommending")}</p>
                            )}
                          </Item.Extra>

                          {customer.isOwner && (
                            <Label
                              style={{ position: "top" }}
                              color='teal'
                              corner='right'
                            >
                              {t("Owner")}
                            </Label>
                          )}
                        </Link>
                      </Grid.Column>
                      <Grid.Column width={2}>
                        {customer.testimonial && (
                        <Popup 
                          content={customer.displayName + t("'s testimony about") + mechanic.name} 
                          className='computer large screen only'
                          trigger={
                            <Button
                              circular
                              icon='comment alternate'
                              color='instagram'
                              // className='hidePopup'
                              onClick={() => 
                                handleShowTestimonial(customer, mechanic) 
                              }
                            />
                          }
                        />
                        )}
                      </Grid.Column>
                    </Grid>
                  </Segment>
                ))}
            </Item.Group>
          </List>
        </>
      </Fragment>
    </>
  );
};

export default observer(MechanicDetailedSidebar);
