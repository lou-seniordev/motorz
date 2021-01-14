import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment, Image } from 'semantic-ui-react';

import { IMotofy } from '../../../app/models/motofy';
import GalleryListItemEmbracers from './GalleryListItemEmbracers';

interface IProps {
  motofy: IMotofy;
}

const GalleryListItem: React.FC<IProps> = ({ motofy }) => {
  const owner = motofy.embracers.filter(x => x.isOwner)[0] || 'unknown testing';

  return (
    <Segment.Group>
      <Segment>
        <Item>
          <Item.Group>
            {/* <Item.Image size='' bordered src='/assets/user.png'/> */}
            <Item.Image size='big' bordered src={motofy.photoUrl} centered />
          </Item.Group>
          <Item.Content>
            <Item.Header as={Link} to={`/gallery/${motofy.id}`}>{motofy.name}</Item.Header>
            {/* <Item.Meta>{motofy.brand}</Item.Meta> */}
            <Image
              size='mini'
              src={`/assets/brandImages/${motofy.brand}.png`}
            />
            <Label basic content={motofy.brand} />
            <Item.Description>Owned by {owner.displayName || 'unknown'}</Item.Description>
            {motofy.isOwner && (
              <Item.Description>
                <Label
                  basic
                  color='orange'
                  content='You are owner of this motofy'
                />
              </Item.Description>
            )}
            {motofy.embraced && !motofy.isOwner &&(
              <Item.Description>
                <Label
                  basic
                  color='green'
                  content='You embraced this motofy'
                />
              </Item.Description>
            )}
            <Item.Extra></Item.Extra>
          </Item.Content>
        </Item>
      </Segment>
      <Segment>
        <Icon name='clock' /> {motofy.datePublished}
        <Icon name='marker' /> {motofy.city}, {motofy.country}
      </Segment>
      <Segment>
        <Icon name='motorcycle' /> {motofy.model} /
        <Icon name='flag checkered' /> {motofy.cubicCentimeters} cc
      </Segment>
      <Segment secondary>
        <GalleryListItemEmbracers embracers={motofy.embracers} />
      </Segment>
      <Segment clearing>
        <span>{motofy.description}</span>
        <Button
          as={Link}
          to={`/gallery/${motofy.id}`}
          floated='right'
          content='View'
          color='blue'
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default GalleryListItem;
