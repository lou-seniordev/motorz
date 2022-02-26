import React, { Fragment, useContext, useEffect, useState } from "react";
import {  Grid, Loader} from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PeopleList from "./PeopleList";
import GalleryListItemPlaceholder from "../../gallery/dashboard/GalleryListItemPlaceholder";

const PeopleDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadPeople, loadingPeople, setPage, page, totalPages, cleanPeople } =//, cleanPeople
    rootStore.profileStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadPeople().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadPeople();
  }, [loadPeople]);

  useEffect(() => {
    return () => {
      cleanPeople()
    };
  }, [cleanPeople]);


  return (
    <Fragment>
      <Grid>
        <Grid.Column mobile={16} computer={15}>
        {loadingPeople && page === 0 ? (
          <GalleryListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <PeopleList />
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

export default observer(PeopleDashboard);
