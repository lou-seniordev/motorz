import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import CustomerForm from "../form/CustomerForm";
import MechanicDetailedChat from "./MechanicDetailedChat";
import MechanicDetailedHeader from "./MechanicDetailedHeader";
import MechanicDetailedInfo from "./MechanicDetailedInfo";
import MechanicDetailedManager from "./MechanicDetailedManager";
import MechanicDetailedSidebar from "./MechanicDetailedSidebar";

interface DetailParams {
  id: string;
}
const MechanicDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const [ready, setReady] = useState(false);

  const {
    mechanic,
    loadMechanic,
    loadingInitial,
    openCustomerForm,
    isCustomer,
    // hasNotCancelledCustomer
  } = rootStore.mechanicStore;

  // const

  useEffect(() => {
      loadMechanic(match.params.id);  
      setReady(true)   
  }, [loadMechanic, match.params.id]); 

  if (loadingInitial || !mechanic || !ready)
    return <LoadingComponent content='Loading mechanic shop...' />;

  // if()

  return (
    <Grid>
      {/* width={11} */}
      <Grid.Column computer={11} mobile={16} >
        <MechanicDetailedHeader mechanic={mechanic} />
        <MechanicDetailedManager mechanic={mechanic}/>
         { openCustomerForm && <CustomerForm mechanicId={mechanic.id} />}
        <MechanicDetailedInfo mechanic={mechanic} />
       {isCustomer  && <MechanicDetailedChat />}
      </Grid.Column>
      {/* width={4}  */}
      <Grid.Column computer={4} mobile={16} >
        <MechanicDetailedSidebar mechanic={mechanic} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(MechanicDetails);
