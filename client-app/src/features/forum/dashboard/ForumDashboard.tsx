import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Loader, Sticky } from "semantic-ui-react";
import ForumList from "./ForumList";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";

import InfiniteScroll from "react-infinite-scroller";
import ForumFilters from "../details/ForumFilters";

const ForumDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadForumPosts, loadingInitial, setPage, page, totalPages } =
    rootStore.forumPostStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadForumPosts().then(() => setLoadingNext(false));
  };
  useEffect(() => {
    loadForumPosts();
  }, [loadForumPosts]);

  if (loadingInitial && page === 0)
    return <LoadingComponent content='Loading forum posts...' />;

  return (
    <div>
      <Grid>
        {/* width={10} */}
        <Grid.Column computer={9} mobile={16}>
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <ForumList />
          </InfiniteScroll>
        </Grid.Column>
        <Grid.Column width={6} className='mobile hidden'>
          <Sticky style={{ marginRight: 30, position: "fixed" }}>
            <ForumFilters />
          </Sticky>
        </Grid.Column>
        <Grid.Column width={10}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default observer(ForumDashboard);
