import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import MechanicListItem from './MechanicListItem';

const MechanicList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { mechanicsByDate } = rootStore.mechanicStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {mechanicsByDate.map((mechanic) => (
          <MechanicListItem mechanic={mechanic} key={mechanic.id} />
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(MechanicList);
