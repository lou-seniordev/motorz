import { observer } from "mobx-react-lite";
import React, { 
  Fragment, 
  useCallback, 
  useContext, 
  useEffect 
} from "react"; //useCallback,
import { Link } from "react-router-dom";
import { Segment,  Button, Item } from "semantic-ui-react";
import { IMechanic, IMechanicCustomer } from "../../../app/models/mechanic";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ConfirmDelete from "../modals/ConfirmDelete";

// import LoadingComponent from '../../../app/layout/LoadingComponent';

// const mechanicImageStyle = {
//   filter: "brightness(90%) contrast(50%) drop-shadow(4px 4px 8px teal)",
// };

// const mechanicImageTextStyle = {
//   position: "absolute",
//   bottom: "5%",
//   left: "5%",
//   width: "100%",
//   height: "auto",
//   color: "white",
// };

const MechanicDetailedManager: React.FC<{ mechanic: IMechanic }> = ({
  mechanic,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { openModal } = rootStore.modalStore;
  const { user } = rootStore.userStore;
  const { isCustomer, setCustomer, setOpenCustomerForm, openCustomerForm } =
    rootStore.mechanicStore;



  // const handleView = (localMechanic: any) => {
  //   localMechanic.customers.some((customer: IMechanicCustomer) => {
  //     if (user!.userName === customer.username) {
  //       setCustomer(true);
  //       return;
  //     }
  //   });
  // };

  const handleView = useCallback((localMechanic: any) => {    
    localMechanic.customers.forEach((customer: IMechanicCustomer) => {
      if (user!.userName === customer.username) setCustomer(true);
    });
}, [setCustomer, user]);

  useEffect(() => {
    handleView(mechanic);
    return () => {
    //   console.log("cleaned up");
      setCustomer(false);
    };
  }, [handleView, mechanic, setCustomer]);


  const handleDeleteMechanic = (id: string) => {
    openModal(<ConfirmDelete mechanicId={id} />);
  };
  const handleBecomeCustomer = () => {
    setOpenCustomerForm();
  };


  return (
    <Segment.Group>
     
      {/* <Segment basic attached='top' style={{ padding: "0" }}>
        <Image
          src={mechanic.photoUrl || `/assets/placeholder.png`}
          fluid
          style={mechanicImageStyle}
          rounded
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
      </Segment> */}
      <Segment clearing raised>
        <Item>

      {mechanic.name} 
        </Item>
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
              color='teal'
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

export default observer(MechanicDetailedManager);
