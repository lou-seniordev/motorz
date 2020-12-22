import React, { useContext, useEffect } from 'react'; 
import { Grid, } from 'semantic-ui-react';
import GalleryList from './GalleryList';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';


const GalleryDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadMotofies, loadingInitial } = rootStore.motofyStore;

 
  useEffect(() => {
    //t
    loadMotofies();
    
  },  [loadMotofies]);

  if (loadingInitial) return <LoadingComponent content={'Loading motofies...'} />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <GalleryList/>
      </Grid.Column>
      <Grid.Column width={6}>
      <h2>Motofy filters placholder</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(GalleryDashboard);
