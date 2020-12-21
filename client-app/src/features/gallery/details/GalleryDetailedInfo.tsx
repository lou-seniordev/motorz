import React from 'react';
import { Segment, Grid, Icon, Image } from 'semantic-ui-react';
import { IMotofy } from '../../../app/models/motofy';

const GalleryDetailedInfo: React.FC<{ motofy: IMotofy }> = ({ motofy }) => {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            {/* <Icon size='large' color='teal' name='info' /> */}
            <Image
              size='mini'
              src={`/assets/brandImages/${motofy.brand}.png`}
            />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>
              <strong>{motofy.brand} - </strong> {motofy.model}
            </p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{motofy.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>Made {motofy.yearOfProduction}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              In {motofy.city}, {motofy.country}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='motorcycle' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {' '}
              Engine {motofy.cubicCentimeters}cc, done{' '}
              {motofy.numberOfKilometers} kilometers
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='euro sign' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {' '}
              Price paid {motofy.pricePaid} Euro, present value{' '}
              {motofy.estimatedValue} Euro
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default GalleryDetailedInfo;
