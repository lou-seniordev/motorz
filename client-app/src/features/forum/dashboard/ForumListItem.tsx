import { formatDistance } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Divider,
  Header,
  Icon,
  Item,
  Label,
  Segment,
} from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import { IForumpost } from "../../../app/models/forumpost";
import { useTranslation } from "react-i18next";

const ForumListItem: React.FC<{ forumpost: IForumpost }> = ({ forumpost }) => {
  const { t } = useTranslation(["forum"]);

  const Response = " " + t("Response");
  const Responses = " " + t("Responses");
  const Member = " " + t("Member");
  const Members = " " + t("Members");
  const Rating = " " + t("Rating");
  const Ratings = " " + t("Ratings");
  return (
    <Segment.Group raised>
      <Segment>
        <Header as='h1' floated='right'>
          {forumpost.title}
          <HeaderSubHeader></HeaderSubHeader>
        </Header>
        <HeaderSubHeader floated='right'>
          <Label pointing='below' content={forumpost.category} />

          {/* <p>
          Posted by{" "}
          <Link to={`/profile/${forumpost.userName}`}>
            {forumpost.displayName}
          </Link>
          </p> */}
        </HeaderSubHeader>

        <Divider clearing />
        <Item>
          <Item.Image
            size='tiny'
            // circular
            src={`/assets/forumCategoryImages/${forumpost.category}.jpg`}
            floated='left'
          />
          <Item.Content>
            <Item.Description>
              <>{forumpost.body}</>
            </Item.Description>

            <Item.Extra></Item.Extra>
          </Item.Content>
        </Item>
      </Segment>

      <Segment>
        <Icon name='clock' /> {t("Posted")}{" "}
        {formatDistance(new Date(forumpost.dateAdded), new Date())} {t("ago by")}{" "}
        <Link to={`/profile/${forumpost.userName}`}>
          {forumpost.displayName}
        </Link>
        {forumpost.commenters?.length! > 0 && (
          <Segment>
            {forumpost.numberOfComents! > 1
              ? forumpost.numberOfComents + Response
              : forumpost.numberOfComents + Responses}{" "}
            {t("from")}{" "}
            {forumpost.commenters?.length! > 1
              ? forumpost.commenters?.length + Members
              : forumpost.commenters?.length + Member}
          </Segment>
        )}
        {forumpost.forumpostRatings?.length! > 0 && (
          <Segment>
            {forumpost.forumpostRatings!.length > 1
              ? forumpost.forumpostRatings?.length + Ratings
              : forumpost.forumpostRatings?.length + Rating}{" "}
            {t("from")}{" "}
            {forumpost.forumpostRatings?.length! > 1
              ? forumpost.forumpostRatings?.length + Members
              : forumpost.forumpostRatings?.length + Member}
          </Segment>
        )}
      </Segment>
      <Segment>
        <Button
          as={Link}
          to={`/forum/${forumpost.id}`}
          fluid
          content={t('View')}
          color='instagram'
        />
      </Segment>
    </Segment.Group>
  );
};

export default ForumListItem;
