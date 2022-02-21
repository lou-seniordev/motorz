import React, { Fragment, useContext, useEffect, useState } from "react";
import {  Grid, Loader} from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import FeedList from "./FeedList";

const FeedDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadFeed, loadingInitial, setPage, page, totalPages } =
    rootStore.feedStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadFeed().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  if (loadingInitial && page === 0)
    //
    return <LoadingComponent content='Loading feed...' />;

  return (
    <Fragment>
      <Grid>
        <Grid.Column mobile={16} computer={15}>
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <FeedList />
          </InfiniteScroll>
        </Grid.Column>
        <Grid.Column mobile={16} computer={15}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(FeedDashboard);
