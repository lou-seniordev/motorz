// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Segment, List, Item, Image, Grid } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";

const ForumDetailedSidebar: React.FC<{ forumpost: IForumpost }> = ({
  forumpost,
}) => {
  const { t } = useTranslation(["forum"]);
  const person = " " + t("person");
  const people = " " + t("people");
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
        {forumpost.commenters?.length !== undefined &&

        forumpost.commenters?.length > 1 ? forumpost.commenters?.length  + people : forumpost.commenters?.length+ person 
        }
          {" "}{t("participating")}
      </Segment>

      <Segment attached>
        <List relaxed divided>
          <Item.Group divided>
            {forumpost.commenters?.map((commenter) => (
              <Segment key={commenter.id}>
                <Grid>
                  <Grid.Column width={6}>
                    <Image size='mini' circular src={commenter.image} />
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
