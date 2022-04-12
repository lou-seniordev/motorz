import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Tab, Grid, Header, Card, Image, TabProps } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IUserActivity } from '../../app/models/profile';
import { format } from 'date-fns';
import { RootStoreContext } from '../../app/stores/rootStore';
import { useTranslation } from 'react-i18next';


const ProfileEvents = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadUserActivities,
    profile,
    loadingActivities,
    userActivities
  } = rootStore.profileStore!;

  const { t } = useTranslation(["social"]);
  const panes = [
    { menuItem: t('Active'), pane: { key: 'active' } },
    { menuItem: t('Completed'), pane: { key: 'completed' } },
    { menuItem: t('In future'), pane: { key: 'in future' } },
  ];
  useEffect(() => {
    loadUserActivities(profile!.username);
  }, [loadUserActivities, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;
    switch (data.activeIndex) {
      case 0:
        predicate = 'active';
        break;
      case 1:
        predicate = 'completed';
        break;
      case 2:
        predicate = 'in future';
        break;
      default:
        break;
    }
    loadUserActivities(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='blogger' content={t('Motorcycle Diaries')} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4} stackable={true} doubling={true} centered>
            {userActivities.map((activity: IUserActivity) => (
              <Card
                as={Link}
                to={`/activities/${activity.id}`}
                key={activity.id}
              >
                <Image
                  src={`/assets/categoryImages/${activity.category}.jpg`}
                  style={{ minHeight: 100, objectFit: 'cover' }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{activity.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>{format(new Date(activity.date), 'do LLL')}</div>
                    <div>{format(new Date(activity.date), 'h:mm a')}</div>
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

export default observer(ProfileEvents);
