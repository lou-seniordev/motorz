import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader, Sticky } from 'semantic-ui-react';
import ActivityList from './ActivityList';
// import LoadingComponent from '../../../app/layout/LoadingComponent';
import { RootStoreContext } from '../../../app/stores/rootStore';
import InfiniteScroll from 'react-infinite-scroller';
import ActivityFilters from './ActivityFilters';
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';
import ActivityMobileMenu from './ActivityMobileMenu';

const ActivityDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadActivities,
    loadingInitial,
    setPage,
    page,
    totalPages,
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

  // if (loadingInitial && page === 0)
  //   return <LoadingComponent content='Loading Activities...' />;

  return (
    <Grid>
       <Grid.Column mobile={16} tablet={16} className="mobile only" >
      {/* embracers={motofy.embracers} */}
        <ActivityMobileMenu  />
      </Grid.Column>
       {/* width={10} */}
      <Grid.Column computer={9} mobile={16}>
        {loadingInitial && page === 0 ? <ActivityListItemPlaceholder/> : (

        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <ActivityList />
        </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={6} className="mobile hidden">
        <Sticky style={{marginRight: 30, position: 'fixed'}} >
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
