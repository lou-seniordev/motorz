import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileCard from './ProfileCard';

const ProfileFollowings = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    followings,
    loading,
    activeTab
  } = rootStore.profileStore;
  const { t } = useTranslation(["social"]);

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user circle'
            content={
              activeTab === 7
                ? t("People following") +' '+ profile!.displayName 
                : t("People") + ' ' + profile!.displayName + " " + t("is following")
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={4} stackable={true} doubling={true} centered>
              {followings.map((profile) => (
                  <ProfileCard key={profile.username} profile={profile}/>
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfileFollowings;
