import React, { useContext, useEffect, createRef } from 'react';
import { Grid,  Sticky } from 'semantic-ui-react';//Rail,

import MechanicList from './MechanicList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';

const MechanicDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadMechanics, loadingInitial } = rootStore.mechanicStore;


  
  const contextRef: React.RefObject<any>  = createRef();


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
      {/*  */}
      {/* <Rail position='left'> */}
      {/* context={contextRef} */}
        <Sticky style={{marginRight: 30, position: 'fixed'}}> 
         <h2 >Mechanic filters go here</h2>
        </Sticky>
      {/* </Rail> */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(MechanicDashboard);
