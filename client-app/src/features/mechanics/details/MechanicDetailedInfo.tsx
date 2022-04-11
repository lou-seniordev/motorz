import { formatDistance } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { useTranslation } from "react-i18next";
import { Segment, Grid, Icon, List, Popup, Image, Label } from "semantic-ui-react";
import { IMechanic } from "../../../app/models/mechanic";

const MechanicDetailedInfo: React.FC<{ mechanic: IMechanic }> = ({
  mechanic,
}) => {
  const { t } = useTranslation(["mechanics"]);

  return (
    <Segment.Group raised>
      {mechanic.brands.length>0 && <Segment attached='top'>
        <Label pointing='below'> <Icon name='trademark' />
        <img src={mechanic.photoUrl!} alt='Mechanic'/>
        {' '} {t("Specialized in")} {' '} {mechanic.brands.length} {' '} brands</Label>
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
            <span>{t("In business since")}: {mechanic.yearOfStart}</span>
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
            <span>{t("Phone number")}: {mechanic.phone || t("Phone not available")}</span>
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
              {t("Email address")}: {mechanic.email || t("Email address not available")}
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
            <span>{t("Website")}: {mechanic.website || t("Website not available")}</span>
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
              {t("Published")}:{" "} 
              {formatDistance(new Date(mechanic.datePublished), new Date())}
            </span>{" "}
            {t("ago")}
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(MechanicDetailedInfo);
