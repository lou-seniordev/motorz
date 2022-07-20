import React, { Fragment, useContext, useEffect, useState } from "react";
import {  Grid, Loader} from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import FeedList from "./FeedList";
import FeedListItemPlaceholder from "./FeedListItemPlaceholder";

const FeedDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadFeed, loadingInitial, setPage, page, totalPages} =//, key 
    rootStore.feedStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadFeed().then(() => setLoadingNext(false));
  };

  // let key = 1;
  // const [key, setKey] = useState(1);

  useEffect(() => {
    loadFeed();
  }, [loadFeed]);

  return (
    <Fragment>
      <Grid>
        <Grid.Column mobile={16} computer={15}>
        {loadingInitial && page === 0 ? (
          <FeedListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <FeedList />
            {/* key={key} */}
          </InfiniteScroll>
            )}
        </Grid.Column>
        <Grid.Column mobile={16} computer={15}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(FeedDashboard);
