import React, { useContext, useEffect } from 'react'; 
import { Grid, } from 'semantic-ui-react';
import GalleryList from './GalleryList';
import { observer } from 'mobx-react-lite';
import MotofyStore from '../../../app/stores/motofyStore';
import LoadingComponent from '../../../app/layout/LoadingComponent';


const GalleryDashboard: React.FC = () => {
  const motofyStore = useContext(MotofyStore)
  const {loadMotofies, loadingInitial} = motofyStore;
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
