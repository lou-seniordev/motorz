import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item,  Segment } from 'semantic-ui-react'
// import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';

import { IMotofy } from '../../../app/models/motofy'

interface IProps {
  motofy: IMotofy
}
const GalleryListItem: React.FC<IProps> = ({motofy}) => {
    return (
      //   <Card>
      //   <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
      //   <Card.Content>
      //     <Card.Header>Matthew</Card.Header>
      //     <Card.Meta>
      //       <span className='date'>Joined in 2015</span>
      //     </Card.Meta>
      //     <Card.Description>
      //       Matthew is a musician living in Nashville.
      //     </Card.Description>
      //   </Card.Content>
      //   <Card.Content extra>
      //     <a>
      //       <Icon name='user' />
      //       22 Friends
      //     </a>
      //   </Card.Content>
      // </Card>
      <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            {/*  */}
            <Item.Image
              // size='tiny'
              // circular
              // src={host.image || '/assets/user.png'}
              // style={{ marginBottom: 3 }}
              size='medium' src={motofy.photoUrl}
            />
            <Item.Content>
              <Item.Content>
                <Item.Header 
                  // as={Link} to={`/activities/${activity.id}`}
                  as={Link} to={`/motofies/${motofy.id}`}
                  >
                  {motofy.name}
                </Item.Header>

                <Item.Description>
                  {/* Hosted by{' '}
                  <Link to={`/profile/${host.username}`}>
                    {' '}
                    {host.displayName}
                  </Link> */}
                </Item.Description>
                {/* {activity.isHost && (
                  <Item.Description>  
                    <Label
                      basic
                      color='orange'
                      content='You are hosting this activity'
                    />
                  </Item.Description>
                )}
                {activity.isGoing && !activity.isHost && (
                  <Item.Description>
                    <Label
                      basic
                      color='green'
                      content='You are going to this activity'
                    />
                  </Item.Description>
                )} */}
              </Item.Content>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        {/* <Icon name='clock' /> {format(motofy.datePublished, 'h:mm:a')} */}
        <Icon name='clock' /> {motofy.datePublished}
        <Icon name='marker' />  {motofy.city}
      </Segment>
      {/* <Segment secondary>
       </Segment> */}
      <Segment clearing>
        <span>{motofy.description}</span>
        <Button
          as={Link}
          to={`/gallery/${motofy.id}`}
          floated='right'
          content='view'
          color='blue'
        />
      </Segment>
    </Segment.Group>
    )
}

export default GalleryListItem
