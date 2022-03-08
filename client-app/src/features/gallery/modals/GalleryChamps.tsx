import React, { useContext } from "react";
import { Segment, Grid, Header, Item } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { IMotofy } from "../../../app/models/motofy";
import { RootStoreContext } from "../../../app/stores/rootStore";

const GalleryChamps: React.FC<{ motofy: IMotofy, info:string }> = ({
  motofy,
  info
}) => {
  // const motofy = { ...champ };
  const rootStore = useContext(RootStoreContext);

  const { closeModal } = rootStore.modalStore;

  return (
    <Segment.Group>
      <Segment attached='top'>
        <Link to={`/gallery/${motofy.id}`} onClick={() => closeModal()}>
          <Grid>
            <Grid.Column width={16}>
              <Header
                // icon={"certificate"}
                attached
                color={"teal"}
                content={info}
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Grid.Row>
              <Item.Image size='huge' src={motofy.photoUrl} bordered fluid/>
              </Grid.Row>
              <Grid.Row>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Item.Header>
                        <p>{motofy.name}</p>
                      </Item.Header>
                      <Item.Description>
                        {/* {motofy.model}, */}
                        <p>
                          {/* {motofy.brandName}, {" "} */}
                          {motofy.city}, {motofy.countryName},{" "}
                        </p>
                        {/* {motofy.yearOfProduction} */}
                      </Item.Description>

                      {/* <p>{motofy.name}</p> */}
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Link>
      </Segment>
    </Segment.Group>
  );
};

export default GalleryChamps;
