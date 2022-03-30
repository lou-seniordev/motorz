import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { v4 as uuid } from "uuid";

import {
  Segment,
  Item,
  Header,
  Button,
  Grid,
  Statistic,
  Divider,
  Reveal,
} from "semantic-ui-react";
import { IProfile } from "../../app/models/profile";
import { RootStoreContext } from "../../app/stores/rootStore";
import ContactForm from "./forms/ContactForm";

interface IProps {
  profile: IProfile;
  loading: boolean;
  isCurrentUser: boolean;
  follow: (username: string) => void;
  unfollow: (username: string) => void;
}
const ProfileHeader: React.FC<IProps> = ({
  profile,
  isCurrentUser,
  loading,
  follow,
  unfollow,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const { addFeedItem } = rootStore.feedStore;

  const { openModal } = rootStore.modalStore;

  const handleSendMessage = () => {
    openModal(
      <ContactForm
        recipientUsername={profile.username}
        username={user!.userName}
      />
    );
  };
  return (
    <Segment>
      <Grid>
        <Grid.Column computer={12} mobile={16}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='tiny'
                src={profile.image || "/assets/user.png"}
              />
              <Item.Content verticalAlign='middle'>
                <Header as='h1'>{profile.displayName}</Header>
              </Item.Content>
              {user?.userName !== profile.username && (
                <Button
                  circular
                  content='Send Message'
                  onClick={handleSendMessage}
                />
              )}
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column computer={4} mobile={16}>
          <Statistic.Group widths={2}>
            <Statistic label='Followers' value={profile.followersCount} />
            <Statistic label='Following' value={profile.followingCount} />
          </Statistic.Group>
          <Divider />
          {!isCurrentUser && (
            <Reveal animated='move'>
              <Reveal.Content visible style={{ width: "100%" }}>
                <Button
                  fluid
                  color='instagram'
                  content={profile.following ? "Following" : "Not following"}
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Button
                  loading={loading}
                  fluid
                  basic
                  color={profile.following ? "red" : "instagram"}
                  content={profile.following ? "Unfollow" : "Follow"}
                  onClick={
                    profile.following
                      ? () => [unfollow(profile.username),  addFeedItem(uuid(), 'Unfollows You', profile.username)]
                      : () => [follow(profile.username),  addFeedItem(uuid(), 'Started Following You', profile.username)]
                  }
                />
              </Reveal.Content>
            </Reveal>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(ProfileHeader);
