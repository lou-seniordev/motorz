import React, { useContext, useEffect } from "react";
import { Grid, Sticky } from "semantic-ui-react";
import GalleryList from "./GalleryList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const GalleryDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMotofies, loadingInitial } = rootStore.motofyStore;

  useEffect(() => {
    //t
    loadMotofies();
  }, [loadMotofies]);

  if (loadingInitial)
    return <LoadingComponent content={"Loading motofies..."} />;
  return (
    <Grid>
      {/* <Grid.Column width={3}>
        <Sticky style={{ marginRight: 30, position: "fixed" }}>
          <h2>Motofy filters left</h2>
        </Sticky>
      </Grid.Column> */}
      <Grid.Column width={10}>
        <GalleryList />
      </Grid.Column>
      <Grid.Column width={6}>
        <Sticky style={{ marginRight: 30, position: "fixed" }}>
          <h2>Motofy I embraced</h2>
          <h2>Motofy The bests</h2>
          <h2>Motofy fMotofies my people</h2>
          <h2>Motofy on a date</h2>
        </Sticky>
      </Grid.Column>
    </Grid>
  );
};

export default observer(GalleryDashboard);
