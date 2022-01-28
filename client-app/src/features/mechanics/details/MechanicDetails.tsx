import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import CustomerForm from "../form/CustomerForm";
import MechanicDetailedChat from "./MechanicDetailedChat";
import MechanicDetailedHeader from "./MechanicDetailedHeader";
import MechanicDetailedInfo from "./MechanicDetailedInfo";
import MechanicDetailedSidebar from "./MechanicDetailedSidebar";

interface DetailParams {
  id: string;
}
const MechanicDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  
  const {
    mechanic,
    loadMechanic,
    loadingInitial,
    openCustomerForm,
    isCustomer
  } = rootStore.mechanicStore;

  useEffect(() => {
      loadMechanic(match.params.id);     
  }, [loadMechanic, match.params.id]); 

  if (loadingInitial || !mechanic)
    return <LoadingComponent content='Loading mechanic shop...' />;

  return (
    <Grid>
      {/* width={11} */}
      <Grid.Column computer={11} mobile={16} >
        <MechanicDetailedHeader mechanic={mechanic} />
         { openCustomerForm && <CustomerForm mechanicId={mechanic.id} />}
        <MechanicDetailedInfo mechanic={mechanic} />
       {isCustomer && <MechanicDetailedChat />}
      </Grid.Column>
      {/* width={4}  */}
      <Grid.Column computer={4} mobile={16} >
        <MechanicDetailedSidebar mechanic={mechanic} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(MechanicDetails);
