import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Segment, List, Item, Image, Grid } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";

const ForumDetailedSidebar: React.FC<{ forumpost: IForumpost }> = ({
  forumpost,
}) => {
  console.log("forumpost.commenters", toJS(forumpost.commenters));
  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: "none" }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {forumpost.commenters?.length} people participating
      </Segment>

      <Segment attached>
        <List relaxed divided>
          <Item.Group divided>
            {forumpost.commenters?.map((commenter) => (
              <Segment key={commenter.id}>
                <Grid>
                  <Grid.Column width={6}>
                    <Image size='tiny' circular src={commenter.image} />
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Link to={`/profile/${commenter.username}`}>
                      <Item.Header as='h3'>{commenter.displayName}</Item.Header>
                    </Link>
                  </Grid.Column>
                </Grid>
              </Segment>
            ))}
          </Item.Group>
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(ForumDetailedSidebar);
