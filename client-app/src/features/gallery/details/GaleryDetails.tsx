import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {  Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import GaleryDetailedChat from './GaleryDetailedChat';
import GaleryDetailedHeader from './GaleryDetailedHeader';
import GaleryDetailedRating from './GaleryDetailedRating';
import GaleryDetailedSidebar from './GaleryDetailedSidebar';
import GalleryDetailedInfo from './GalleryDetailedInfo';

interface DetailParams {
  id: string;
}
const GaleryDetails: React.FC<RouteComponentProps<DetailParams>> = ({  
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {motofy, loadMotofy, loadingInitial } = rootStore.motofyStore;

  useEffect(() => {
    loadMotofy(match.params.id);
  }, [loadMotofy, match.params.id]);

  if (loadingInitial || !motofy)
    return <LoadingComponent content='Loading motofies...' />;

  return (
    <Grid>
      <Grid.Column width={12}>
        <GaleryDetailedHeader motofy={motofy}/>
        <GaleryDetailedRating/>
        <GalleryDetailedInfo motofy={motofy}/>

        <GaleryDetailedChat />
      </Grid.Column>
      <Grid.Column width={4}>
        <GaleryDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(GaleryDetails);
