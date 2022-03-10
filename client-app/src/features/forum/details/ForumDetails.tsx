import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import { RootStoreContext } from "../../../app/stores/rootStore";
import ForumDetailedChat from "./ForumDetailedChat";
import ForumDetailedHeader from "./ForumDetailedHeader";
import ForumDetailedInfo from "./ForumDetailedInfo";
import ForumDetailedManager from "./ForumDetailedManager";
import ForumDetailedRating from "./ForumDetailedRating";
import ForumDetailedSidebar from "./ForumDetailedSidebar";

interface DetailParams {
  id: string;
}
const ForumDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { forumpost, loadForumPost, loadingInitial, rated } =
    rootStore.forumPostStore;

  const { user } = rootStore.userStore;

  useEffect(() => {
    loadForumPost(match.params.id);
  }, [loadForumPost, match.params.id]);

  if (loadingInitial || !forumpost)
    return <LoadingComponent content='Loading forum post details...' />;

  return (
    <Grid>
      <Grid.Column width={12}>
        <ForumDetailedInfo forumpost={forumpost} />
        {user?.userName !== forumpost.userName && !rated && <ForumDetailedRating forumpost={forumpost} />}

        {forumpost.userName === user?.userName && (
          <ForumDetailedManager forumpost={forumpost} />
        )}
        <ForumDetailedChat />
      </Grid.Column>
      <Grid.Column width={4}>
        <ForumDetailedHeader forumpost={forumpost} />
        <ForumDetailedSidebar forumpost={forumpost} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ForumDetails);
