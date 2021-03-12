import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { IMechanic } from '../../../app/models/mechanic';

const MechanicListItem: React.FC<{ mechanic: IMechanic }> = ({ mechanic }) => {
  //   console.log(mechanic);
  return (
    <Segment.Group>
      <Segment>
        <Item>
          <Item.Group>
            <Label basic content={mechanic.city} />
            <Item>
              <Item.Image size='tiny' circular src={mechanic.photoUrl} />
              <Item.Content>
                <Item.Header as='a'>{mechanic.name}</Item.Header>
                <Item.Description>Posted by Bob</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Item>
      </Segment>
      <Segment>
        <Icon name='clock outline' /> {mechanic.datePublished}
        {/* <Icon name='history'/> {mechanic.yearOfStart} */}
      </Segment>
      <Segment clearing>
        <span>
          <Icon name='sitemap' /> {mechanic.description}
        </span>
      </Segment>
      <Segment clearing>
        <Icon name='envelope outline' /> {mechanic.city}, {mechanic.country}, 
        {mechanic.address}
        {/* <Item.Extra> */}
          <Button
            // onClick={() => selectMechanic(mechanic.id)}
            as={Link}
            to={`/mechanics/${mechanic.id}`}
            floated='right'
            content='View'
            color='blue'
          ></Button>
        {/* </Item.Extra> */}
      </Segment>
    </Segment.Group>
  );
};

export default MechanicListItem;
