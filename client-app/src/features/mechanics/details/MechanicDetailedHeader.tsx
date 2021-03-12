import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react'
import { IMechanic } from '../../../app/models/mechanic';

const activityImageStyle = {
    filter: 'brightness(90%) contrast(50%) drop-shadow(4px 4px 8px teal)'
    // filter: 'contrast(50%)'
  };
  
  const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
  };

const MechanicDetailedHeader: React.FC<{mechanic: IMechanic}> = ({mechanic}) => {
    return (
        <Segment.Group>
        <Segment basic attached='top' style={{ padding: '0' }}>
          <Image src={mechanic.photoUrl || `/assets/placeholder.png`} fluid style={activityImageStyle}/>
          <Segment basic style={activityImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size='huge'
                    content={mechanic.name}
                    style={{ color: 'white' }}
                  />
                  <p>Working since {mechanic.yearOfStart}</p>
                  <p>
                    Posted by <strong>Bob</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment clearing attached='bottom'>
          {/* <Button color='teal'>Join Activity</Button>
          <Button>Cancel attendance</Button> */}
          <Button as={Link} to={`/manageMechanic/${mechanic.id}`} color='orange' floated='right'>
            Manage Post
          </Button>
        </Segment>
      </Segment.Group>
    )
}

export default observer(MechanicDetailedHeader)
