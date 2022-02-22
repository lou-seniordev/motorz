import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IUserMotofy } from "../../app/models/profile";
import { format } from "date-fns";
import { RootStoreContext } from "../../app/stores/rootStore";

const panes = [
  { menuItem: "Motofies I Embraced", pane: { key: "iEmbraced" } },
  { menuItem: "Motofies I Published", pane: { key: "iPublished" } },
  { menuItem: "Motofies I Rated", pane: { key: "iRated" } },
];

const ProfileMotofies = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUserMotofies, profile, loadingMotofies, userMotofies } =
    rootStore.profileStore!;

  useEffect(() => {
    loadUserMotofies(profile!.username);
  }, [loadUserMotofies, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
     let predicate;

    switch (data.activeIndex) {
      case 1:
        predicate = "iPublished";
        break;
      case 2:
        predicate = "iRated";
        break;
      default:
        predicate = "iEmbraced";
        break;
    }
    loadUserMotofies(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingMotofies}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content={"Motofies"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={6}>
            {userMotofies.map((motofy: IUserMotofy) => (
              <Card as={Link} to={`/gallery/${motofy.id}`} key={motofy.id}>
                <Image
                  src={motofy.photoUrl}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{motofy.name}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>
                      {format(new Date(motofy.datePublished), "do LLL")}
                    </div>
                    <div>
                      {format(new Date(motofy.yearOfProduction), "h:mm a")}
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

export default observer(ProfileMotofies);
