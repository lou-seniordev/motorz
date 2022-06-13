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
  Icon,
} from "semantic-ui-react";
import { IProfile } from "../../app/models/profile";
import { RootStoreContext } from "../../app/stores/rootStore";
import ContactForm from "./forms/ContactForm";
import { useTranslation } from "react-i18next";

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

  const { onlineUsers } = rootStore.presenceStore;

  const { t } = useTranslation(["social"]);

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
                <Header as='h1'>
                {onlineUsers.includes(profile.username) && (
                  <Icon
                    name='check circle'
                    className='isOnline'
                    bordered
                    circular
                    size='small'
                  />
                )}
                  {profile.displayName}
                
                </Header>
              </Item.Content>
              {user?.userName !== profile.username && (
                <Button
                  circular
                  content={t("Send Message")}
                  onClick={handleSendMessage}
                />
              )}
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column computer={4} mobile={16}>
          <Statistic.Group widths={2}>
            <Statistic label={t("Followers")} value={profile.followersCount} />
            <Statistic label={t("Following")} value={profile.followingCount} />
          </Statistic.Group>
          <Divider />
          {!isCurrentUser && (
            <Reveal animated='move'>
              <Reveal.Content visible style={{ width: "100%" }}>
                <Button
                  fluid
                  color='instagram'
                  content={
                    profile.following ? t("Following") : t("Not following")
                  }
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Button
                  loading={loading}
                  fluid
                  basic
                  color={profile.following ? "red" : "instagram"}
                  content={profile.following ? t("Unfollow") : t("Follow")}
                  onClick={
                    profile.following
                      ? () => [
                          unfollow(profile.username),
                          addFeedItem(
                            uuid(),
                            "Unfollows You",
                            profile.username
                          ),
                        ]
                      : () => [
                          follow(profile.username),
                          addFeedItem(
                            uuid(),
                            "Started Following You",
                            profile.username
                          ),
                        ]
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
