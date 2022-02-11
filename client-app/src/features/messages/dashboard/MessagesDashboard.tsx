import React, { useContext, useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import MessageThreadList from "./MessageThreadList";
import InfiniteScroll from "react-infinite-scroller";
import MessagesListItemPlaceholder from "./MessagesListItemPlaceholder";

const MessageDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMessages, loadingInitial, setPage, page, totalPages } =
    rootStore.messageStore; //

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
    <Grid>
      <Grid.Column width={16}>
        {loadingInitial && page === 0 ? (
          <MessagesListItemPlaceholder />
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <MessageThreadList />
          </InfiniteScroll>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(MessageDashboard);
