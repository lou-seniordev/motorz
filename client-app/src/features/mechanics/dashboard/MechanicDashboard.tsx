import React, { useContext, useEffect } from "react"; 
import { Grid, Sticky } from "semantic-ui-react"; //Rail,

import MechanicList from "./MechanicList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const MechanicDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMechanics, loadingInitial } = rootStore.mechanicStore;

  useEffect(() => {
    loadMechanics();
  }, [loadMechanics]);

  if (loadingInitial)
    return <LoadingComponent content='Loading mechanics...' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <MechanicList />
      </Grid.Column>
      <Grid.Column width={6}>
        <Sticky style={{ marginRight: 30, position: "fixed" }}>
          <h2>Mechanic around you</h2>
          <h2>Mechanic You went to</h2>
          <h2>Mechanics everbody recommends</h2>
        </Sticky>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MechanicDashboard);
