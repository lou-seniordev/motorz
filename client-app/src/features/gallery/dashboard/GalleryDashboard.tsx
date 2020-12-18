import React, {  useContext, useEffect, useState } from 'react';
import { Grid, } from 'semantic-ui-react';
import agent from '../../../app/api/agent';
import { IMotofy } from '../../../app/models/motofy';
import GaleryDetails from '../details/GaleryDetails';
import GalleryForm from '../form/GalleryForm';
import GalleryList from './GalleryList';
import MotofyStore from '../../../app/stores/motofyStore';
import { observer } from 'mobx-react-lite';


const GalleryDashboard: React.FC = () => {
  const motofyStore = useContext(MotofyStore);
  const {editMode, selectedMotofy} = motofyStore;

  return (
    <Grid>
      <Grid.Column width={10}>
        <GalleryList/>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedMotofy && !editMode && (
          <GaleryDetails/>
        )}
        {editMode && (
          <GalleryForm
            key={(selectedMotofy && selectedMotofy.id) || 0}
            motofy={selectedMotofy!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(GalleryDashboard);
