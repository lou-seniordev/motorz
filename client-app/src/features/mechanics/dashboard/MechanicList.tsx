import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Item } from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import MechanicListItem from './MechanicListItem';

const MechanicList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { mechanicsByDate } = rootStore.mechanicStore;

  return (
      <Item.Group divided>
        {mechanicsByDate.map((mechanic) => (
          <MechanicListItem mechanic={mechanic} key={mechanic.id} />
        ))}
      </Item.Group>
  );
};

export default observer(MechanicList);
