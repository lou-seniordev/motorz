import React from "react";
import { useTranslation } from "react-i18next";
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

const testPositionStyles = {
  textAlign: 'center'
}

const MechanicListItem: React.FC<{ mechanic: IMechanic }> = ({ mechanic }) => {
  const { t } = useTranslation(["mechanics"]);
  return (
    <Segment.Group raised>
      <Segment raised>
        <Header as='h1' floated='right' style={{color: 'rgb(58,	98,	139)'}}>
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
                <Item style={testPositionStyles}>
                  <Item.Content>
                    <Item.Header as='h2'>{t("Customers")}</Item.Header>
                   { mechanic.ratings !== undefined &&<Item.Extra as='h1'>{mechanic.ratings.length}</Item.Extra>}
                  </Item.Content>
                </Item>
              </Grid.Column>
              <Divider vertical />
              <Grid.Column width={5}>
                <Item style={testPositionStyles}>
                  <Item.Content>
                    <Item.Header as='h2'>{t("Rating")}</Item.Header>
                    {mechanic.averageRating !== undefined && <Item.Extra as='h1'>
                      {mechanic.averageRating}
                    </Item.Extra>}
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
            <Icon name='history' /> {t("In business since")} {mechanic.yearOfStart}
          </Grid.Column>
          <Grid.Column width={6} style={testPositionStyles}>
            <Icon name='envelope outline' /> {mechanic.city},{" "}
            {mechanic.countryName}, {mechanic.address}
          </Grid.Column>
          <Grid.Column width={5} style={testPositionStyles}>
            <Icon name='mail' /> {mechanic.email || 'email N/A'}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment clearing>
        <Button
          as={Link}
          to={`/mechanics/${mechanic.id}`}
          fluid
          content={t('View')}
          color='instagram'
        ></Button>
      </Segment>
    </Segment.Group>
  );
};

export default MechanicListItem;
