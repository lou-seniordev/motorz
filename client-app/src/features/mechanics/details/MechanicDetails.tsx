import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";//, useState
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
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
  const { user } = rootStore.userStore;
  let username = user?.userName;
  const {
    mechanic,
    loadMechanic,
    loadingInitial,
    // setCustomer
  } = rootStore.mechanicStore;

  useEffect(() => {
      loadMechanic(match.params.id);//, username      
  }, [loadMechanic, match.params.id]); //setCustomer,

  if (loadingInitial || !mechanic)
    return <LoadingComponent content='Loading mechanic shop...' />;

  return (
    <Grid>
      <Grid.Column width={11}>
        <MechanicDetailedHeader mechanic={mechanic} />
        <MechanicDetailedInfo mechanic={mechanic} />
        <MechanicDetailedChat />
      </Grid.Column>
      <Grid.Column width={4}>
        <MechanicDetailedSidebar mechanic={mechanic} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(MechanicDetails);
