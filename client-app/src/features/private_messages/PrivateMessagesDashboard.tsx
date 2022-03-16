import React, { useContext, useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
// import { RootStoreContext } from "../../../app/stores/rootStore";
import PrivateMessageThreadList from "./PrivateMessageThreadList";
import MessagesListItemPlaceholder from "../messages/dashboard/MessagesListItemPlaceholder";
// import PrivateMessageThreadListItem from "./PrivateMessageThreadListItem";
// import MessagesListItemPlaceholder from "./MessagesListItemPlaceholder";

const PrivateMessagesDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMessages, loadingInitial, setPage, page, totalPages } =
    rootStore.privateMessageStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadMessages().then(() => setLoadingNext(false));
  };
  
//   let last:any;

  useEffect(() => {
    loadMessages();
    // last = getLast()
    // console.log(last)
  }, [loadMessages]);

  

  return (
    <Grid>
      <Grid.Column width={16}>
        {loadingInitial && page === 0 ? (
          <MessagesListItemPlaceholder />
        // <h1>Placeholder</h1>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
            <PrivateMessageThreadList/>
            {/* <PrivateMessageThreadList last={last}/> */}
          </InfiniteScroll>
        )}
      </Grid.Column>
      {/* <Grid.Column width={12}>
          <PrivateMessageThreadListItem/>
      </Grid.Column> */}
      <Grid.Column computer={16} mobile={16}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(PrivateMessagesDashboard);
