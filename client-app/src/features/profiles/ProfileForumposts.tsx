import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {  IUserForumpost } from '../../app/models/profile';
import { format } from 'date-fns';
import { RootStoreContext } from '../../app/stores/rootStore';
import { useTranslation } from 'react-i18next';


const ProfileForumposts = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUserForumposts,
    profile,
    loadingForumposts,
    userForumposts
  } = rootStore.profileStore!;
  const { t } = useTranslation(["social"]);

  const panes = [
    { menuItem: t('Asked'), pane: { key: 'iAsked' } },
    { menuItem: t('Rated'), pane: { key: 'iRated' } },
  ];
  useEffect(() => {
    loadUserForumposts(profile!.username);
  }, [loadUserForumposts, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 1:
        predicate = 'iRated';
        break;
      default:
        predicate = 'iAsked';
        break;
    }
    loadUserForumposts(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingForumposts}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='question circle' content={'Forumposts'} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4} stackable={true} doubling={true} centered>
            {userForumposts.map((forumpost: IUserForumpost) => (
              <Card
                as={Link}
                to={`/forum/${forumpost.id}`}
                key={forumpost.id}
              >
                <Image
                  src={`/assets/forumCategoryImages/${forumpost.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{forumpost.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(new Date(forumpost.dateAdded), 'do LLL')}</div>
                    <div>{format(new Date(forumpost.dateAdded), 'h:mm a')}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileForumposts);
