import React, { Fragment, useContext } from 'react';
import {  Item, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import GalleryListItem from './GalleryListItem';
import { IMotofy } from '../../../app/models/motofy';
import { RootStoreContext } from '../../../app/stores/rootStore';

const GalleryList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {motofiesByDate } = rootStore.motofyStore;

  return (
    <Segment secondary>
      <Item.Group divided>
        {motofiesByDate.map((motofy:IMotofy) => (
          <Fragment key={motofy.id}>
            <Label size='large' color='blue'><span>Name:</span> {motofy.name}</Label>
            <GalleryListItem motofy={motofy}/>
          </Fragment>
        ))}
      </Item.Group>
    </Segment>
  );
};
// }

export default observer(GalleryList);
