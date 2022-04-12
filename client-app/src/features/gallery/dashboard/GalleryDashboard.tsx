import React, { useContext, useEffect, useState } from "react";
import { Grid, Loader, Sticky } from "semantic-ui-react"; //Loader,
import GalleryList from "./GalleryList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import GalleryFilters from "./GalleryFilters";
import GalleryMobileFilters from "./GalleryMobileFilters";
import GalleryListItemPlaceholder from "./GalleryListItemPlaceholder";

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
    loadMotofies();
  }, [loadMotofies]);

  return (
    <Grid>

      <Grid.Column mobile={16} tablet={16} className='mobile only'>

        <GalleryMobileFilters />
      </Grid.Column>
      <Grid.Column computer={11} mobile={16}>
        {loadingInitial && page === 0 ? (
          <GalleryListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <GalleryList />
          </InfiniteScroll>
        )}
      </Grid.Column>
    
      
      <Grid.Column width={5} className='mobile hidden'>
        <Sticky style={{ marginRight: 30, position: "fixed" }}>
           <GalleryFilters />
        </Sticky>
      </Grid.Column>

      <Grid.Column computer={11} mobile={16}>
      <Loader active={loadingNext}/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(GalleryDashboard);
