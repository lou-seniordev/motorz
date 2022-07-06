import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect } from "react";
import { Item } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import FeedListItem from "./FeedListItem";

const FeedList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { feedByDate, markSeenInDB } = rootStore.feedStore;


useEffect(() => {
  const markSeen = async () => {
    let ids: string[] = [];
  
    for(var i = 0, len = feedByDate.length; i < len; i++){
      if(feedByDate[i][1][0].isSeen === false)
          ids.push(feedByDate[i][1][0].id)
    }

    markSeenInDB(ids);
  }
  markSeen()
  
}, [markSeenInDB, feedByDate]);



  return (
    <Fragment>
      {feedByDate.map(([gr, feeds]) => (
        <Fragment key={gr}>
            <Item.Group divided>
              {feeds.map((feed:any) => (
                <FeedListItem feed={feed} key={feed.id} />
              ))}
            </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(FeedList);
