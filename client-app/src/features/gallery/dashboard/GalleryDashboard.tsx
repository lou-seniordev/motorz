import React, { useContext, useEffect, useState } from "react";
import { Grid, Loader, Sticky } from "semantic-ui-react";
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

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadMotofies().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    //t
    loadMotofies();
  }, [loadMotofies]);

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
      <Grid.Column width={7}>
        <Sticky style={{ marginRight: 30, position: "fixed" }}>
          <GalleryFilters/>
        </Sticky>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext}/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(GalleryDashboard);
