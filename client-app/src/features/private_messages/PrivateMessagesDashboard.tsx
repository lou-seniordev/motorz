import React, { useContext, useEffect, useState } from "react";
import { Grid, Segment } from "semantic-ui-react"; //, Loader
import InfiniteScroll from "react-infinite-scroller";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../app/stores/rootStore";
import PrivateMessageThreadList from "./PrivateMessageThreadList";
import PrivateMessageThreadListItem from "./PrivateMessageThreadListItem";
import PrivateMessageReply from "./PrivateMessageReply";
import PrivateMessagesListItemPlaceholder from "./PrivateMessagesListItemPlaceholder";

const PrivateMessagesDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadMessages,
    loadingInitial,
    setPage,
    page,
    totalPages,
    listOfMessagesInFocus,
  } = rootStore.privateMessageStore;

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
      id='top'
      // className='sideScroll'
    >
      <Grid style={{ margin: "0", padding: "0" }}>
        {loadingInitial && page === 0 ? (
          <Grid.Row>
            <Grid.Column width={16}>
              <PrivateMessagesListItemPlaceholder />
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
              <Grid.Row>
                {listOfMessagesInFocus && <PrivateMessageThreadListItem />}

                <PrivateMessageReply />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Segment>
  );
};

export default observer(PrivateMessagesDashboard);
