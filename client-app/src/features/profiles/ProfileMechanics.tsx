import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IUserMechanic } from "../../app/models/profile";
import { format } from "date-fns";
import { RootStoreContext } from "../../app/stores/rootStore";

const panes = [
  { menuItem: "Mechanics I Published", pane: { key: "iPublished" } },
  { menuItem: "Mechanics I Rated", pane: { key: "iRated" } },
  { menuItem: "Mechanics I Recommend", pane: { key: "iRecommend" } },
];

const ProfileMechanics = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUserMechanics, profile, loadingMechanics, userMechanics } =
    rootStore.profileStore!;

  useEffect(() => {
    loadUserMechanics(profile!.username);
  }, [loadUserMechanics, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    // let predicate = undefined ?? 'iEmbraced';
    let predicate;

    switch (data.activeIndex) {
      case 1:
        predicate = "iRated";
        break;
      case 2:
        predicate = "iRecommend";
        break;
      default:
        predicate = "iPublished";
        break;
    }
    loadUserMechanics(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingMechanics}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content={"Mechanics"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={6}>
            {userMechanics.map((mechanic: IUserMechanic) => (
              <Card
                as={Link}
                to={`/mechanics/${mechanic.id}`}
                key={mechanic.id}
              >
                <Image
                  src={mechanic.photoUrl}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{mechanic.name}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>
                      {format(new Date(mechanic.datePublished), "do LLL")}
                    </div>
                    <div>
                      {format(new Date(mechanic.datePublished), "h:mm a")}
                    </div>
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

export default observer(ProfileMechanics);
