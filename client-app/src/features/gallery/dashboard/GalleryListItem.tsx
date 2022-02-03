import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  // Label,
  Segment,
  Image,
  Grid,
  Divider,
  Header,
} from "semantic-ui-react";

import { IMotofy } from "../../../app/models/motofy";
import GalleryListItemEmbracers from "./GalleryListItemEmbracers";

interface IProps {
  motofy: IMotofy;
}

const GalleryListItem: React.FC<IProps> = ({ motofy }) => {
  const owner =
    motofy.embracers.filter((x) => x.isOwner)[0] || "unknown testing";
  //==test!
  const publisher = motofy.embracers.filter((x) => x)[0];
  const descriptionUiShort = motofy.description!.substring(0, 60);
  const seeMore = "see more";
  return (
    <Segment.Group raised>
      <Segment >
        <Item>
          <Divider horizontal>
            <Header as='h4'>
              {/* <Icon name='motorcycle' /> */}
              <Item.Meta>
                {" "}
                {motofy.name}, {motofy.brandName}
              </Item.Meta>
            </Header>
          </Divider>
          <Item.Group>
            <Item.Image size='big' bordered src={motofy.photoUrl} centered />
          </Item.Group>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='tags' />
              Personal
            </Header>
          </Divider>
          <Grid
            style={{
              padding: "0",
              margin: "0",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <Grid.Row>
              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Image size='mini' src={motofy.brandLogoUrl} centered />
              </Grid.Column>
              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Item.Header as={Link} to={`/gallery/${motofy.id}`}>
                  {motofy.name}
                </Item.Header>
                <Item.Meta>
                  {motofy.city}, {motofy.countryName}
                </Item.Meta>
              </Grid.Column>

              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Item.Meta>Published by</Item.Meta>
                <Item.Description>
                  <Link to={`/profile/${publisher.username}`}>
                    {publisher.displayName! || "unknown"}
                  </Link>
                </Item.Description>

                {/* <Icon name='clock' size="tiny"/>  */}

                {/* <Image
                  size='mini'
                  circular
                  src={publisher.image || "/assets/user.png"}
                /> */}
              </Grid.Column>
              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Item.Meta>Published on</Item.Meta>
                <Item.Description>
                  {motofy.datePublished}
                  {/* Owned by {owner.displayName || "unknown"} */}
                </Item.Description>
              </Grid.Column>
            </Grid.Row>
            <Divider horizontal>
              <Header as='h4'>
                <Icon name='tag' />
                Characteristics
              </Header>
            </Divider>
            <Grid.Row>
              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Icon name='motorcycle' /> {motofy.model}
              </Grid.Column>

              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Icon name='flag checkered' /> {motofy.cubicCentimeters} cc
              </Grid.Column>
              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Icon name='calendar check' /> Made in {motofy.yearOfProduction}
              </Grid.Column>
              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Icon name='road' /> {motofy.numberOfKilometers} Km
              </Grid.Column>
            </Grid.Row>
          </Grid>
          
        </Item>
        {/* </Segment> */}
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='tag' />
            Description
          </Header>
        </Divider>
        {/* <Segment> */}
        {/* <Item.Meta> <span>{motofy.description}</span></Item.Meta> */}
        <Grid.Row>
        <Grid.Column computer={16} tablet={16} mobile={16}>
        <Item.Meta content={descriptionUiShort + '...'}/>
              
        <Item.Meta as={Link} to={`/activities/${motofy.id}`}>
          <span>{seeMore}</span>
        </Item.Meta>
              </Grid.Column>
        </Grid.Row>
        
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='tag' />
            Embraced by
          </Header>
        </Divider>
        {/* <Segment secondary> */}
        <GalleryListItemEmbracers embracers={motofy.embracers} />
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/gallery/${motofy.id}`}
          fluid
          content={'View This ' + motofy.brandName}
          color='blue'
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(GalleryListItem);



{/* <Item.Content>
            <Item.Header as={Link} to={`/gallery/${motofy.id}`}>
              {motofy.name}
            </Item.Header>
            <Item.Meta>{motofy.brandName}</Item.Meta>
            <Label basic content={motofy.brandId} />
            <Item.Description>
              Published by
              <Link to={`/profile/${publisher.username}`}>
                {publisher.displayName! || "unknown"}
              </Link>
            </Item.Description>
            <Image
              size='mini'
              src={publisher.image || '/assets/user.png'}
            />
            <Item.Description>
              Owned by {owner.displayName || "unknown"}
            </Item.Description>
            {motofy.isOwner && (
              <Item.Description>
                <Label
                  basic
                  color='orange'
                  content='You are owner of this motofy'
                />
              </Item.Description>
            )}
            {motofy.embraced && !motofy.isOwner && (
              <Item.Description>
                <Label basic color='green' content='You embraced this motofy' />
              </Item.Description>
            )}
            <Item.Extra></Item.Extra>
          </Item.Content> */}

            {/* <span>{descriptionUiShort}</span>
        </Item.Meta> */}
        {/* <Icon name='clock' /> {motofy.datePublished}
        <Icon name='marker' /> {motofy.city}, {motofy.countryName}
      </Segment>
      <Segment>
        <Icon name='motorcycle' /> {motofy.model} 
        <Icon name='flag checkered' /> {motofy.cubicCentimeters} cc */}
        {/* </Segment> */}