import React  from 'react';//{ useContext, useEffect }
import { Grid } from 'semantic-ui-react';
// import { RootStoreContext } from '../../../app/stores/rootStore';
// import GalleryList from './GalleryList';
import { observer } from 'mobx-react-lite';

const GalleryPage = () => {

  // const rootStore = useContext(RootStoreContext);
  // const {loadMotofies} = rootStore.motofyStore; //loadMotofies, motofies

    // useEffect ( () => {
    //   loadMotofies()
    // }, [loadMotofies]);


  // const [motofies, setMotofies] = useState<IMotofy[]>([]);
  // const [selectedMotofy, setSelectedMotofy] = useState<IMotofy | null>(null);

  // const handleSelectMotofy = (id: string) => {
  //   setSelectedMotofy(motofies.filter((m) => m.id === id)[0]);
  // };

  return (
    <Grid>
      {/* <Grid.Column width={3}>
        <h2 style={{ minHeight: '300px' }}>Left sidebar</h2>
      </Grid.Column>
      <Grid.Column width={10}>
      </Grid.Column>
      <Grid.Column width={3}>
        <h2 style={{ minHeight: '300px' }}>Right sidebar</h2>
      </Grid.Column> */}
    </Grid>
  );
};

export default observer(GalleryPage);
