import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
// import { format } from 'date-fns';

const ActivityDetailedInfo: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  return (
    <Segment.Group>
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
      {/* <Segment attached>
               <Grid verticalAlign='middle'>
                 <Grid.Column width={1}>
                   <Icon name='calendar alternate outline' size='large' color='teal' />
                 </Grid.Column>
                  <Grid.Column width={15}>
                   <span>
                   {format(activity.date, 'eeee do MMMM')} at  {format(activity.date, 'h:mm a')}
                   </span>
                 </Grid.Column> 
               </Grid>
             </Segment> */}
      <Segment>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            {"Started in: "}
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
            {"Going to: "} <span>{activity.destination}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='globe' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            {"In country: "}
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
            {"In category: "}
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
            {"Driving: "}
            <span>{activity.motorcycleBrandName}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityDetailedInfo;
