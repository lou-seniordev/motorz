import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Tab, Grid, Header, Card, Image, TabProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {  IUserProduct } from "../../app/models/profile";
import { format } from "date-fns";
import { RootStoreContext } from "../../app/stores/rootStore";
import { useTranslation } from "react-i18next";


const ProfileProducts = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadUserProducts, profile, loadingProducts, userProducts } =
  rootStore.profileStore!;
  const { t } = useTranslation(["social"]);

  const panes = [
    { menuItem: t("I am selling"), pane: { key: "iAmSelling" } },
    { menuItem: t("I sold"), pane: { key: "iSold" } },
  ];
  useEffect(() => {
    loadUserProducts(profile!.username);
  }, [loadUserProducts, profile]);

  const handleTabChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: TabProps
  ) => {
    let predicate;

    switch (data.activeIndex) {
      case 1:
        predicate = "iSold";
        break;
      case 2:
        predicate = "iAmSelling";
        break;
      default:
       
        break;
    }
    loadUserProducts(profile!.username, predicate);
  };

  return (
    <Tab.Pane loading={loadingProducts}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content={"Products"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4} stackable={true} doubling={true} centered>
            {userProducts.map((product: IUserProduct) => (
              <Card
                as={Link}
                to={`/product/${product.id}`}
                key={product.id}
              >
                <Image
                  src={product.pictureUrl}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign='center'>{product.title}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>
                      {format(new Date(product.datePublished), "do LLL")}
                    </div>
                    <div>
                      {format(new Date(product.datePublished), "h:mm a")}
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

export default observer(ProfileProducts);
