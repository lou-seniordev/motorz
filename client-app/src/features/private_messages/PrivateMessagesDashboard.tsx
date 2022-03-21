import React, { useContext, useEffect, useState } from "react";
import { Grid, Segment } from "semantic-ui-react"; //, Loader
import InfiniteScroll from "react-infinite-scroller";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import PrivateMessageThreadList from "./PrivateMessageThreadList";
import MessagesListItemPlaceholder from "../messages/dashboard/MessagesListItemPlaceholder";
import PrivateMessageThreadListItem from "./PrivateMessageThreadListItem";

const PrivateMessagesDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMessages, loadingInitial, setPage, page, totalPages, last } =
    rootStore.privateMessageStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadMessages().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return (
    <Segment
      style={{ backgroundColor: "lightblue" }}
      raised
      // className='sideScroll'
    >
      <Grid style={{ margin: "0", padding: "0" }}>
        {/* <Grid.Column width={12}> */}
        {loadingInitial && page === 0 ? (
          <Grid.Row>
            <Grid.Column width={16}>
              <MessagesListItemPlaceholder />
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid.Row>
            <Grid.Column width={4}>
              <InfiniteScroll
                pageStart={0}
                loadMore={handleGetNext}
                hasMore={!loadingNext && page + 1 < totalPages}
                initialLoad={false}
              >
                <PrivateMessageThreadList />
              </InfiniteScroll>
            </Grid.Column>
            <Grid.Column width={12}>
              {last && <PrivateMessageThreadListItem />}
            </Grid.Column>
          </Grid.Row>
        )}
        {/* </Grid.Column> */}
      </Grid>
    </Segment>
  );
};

export default observer(PrivateMessagesDashboard);
