import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Segment, Grid, Icon, Divider, Button } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";

const ForumDetailedInfo: React.FC<{ forumpost: IForumpost }> = ({
  forumpost,
}) => {
  return (
    <Segment.Group>
      <Segment attached='top' textAlign='center'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={7}>
            <Grid.Row>
              <h4>
                <p>Title</p>
              </h4>
            </Grid.Row>
            <Grid.Row>
              <h2>{forumpost.title}</h2>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={7}>
            <h2>
              <Link to={`/profile/${forumpost.userName}`}>
                <p> {forumpost.displayName}</p>
              </Link>
            </h2>
          </Grid.Column>
        </Grid>
        <Divider vertical>By</Divider>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>Posted on: {forumpost.dateAdded}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Category: {forumpost.category}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={16}>
            <span style={{ whiteSpace: 'pre-wrap' }}>{forumpost.body}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
        <Grid.Column width={4} style={{width: "100%"}}>
            <Button content="Interesting"/>
          </Grid.Column>
          <Grid.Column width={2} />

          <Grid.Column width={4} style={{width: "100%"}}>
            <Button content="Helping"/>
          </Grid.Column>
          <Grid.Column width={2} />

          <Grid.Column width={4} style={{width: "100%"}}>
            <Button content="Usefull"/>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ForumDetailedInfo);
