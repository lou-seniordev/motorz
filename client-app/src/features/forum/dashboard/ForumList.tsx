import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Item } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ForumListItem from "./ForumListItem";

const ForumList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { forumpostsByDate } = rootStore.forumPostStore; //forumposts,

  return (
    <Fragment>
      {forumpostsByDate.map(([group, forumposts]) => (
        <Fragment key={group}>
          <Item.Group divided>
            {forumposts.map((forumpost) => (
              <ForumListItem forumpost={forumpost} key={forumpost.id} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ForumList);
