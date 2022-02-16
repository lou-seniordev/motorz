import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Item, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import FeedListItem from "./FeedListItem";

const FeedList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { feedByDate } = rootStore.feedStore;

  return (
    <Fragment>
      {feedByDate.map(([gr, feeds]) => (
        <Fragment key={gr}>
            <Item.Group divided>
              {feeds.map((feed) => (
                <FeedListItem feed={feed} key={feed.id} />
              ))}
            </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(FeedList);
