import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react"; //
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { IMechanic, IMechanicCustomer } from "../../../app/models/mechanic";
import { RootStoreContext } from "../../../app/stores/rootStore";
// import BecomeCustomer from "../modals/BecomeCustomer";
import ConfirmDelete from "../modals/ConfirmDelete";
// import ConfirmRecommend from "../modals/ConfirmRecommend";

// import ConfirmDelete from "../../gallery/modal/ConfirmDelete";

const mechanicImageStyle = {
  filter: "brightness(90%) contrast(50%) drop-shadow(4px 4px 8px teal)",
  // filter: 'contrast(50%)'
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
  const { isCustomer, hasRecommended, setCustomer, 
    setRecommend, setOpenCustomerForm, openCustomerForm, hasBecomeCustomer } =
    rootStore.mechanicStore;

  

  const handleView = (localMechanic: any) => {
    // let customer = localMechanic.customers.find((x: any) => x.username === user?.userName);

    // if(localMechanic.customers)
    // {
    //   console.log('there are some')
      localMechanic.customers.forEach((customer: IMechanicCustomer) => {
        if (user!.userName === customer.username) setCustomer(true);
      });
    // }
  };
  useEffect(() => {
    handleView(toJS(mechanic));
    // return () => {
    //   setCustomer(false);
    //   setRecommend(false);
    // };
  }, [setCustomer, setRecommend, handleView, mechanic]);

  const handleDeleteMechanic = (id: string) => {
    openModal(<ConfirmDelete mechanicId={id} />);

  };
  const handleBecomeCustomer = (id: string) => {
    setOpenCustomerForm();
  };
  
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
            {!isCustomer && !openCustomerForm && !hasBecomeCustomer && (
              <Button
                // as={Link}
                // to={`/manageMechanic/${mechanic.id}`}
                onClick={() => {
                  handleBecomeCustomer(mechanic.id);
                }}
                color='green'
                floated='right'
              >
                Register As Customer
              </Button>
            )}

            {/* {isCustomer && !hasRecommended && (
              <Button
                onClick={() => {
                  handleRecommend(mechanic.id);
                }}
                color='yellow'
                floated='right'
              >
                Recommend
              </Button>
            )}
            {isCustomer && (
              <Button
                as={Link}
                to={`/manageMechanic/${mechanic.id}`}
                color='blue'
                floated='right'
              >
                Rate & Write Review
              </Button>
            )} */}
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
                // () =>

                handleDeleteMechanic(mechanic.id!);
                // history.push("/gallery");
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
