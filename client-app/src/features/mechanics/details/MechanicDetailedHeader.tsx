import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { IMechanic } from "../../../app/models/mechanic";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ConfirmBecomeCustomer from "../modals/ConfirmBecomeCustomer";
import ConfirmDelete from "../modals/ConfirmDelete";

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
  const { isCustomer } = rootStore.mechanicStore;

  const handleDeleteMechanic = (id: string) => {
    openModal(<ConfirmDelete mechanicId={id} />);
    // console.log('id', id)
  };
  const handleBecomeCustomer = (id: string) => {
    openModal(<ConfirmBecomeCustomer mechanicId={id} />);
    // console.log('id', id)
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
            {!isCustomer && (
              <Button
                // as={Link}
                // to={`/manageMechanic/${mechanic.id}`}
                onClick={() => {
                  handleBecomeCustomer(mechanic.id);
                }}
                color='green'
                floated='right'
              >
                Become Customer
              </Button>
            )}
            <Button
              as={Link}
              to={`/manageMechanic/${mechanic.id}`}
              color='yellow'
              floated='right'
            >
              Recommend
            </Button>
            <Button
              as={Link}
              to={`/manageMechanic/${mechanic.id}`}
              color='blue'
              floated='right'
            >
              Write Review
            </Button>
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
