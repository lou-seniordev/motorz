import { formatDistance } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Segment, Grid, Icon, Divider, Rating } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ForumDetailedInfo: React.FC<{ forumpost: IForumpost }> = ({
  forumpost,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { rated } = rootStore.forumPostStore;

  const { t } = useTranslation(["forum"]);


  return (
    <Segment.Group>
      <Segment attached='top' textAlign='center'>
        <Grid>
          <Grid.Column width={8}>
            <Grid.Row>
              <h1>{forumpost.title}</h1>
              {forumpost.forumpostRating > 0 && (
                <Rating
                  icon='star'
                  size='large'
                  defaultRating={forumpost.forumpostRating}
                  maxRating={5}
                />
              )}
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={8}>
            <Link to={`/profile/${forumpost.userName}`}>
              <img
                className='ui centered circular tiny image'
                src={forumpost.authorPhotoUrl || "/assets/user.png"}
                alt='user'
              />
            </Link>
          </Grid.Column>
        </Grid>
        <Divider vertical>{t("By")} {forumpost.displayName}</Divider>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='info' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <i>
              <span>
                {t("Posted")}{" "}
                {formatDistance(new Date(forumpost.dateAdded), new Date())}
              </span>{" "}
              {t("ago in")} <span>'{forumpost.category}' {t("category")} </span>
              {forumpost.numberOfComents! > 0 && (
                <span>, {t("so far with")} {forumpost.numberOfComents} {t("comments")} </span>
              )}
              {forumpost.forumpostRating > 0 && (
                <span>
                  , {t("rated")} {forumpost.forumpostRating.toFixed(2)}
                </span>
              )}
              {rated && <span>, {t("you already rated")} </span>}
            </i>
          </Grid.Column>
        </Grid>
      </Segment>

      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={16}>
            <span style={{ whiteSpace: "pre-wrap" }}>{forumpost.body}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ForumDetailedInfo);
