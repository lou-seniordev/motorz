import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Icon,
  Item,
  Segment,
  Image,
  Grid,
  Divider,
  Header,
  Popup,
} from "semantic-ui-react";

import { IMotofy } from "../../../app/models/motofy";
import GalleryListItemEmbracers from "./GalleryListItemEmbracers";
import { useTranslation } from "react-i18next";

interface IProps {
  motofy: IMotofy;
}

const GalleryListItem: React.FC<IProps> = ({ motofy }) => {
  const { t } = useTranslation(["gallery"]);

  return (
    <>
      <Segment.Group raised>
        <Segment>
          <Item>
            <Divider horizontal>
              <Header as='h4'>
                <Item.Meta>
                  {" "}
                  {motofy.name}, {motofy.brandName}
                </Item.Meta>
              </Header>
            </Divider>
            <Item.Group>
              <Link to={`/gallery/${motofy.id}`}>
                <img
                  className='ui centered big image rounded'
                  src={motofy.photoUrl! || "/assets/user.pn"}
                  alt='Motofy!'
                />
              </Link>
            </Item.Group>
            <Divider horizontal>
              <Header as='h4'>{t("Info")}</Header>
            </Divider>
            <Grid
              style={{
                padding: "0",
                margin: "0",
                display: "flex",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Grid.Row>
                <Grid.Column computer={4} tablet={8} mobile={8}>
                  <Popup
                    header={motofy.brandName}
                    className='computer only'
                    trigger={
                      <Image
                        size='tiny'
                        src={motofy.brandLogoUrl || "/assets/user.pn"}
                        centered
                      />
                    }
                  />
                </Grid.Column>
                <Grid.Column computer={4} tablet={8} mobile={8}>
                  <Item.Header as={Link} to={`/gallery/${motofy.id}`}>
                    {motofy.name}
                  </Item.Header>
                  <Item.Meta>
                    {motofy.city}, {motofy.countryName}
                  </Item.Meta>
                </Grid.Column>

                <Grid.Column computer={4} tablet={8} mobile={8}>
                  <Icon name='motorcycle' /> {motofy.model}
                </Grid.Column>

                <Grid.Column computer={4} tablet={8} mobile={8}>
                  <Icon name='road' /> {motofy.numberOfKilometers} Km
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Item>

          <Divider horizontal>
            <Header as='h4'>{t("Embraced by")}</Header>
          </Divider>
          <GalleryListItemEmbracers embracers={motofy.embracers} />
        </Segment>
        <Segment clearing>
          <Button
            as={Link}
            to={`/gallery/${motofy.id}`}
            fluid
            content={t("View This ") + motofy.brandName}
            color='blue'
          ></Button>
        </Segment>
      </Segment.Group>
    </>
  );
};

export default observer(GalleryListItem);
