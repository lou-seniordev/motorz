import React from "react";
import { Segment, Grid, Icon, Image, GridRow } from "semantic-ui-react";
import { IMotofy } from "../../../app/models/motofy";

const GalleryDetailedInfo: React.FC<{ motofy: IMotofy }> = ({ motofy }) => {
  const iconStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
    justifyContent: "center",
  };

  return (
    <Segment.Group>
      <Segment
        attached='top'
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          justifyContent: "center",
          // color: 'red'
        }}
      >
        <Grid verticalAlign='middle'>
          <GridRow>
            <Grid.Column width={2}>
              <Image size='tiny' src={motofy.brandLogoUrl} />
            </Grid.Column>
            <Grid.Column width={14}>
              <p>
                <strong>{motofy.brandName} - </strong> {motofy.model}
              </p>
            </Grid.Column>
          </GridRow>
          <GridRow>
            <Grid.Column width={2}>
              <Icon
                size='large'
                color='teal'
                name='info'
                style={{iconStyle}}
              />
            </Grid.Column>
            <Grid.Column width={14}>
              <p>{motofy.description}</p>
            </Grid.Column>
          </GridRow>
          {/* </Grid>
      </Segment>
      <Segment attached>
        <Grid> */}
          {/* </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'> */}
          <GridRow>
            <Grid.Column width={2}>
              <Icon name='calendar' size='large' color='teal' />
            </Grid.Column>
            <Grid.Column width={14}>
              <span>Made {motofy.yearOfProduction}</span>
            </Grid.Column>
          </GridRow>
          {/* </Grid>
        </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'> */}
          <Grid.Column width={2}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={14}>
            <span>
              In {motofy.city}, {motofy.countryName}
            </span>
          </Grid.Column>
        </Grid>
        {/* </Segment>
      <Segment attached> */}
        <Grid verticalAlign='middle'>
          <Grid.Column width={2}>
            <Icon name='motorcycle' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={14}>
            <span>
              {" "}
              Engine {motofy.cubicCentimeters}cc, done{" "}
              {motofy.numberOfKilometers} kilometers
            </span>
          </Grid.Column>
        </Grid>
        {/* </Segment>
      <Segment attached> */}
        <Grid verticalAlign='middle'>
          <Grid.Column width={2}>
            <Icon name='euro sign' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={14}>
            <span>
              {" "}
              Price paid {motofy.pricePaid} Euro, present value{" "}
              {motofy.estimatedValue} Euro
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default GalleryDetailedInfo;
