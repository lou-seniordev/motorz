import React, { Fragment, useContext } from 'react';
import {  Item } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import GalleryListItem from './GalleryListItem';
import { IMotofy } from '../../../app/models/motofy';
import { RootStoreContext } from '../../../app/stores/rootStore';

const GalleryList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {motofiesByDate } = rootStore.motofyStore;


  return (

      <Item.Group divided>
        {motofiesByDate.map((motofy:IMotofy) => (

          <Fragment key={motofy.id}>
            <GalleryListItem motofy={motofy} />
          </Fragment>
          
        ))}
      </Item.Group>
   
  );
};
// }

export default observer(GalleryList);
