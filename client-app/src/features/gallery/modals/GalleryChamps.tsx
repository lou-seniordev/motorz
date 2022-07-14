import React, { useContext } from "react";
import { Segment, Grid, Header, Item } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { IMotofy } from "../../../app/models/motofy";
import { RootStoreContext } from "../../../app/stores/rootStore";

const GalleryChamps: React.FC<{ motofy: IMotofy; info: string }> = ({
  motofy,
  info,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { closeModal } = rootStore.modalStore;
  const { setPredicate } = rootStore.motofyStore;

  return (
    <Segment.Group>
      <Segment attached='top'>
        <Link
          to={`/gallery/${motofy.id}`}
          onClick={() => {
            closeModal();
            setPredicate("all", "true");
          }}
        >
          <Grid>
            <Grid.Column width={16}>
              <Header
                content={motofy.name}
                style={{ fontSize: "2em", textAlign: "center" }}
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <img
                className='ui centered massive image rounded'
                src={motofy.photoUrl!}
                alt={motofy.name!}
              />
              <Item.Group>
                <Item>
                  <Item.Content style={{ textAlign: "center" }}>
                    <Item.Description>
                      {motofy.model},
                      <p>
                        {motofy.brandName}, {motofy.city}, {motofy.countryName},{" "}
                      </p>
                      {motofy.yearOfProduction}
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Grid.Column>
          </Grid>
        </Link>
      </Segment>
    </Segment.Group>
  );
};

export default GalleryChamps;
