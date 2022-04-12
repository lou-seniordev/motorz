import { observer } from "mobx-react-lite";
import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Segment, Button, Item, Grid, GridColumn } from "semantic-ui-react";
import { IMechanic, IMechanicCustomer } from "../../../app/models/mechanic";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ConfirmDelete from "../modals/ConfirmDelete";

const MechanicDetailedManager: React.FC<{ mechanic: IMechanic }> = ({
  mechanic,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { openModal } = rootStore.modalStore;
  const { user } = rootStore.userStore;

  const { t } = useTranslation(["mechanics"]);

  const [managing, setManaging] = useState(false);

  const {
    isCustomer,
    setCustomer,
    setOpenCustomerForm,
    openCustomerForm,
    setCloseCustomerForm,
  } = rootStore.mechanicStore;

  const handleView = useCallback(
    (localMechanic: any) => {
      localMechanic.customers.forEach((customer: IMechanicCustomer) => {
        if (user!.userName === customer.username) setCustomer(true);
      });
    },
    [setCustomer, user]
    );
    
    useEffect(() => {
    handleView(mechanic);
    return () => {
      setCustomer(false);
      setCloseCustomerForm();
    };
  }, [handleView, mechanic, setCustomer, setCloseCustomerForm]);

  const handleDeleteMechanic = (id: string) => {
    openModal(<ConfirmDelete mechanicId={id} />);
  };
  const handleBecomeCustomer = () => {
    setOpenCustomerForm();
  };

  const toggleManaging = () => {
    setManaging(true);
  };

  return (
    <Segment.Group>
      <Segment clearing raised>
        <Item>{mechanic.name}</Item>
        {mechanic.publisherUsername !== user?.userName && (
          <Fragment>
            {!isCustomer && !openCustomerForm && (
              <Button
                onClick={() => {
                  handleBecomeCustomer();
                }}
                color='instagram'
                fluid
              >
                {t("Register As Customer")}
              </Button>
            )}
          </Fragment>
        )}
         {mechanic.publisherUsername === user?.userName &&
          (!managing ? (
            <Button onClick={toggleManaging} color='instagram' fluid>
              {t("Manage mechanic")}
            </Button>
          ) : (
            <Grid>
              <GridColumn width={5}>
                <Button
                  as={Link}
                  to={`/manageMechanic/${mechanic.id}`}
                  color='teal'
                  fluid
                >
                  {t("Manage")}
                </Button>
              </GridColumn>
              <GridColumn width={5}>
                <Button
                  onClick={() => {
                    handleDeleteMechanic(mechanic.id!);
                  }}
                  color='red'
                  fluid
                >
                  {t("Delete")}
                </Button>
              </GridColumn>
              <GridColumn width={5}>
              <Button
                  onClick={() => {
                    setManaging(false);
                  }}
                  color='grey'
                  fluid
                >
                  {t("Cancel")}
                </Button>
              </GridColumn>
            </Grid>
          ))
         
        }
      </Segment>
    </Segment.Group>
  );
};

export default observer(MechanicDetailedManager);
