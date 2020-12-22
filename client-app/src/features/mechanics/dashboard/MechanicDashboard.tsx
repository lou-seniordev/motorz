import React, { useContext, useEffect } from 'react';
import { Grid, Sticky } from 'semantic-ui-react';

import MechanicList from './MechanicList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const MechanicDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadMechanics, loadingInitial } = rootStore.mechanicStore;



  useEffect(() => {
    loadMechanics();
  }, [loadMechanics]);

  if (loadingInitial) return <LoadingComponent content='Loading mechanics...' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <MechanicList/>
      </Grid.Column>

      <Grid.Column width={6}>
        <Sticky> 
         <h2>Mechanic filters go here</h2>
        </Sticky>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MechanicDashboard);
