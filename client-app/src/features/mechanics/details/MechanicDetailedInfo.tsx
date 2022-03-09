import { formatDistance } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Grid, Icon, List, Popup, Image, Label } from "semantic-ui-react";
import { IMechanic } from "../../../app/models/mechanic";

const MechanicDetailedInfo: React.FC<{ mechanic: IMechanic }> = ({
  mechanic,
}) => {
  return (
    <Segment.Group raised>
      {mechanic.brands.length>0 && <Segment attached='top'>
        <Label pointing='below'> <Icon name='trademark' />
        <img src={mechanic.photoUrl!} />
        {' '}Specialized in {' '} {mechanic.brands.length} {' '} brands</Label>
        <Grid>
          <>
            <Grid.Column width={1}>
              <Icon size='large' color='teal' name='trademark' />
            </Grid.Column>
            <Grid.Column width={15}>
              <List horizontal>
                {mechanic.brands.map((brand: any) => (
                  <List.Item key={brand.name}>
                    <Popup
                      header={brand.name}
                      trigger={
                        <Image
                          size='mini'
                          circular
                          src={brand.logoUrl || "/assets/user.png"}
                          bordered
                        />
                      }
                    />
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
          </>
        </Grid>
      </Segment>}
      <Segment attached>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{mechanic.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>In business since {mechanic.yearOfStart}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='address card' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {mechanic.city}, {mechanic.countryName}, {mechanic.address}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='tty' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Phone number: {mechanic.phone || "Phone not available"}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='envelope open' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              Email address: {mechanic.email || "Email address not available"}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='internet explorer' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Website: {mechanic.website || "Website not available"}</span>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached='bottom'>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar check outline' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              Published {/* {mechanic.datePublished} */}
              {formatDistance(new Date(mechanic.datePublished), new Date())}
            </span>{" "}
            ago
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(MechanicDetailedInfo);
