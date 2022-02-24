import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react';
import { Item,  Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ForumListItem from './ForumListItem';

const ForumList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {  forumpostsByDate} = rootStore.forumPostStore;//forumposts,

  return (
    <Fragment>
      {forumpostsByDate.map(([group, forumposts]) => (
        <Fragment key={group}>
         
          <Segment clearing>
            <Item.Group divided>
              {forumposts.map((forumpost) => (
                <ForumListItem forumpost={forumpost} key={forumpost.id} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
       {/* <Segment clearing>
            <Item.Group divided>
              {forumposts.map((forumpost) => (
                <ForumListItem forumpost={forumpost} key={forumpost.id} />
              ))}
            </Item.Group>
          </Segment> */}
    </Fragment>
  );
};

export default observer(ForumList);
