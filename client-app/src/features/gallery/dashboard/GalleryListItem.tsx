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
  Popup,
} from "semantic-ui-react";

import { IMotofy } from "../../../app/models/motofy";
import GalleryListItemEmbracers from "./GalleryListItemEmbracers";

interface IProps {
  motofy: IMotofy;
}

const GalleryListItem: React.FC<IProps> = ({ motofy }) => {
  // const descriptionUiShort = motofy.description!.substring(0, 60);
  // const seeMore = "see more";

  return (
    <Segment.Group raised>
      <Segment>
        <Item>
          <Divider horizontal>
            <Header as='h4'>
              <Item.Meta>
                {" "}
                {motofy.name}, {motofy.brandName}
              </Item.Meta>
            </Header>
          </Divider>
          <Item.Group>
            <Item.Image
              size='huge'
              bordered
              src={motofy.photoUrl}
              centered
              as={Link}
              to={`/gallery/${motofy.id}`}
            />
          </Item.Group>
          <Divider horizontal>
            <Header as='h4'>
              <Icon name='tags' />
              Info
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
                <Popup
                  header={motofy.brandName}
                  className='computer only'
                  trigger={
                    <Image size='tiny' src={motofy.brandLogoUrl} centered />
                  }
                />
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
                <Icon name='motorcycle' /> {motofy.model}
              </Grid.Column>

              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Icon name='road' /> {motofy.numberOfKilometers} Km
              </Grid.Column>
            </Grid.Row>

            {/* <Divider horizontal>
              <Header as='h4'>
                <Icon name='tag' />
                Characteristics
              </Header>
            </Divider>
            <Grid.Row>
              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Item.Meta>Published by</Item.Meta>
                <Item.Description>
                  <Link to={`/profile/${motofy.publisherUsername}`}>
                    {motofy.publisherDisplayName}
                  </Link>
                </Item.Description>
              </Grid.Column>

              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Icon name='flag checkered' /> {motofy.cubicCentimeters} cc
              </Grid.Column>
              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Icon name='calendar check' /> Made in {motofy.yearOfProduction}
              </Grid.Column>
              <Grid.Column computer={4} tablet={8} mobile={8}>
                <Item.Meta>Published on</Item.Meta>
                <Item.Description>{motofy.datePublished}</Item.Description>
              </Grid.Column>
            </Grid.Row> */}
          </Grid>
        </Item>

        {/* <Divider horizontal>
          <Header as='h4'>
            <Icon name='tag' />
            Description
          </Header>
        </Divider>
        <Grid.Row>
          <Grid.Column computer={16} tablet={16} mobile={16}>
            <Item.Meta content={descriptionUiShort + "..."} />

            <Item.Meta as={Link} to={`/activities/${motofy.id}`}>
              <span>{seeMore}</span>
            </Item.Meta>
          </Grid.Column>
        </Grid.Row> */}

        <Divider horizontal>
          <Header as='h4'>
            <Icon name='like' />
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
          content={"View This " + motofy.brandName}
          color='blue'
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(GalleryListItem);
