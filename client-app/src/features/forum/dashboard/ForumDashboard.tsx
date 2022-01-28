import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ForumList from './ForumList';
import LoadingComponent from '../../../app/layout/LoadingComponent';

import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ForumDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadForumPosts,loadingInitial } = rootStore.forumPostStore;

  useEffect(() => {
    loadForumPosts();
  }, [loadForumPosts]);

  if (loadingInitial)
    return <LoadingComponent content='Loading forum posts...' />;

  return (
    <div>
      <Grid>
      {/* width={10} */}
        <Grid.Column computer={10} mobile={16} >
          <ForumList />
        </Grid.Column>
        <Grid.Column width={6} className="mobile hidden">
          <h2>Trending</h2>
          <h2>Your people are asking</h2>
          {/* <h2>You might be interested</h2> */}
          <h2>You asked</h2>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default observer(ForumDashboard);
