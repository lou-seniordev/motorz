import React from "react";
import { Segment, Grid, Header, Item } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { IMotofy } from "../../../app/models/motofy";

const GalleryMostEmbraced: React.FC<{ motofyEmbraced: IMotofy }> = ({
  motofyEmbraced,
}) => {

  const motofy = { ...motofyEmbraced };
 
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Link to={`/gallery/${motofy.id}`}>
          <Grid>
            <Grid.Column width={16}>
              <Header
                icon={"certificate"}
                attached
                color={"teal"}
                content={"The most embraced Motofy is..."}
              />
            </Grid.Column>
            <Grid.Column width={16}>
              <Item.Group>
                <Item>
                  <Item.Image size='small' src={motofy.photoUrl} bordered />
                  <Item.Content>
                    <Item.Header>
                      <p>
                        {motofy.brandName}, {motofy.model}, {motofy.name}
                      </p>
                    </Item.Header>
                    <Item.Description>
                      <p>
                        {motofy.city}, {motofy.country}, {motofy.yearOfProduction}
                      </p>
                    </Item.Description>

                    {/* <p>{motofy.name}</p> */}
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

export default GalleryMostEmbraced;
