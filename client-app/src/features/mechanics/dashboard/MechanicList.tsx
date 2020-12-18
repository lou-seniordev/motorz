import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import MechanicStore from '../../../app/stores/mechanicStore';

const MechanicList: React.FC = () => {
  const mechanicStore = useContext(MechanicStore);
  const {
    mechanicsByDate,
    // selectMechanic,
    deleteMechanic,
    submitting,
    target,
  } = mechanicStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {mechanicsByDate.map((mechanic) => (
          <Item key={mechanic.id}>
            <Item.Content>
              <Item.Header as='a'>{mechanic.name}</Item.Header>
              <Item.Meta>{mechanic.yearOfStart}</Item.Meta>
              <Item.Description>
                <div>{mechanic.city}</div>
                <div>{mechanic.country}</div>
                <div>{mechanic.address}</div>
                <div>{mechanic.description}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  // onClick={() => selectMechanic(mechanic.id)}
                  as={Link} to={`/mechanics/${mechanic.id}`}
                  floated='right'
                  content='View'
                  color='blue'
                ></Button>
                <Button
                  loading={target === mechanic.id && submitting}
                  onClick={(e) => deleteMechanic(e, mechanic.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                ></Button>
                <Label basic content={mechanic.yearOfStart} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(MechanicList);
