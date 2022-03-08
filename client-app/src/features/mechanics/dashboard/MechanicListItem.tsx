import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Item,
  Segment,
} from "semantic-ui-react";
import { IMechanic } from "../../../app/models/mechanic";

const mechanicImageStyle = {
  filter: "brightness(95%) contrast(70%) drop-shadow(1px 1px 1px teal)",
};

const MechanicListItem: React.FC<{ mechanic: IMechanic }> = ({ mechanic }) => {
  // console.log("mechanic in MechanicListItem", toJS(mechanic));
  return (
    <Segment.Group raised>
      <Segment raised>
        <Header as='h1' floated='right'>
          {mechanic.name}
        </Header>
        <Divider clearing />
        <Item>
          <Item.Group>
            <Grid>
              <Grid.Column width={5}>
                <Item>
                  <Item.Image
                    style={mechanicImageStyle}
                    size='small'
                    rounded
                    src={mechanic.photoUrl}
                  />
                </Item>
              </Grid.Column>
              <Divider vertical />
              <Grid.Column width={6}>
                <Item>
                  <Item.Content>
                    <Item.Header as='h2'>Customers</Item.Header>
                    <Item.Extra as='h1'>{mechanic.ratings.length}</Item.Extra>
                  </Item.Content>
                </Item>
              </Grid.Column>
              <Divider vertical />
              <Grid.Column width={5}>
                <Item>
                  <Item.Content>
                    <Item.Header as='h2'>Average Rating</Item.Header>
                    <Item.Extra as='h1'>
                      {mechanic.averageRating}
                      {/* {" "}
                      by {mechanic.ratings.length} people */}
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Grid.Column>
            </Grid>
          </Item.Group>
        </Item>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={5}>
            <Icon name='history' /> Working since {mechanic.yearOfStart}
          </Grid.Column>
          <Grid.Column width={6}>
            <Icon name='envelope outline' /> {mechanic.city},{" "}
            {mechanic.countryName}, {mechanic.address}
          </Grid.Column>
          <Grid.Column width={5}>
            <Icon name='mail' /> {mechanic.email || 'email N/A'}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/mechanics/${mechanic.id}`}
          fluid
          content='View'
          color='linkedin'
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default MechanicListItem;
