import React, { useContext, useEffect, useState } from "react";
import { Grid,  Sticky } from "semantic-ui-react";//Loader,
import GalleryList from "./GalleryList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import GalleryFilters from "./GalleryFilters";

const GalleryDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMotofies, loadingInitial, setPage, page, totalPages } =
    rootStore.motofyStore;
  const [loadingNext, setLoadingNext] = useState(false);
  // const [loadingBest, setLoadingBest] = useState(null);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadMotofies().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadMotofies();
  }, [loadMotofies]);
  
  // const handleGetMostEmbraced = () => {
  //   // console.log("mostEmbraced: ", mostEmbraced)
  //   //   console.log(mostEmbraced);

  // }

  if (loadingInitial && page === 0)
    return <LoadingComponent content={"Loading motofies..."} />;

  return (
    <Grid>
      <Grid.Column width={9}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <GalleryList />
        </InfiniteScroll>
       
      </Grid.Column>
      <Grid.Column width={2}>
        <Sticky style={{ marginRight: 30, position: "fixed" }}>
        {/* handleGetMostEmbraced={handleGetMostEmbraced} */}
          <GalleryFilters />
        </Sticky>
      </Grid.Column>

      {/* Find what is it!!! */}
      <Grid.Column width={5}>
        {/* <Loader active={loadingNext}/> */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(GalleryDashboard);
