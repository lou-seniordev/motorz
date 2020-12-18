import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ForumList from './ForumList';
import LoadingComponent from '../../../app/layout/LoadingComponent';

import ForumPostStore from '../../../app/stores/forumPostStore';
import { observer } from 'mobx-react-lite';

const ForumDashboard = () => {
  const forumpostStore = useContext(ForumPostStore);

  useEffect(() => {
    forumpostStore.loadForumPosts();
  }, [forumpostStore]);

  if (forumpostStore.loadingInitial)
    return <LoadingComponent content='Loading forum posts...' />;

  return (
    <div>
      <Grid>
        <Grid.Column width={10}>
          <ForumList />
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Forum post filters will come here</h2>
          {/* {forumpost && !editMode && <ForumDetails />}
          {editMode && (
            <ForumForm
              key={(forumpost && forumpost.id) || 0}
              forumpost={forumpost!}
            />
          )} */}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default observer(ForumDashboard);
