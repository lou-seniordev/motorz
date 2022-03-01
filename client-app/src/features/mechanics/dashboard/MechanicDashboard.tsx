import React, { useContext, useEffect, useState } from "react";
import { Grid, Loader, Sticky } from "semantic-ui-react"; //Rail,
import InfiniteScroll from "react-infinite-scroller";

import MechanicList from "./MechanicList";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import MechanicFilters from "./MechanicFilters";
import MechanicListItemPlaceholder from "./MechanicListItemPlaceholder";

const MechanicDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMechanics, loadingInitial, setPage, page, totalPages } =
    rootStore.mechanicStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadMechanics().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadMechanics();
  }, [loadMechanics]);

  return (
    <Grid>
      <Grid.Column computer={11} mobile={16}>
        {loadingInitial && page === 0 ? (
          <MechanicListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <MechanicList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={5} className='mobile hidden'>
        <Sticky style={{ marginRight: 30, position: "fixed" }}>
          <MechanicFilters />
        </Sticky>
      </Grid.Column>
      <Grid.Column computer={11} mobile={16}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(MechanicDashboard);
