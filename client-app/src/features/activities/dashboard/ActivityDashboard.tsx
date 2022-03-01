import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Grid, Loader, Sticky } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import ActivityFilters from "./ActivityFilters";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
import ActivityMobileMenu from "./ActivityMobileMenu";
import ActivityList from "./ActivityList";

//REFACTOR or delete!!!
// import ActivityListItemMissedSearch from "./ActivityListItemMissedSearch";

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadActivities,
    loadingInitial,
    setPage,
    page,
    totalPages,
    // activityHit,
    // activityMax
  } = rootStore.activityStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadActivities().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return (
    <Grid>
      <Grid.Column mobile={16} tablet={16} className='mobile only'>
        <ActivityMobileMenu />
      </Grid.Column>
      <Grid.Column computer={9} mobile={16}>
        {loadingInitial && page === 0 ? (
          <ActivityListItemPlaceholder />
        ) : 
        // (
        //   <>
        //     {(activityHit === false && activityMax === false) ? (
        //       <ActivityListItemMissedSearch />
        //     ) : 
            (
              <InfiniteScroll
                pageStart={0}
                loadMore={handleGetNext}
                hasMore={!loadingNext && page + 1 < totalPages}
                initialLoad={false}
              >
                <ActivityList />
              </InfiniteScroll>
            )
          }
          {/* </>
        )} */}
      </Grid.Column>
      <Grid.Column width={6} className='mobile hidden'>
        <Sticky style={{ marginRight: 30, position: "fixed" }}>
          <ActivityFilters />
        </Sticky>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
