import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import MechanicDetailedHeader from './MechanicDetailedHeader';
import MechanicDetailedInfo from './MechanicDetailedInfo';
import MechanicDetailedSidebar from './MechanicDetailedSidebar';

interface DetailParams {
  id: string
}
const MechanicDetails: React.FC<RouteComponentProps<DetailParams>> = ({match}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    mechanic,
    loadMechanic,
    loadingInitial
  } = rootStore.mechanicStore;

  useEffect(() => {
    loadMechanic(match.params.id)
  }, [loadMechanic, match.params.id])

  if (loadingInitial || !mechanic) return <LoadingComponent content='Loading mechanic shop...'/>

  return (
    <Grid>
      <Grid.Column width={8}>
        <MechanicDetailedHeader mechanic={mechanic}/>
        <MechanicDetailedInfo mechanic={mechanic}/>
      </Grid.Column>
      <Grid.Column width={8}>
        <MechanicDetailedSidebar/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(MechanicDetails);
