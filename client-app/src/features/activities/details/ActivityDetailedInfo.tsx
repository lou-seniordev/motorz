import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { useTranslation } from "react-i18next";

const ActivityDetailedInfo: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const { t } = useTranslation(["diaries"]);

  return (
    <Segment.Group raised>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='pencil alternate' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p style={{ whiteSpace: "pre-wrap" }}>{activity.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            
            {t("Started in:")}
            <span>
              {activity.city}, {activity.departure}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='map pin' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            {t("Going to:")} <span>{activity.destination}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='globe' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            {t("In country:")}
            <span>{activity.countryName}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='gem outline' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            {t("In category:")}
            <span>{activity.category}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='motorcycle' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            {t("You are driving:")}
            <span>{activity.motorcycleBrandName}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityDetailedInfo;
