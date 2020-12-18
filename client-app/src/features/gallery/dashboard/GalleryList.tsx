import React, { useContext } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { IMotofy } from '../../../app/models/motofy';
import { observer } from 'mobx-react-lite';
import MotofyStore from '../../../app/stores/motofyStore';


const GalleryList: React.FC = () => {
  const motofyStore = useContext(MotofyStore);
  const {motofiesByDate, selectMotofy, deleteMotofy, submitting, target} = motofyStore;

  return (
    <Segment clearing>
      <Item.Group divided>
        {motofiesByDate.map((motofy) => (
          <Item key={motofy.id}>
            <Item.Content>
              <Item.Header as='a'>{motofy.name}</Item.Header>
              <Item.Meta>{motofy.brand}</Item.Meta>
              <Item.Meta>{motofy.model}</Item.Meta>
              <Item.Description>
                <div>{motofy.description}</div>
                <div>{motofy.yearOfProduction}</div>
                <div>{motofy.datePublished}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectMotofy(motofy.id)}
                  floated='right'
                  content='View'
                  color='blue'
                ></Button>
                <Button
                  onClick={(e) => deleteMotofy(e, motofy.id)}
                  floated='right'
                  content='Delete'
                  color='red'
                ></Button>
                <Label basic content={motofy.estimatedValue} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};
// }

export default observer(GalleryList);
