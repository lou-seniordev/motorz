import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect, useState } from "react"; //
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { IMechanic, IMechanicCustomer } from "../../../app/models/mechanic";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ConfirmDelete from "../modals/ConfirmDelete";
import { useCallback } from 'react'


import LoadingComponent from '../../../app/layout/LoadingComponent';

const mechanicImageStyle = {
  filter: "brightness(90%) contrast(50%) drop-shadow(4px 4px 8px teal)",
};

const mechanicImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const MechanicDetailedHeader: React.FC<{ mechanic: IMechanic }> = ({
  mechanic,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { openModal } = rootStore.modalStore;
  const { user } = rootStore.userStore;
  const { isCustomer,  setCustomer, 
     setOpenCustomerForm, openCustomerForm } =
    rootStore.mechanicStore;

  
  const [customerChecked, setCustomerChecked] = useState(false);

  const handleView = useCallback((localMechanic: any) => {    
      localMechanic.customers.forEach((customer: IMechanicCustomer) => {
        if (user!.userName === customer.username) setCustomer(true);
      });
      setCustomerChecked(true);
  }, [setCustomer, user]);
  

  
  useEffect(() => {
    handleView(toJS(mechanic));
    
  }, [handleView, mechanic]);


  useEffect(() => {
    setCustomer(false);
    setCustomerChecked(false);
  }, [setCustomer]);

  const handleDeleteMechanic = (id: string) => {
    openModal(<ConfirmDelete mechanicId={id} />);

  };
  const handleBecomeCustomer = () => {//mechanic.id, id: string
    setOpenCustomerForm();
  };

  if (!customerChecked)
  return <LoadingComponent content='Loading mechanic shop...' />;
  
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: "0" }}>
        <Image
          src={mechanic.photoUrl || `/assets/placeholder.png`}
          fluid
          style={mechanicImageStyle}
        />
        <Segment basic style={mechanicImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={mechanic.name}
                  style={{ color: "white" }}
                />
                <p>Working since {mechanic.yearOfStart}</p>
                <p>
                  Posted by <strong>{mechanic.publisher}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {mechanic.publisherUsername !== user?.userName && (
          <Fragment>
            {!isCustomer && !openCustomerForm && (
              <Button
                onClick={() => {
                  handleBecomeCustomer();
                }}
                color='green'
                floated='right'
              >
                Register As Customer
              </Button>
            )}
          </Fragment>
        )}
        {mechanic.publisherUsername === user?.userName && (
          <Fragment>
            <Button
              as={Link}
              to={`/manageMechanic/${mechanic.id}`}
              color='orange'
              floated='right'
            >
              Manage Post
            </Button>
            <Button
              onClick={() => {
                handleDeleteMechanic(mechanic.id!);
              }}
              color='red'
              floated='right'
            >
              Delete
            </Button>
          </Fragment>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(MechanicDetailedHeader);
