import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react';
import { Item, Label, Segment } from 'semantic-ui-react';
import ForumPostStore from '../../../app/stores/forumPostStore';
import ForumListItem from './ForumListItem';

const ForumList: React.FC = () => {
  const forumpostStore = useContext(ForumPostStore);
  const { forumpostsByDate } = forumpostStore; //selectForum,

  return (
    <Fragment>
      {forumpostsByDate.map(([group, forumposts]) => (
        <Fragment key={group}>
          <Label size='large' color='blue'>
           Posted on {group}
          </Label>
          <Segment clearing>
            <Item.Group divided>
              {forumposts.map((forumpost) => (
                <ForumListItem forumpost={forumpost} key={forumpost.id} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ForumList);
