import React from "react";
import { Segment, Placeholder, Grid } from "semantic-ui-react";
const ProductListItemPlaceholder = () => {
  return (
    <Grid columns={4} stackable>
      <Grid.Column>
        <Segment raised>
          <Placeholder style={{ height: 100, width: 100 }}>
            <Placeholder.Line />
            <Placeholder.Image />
          </Placeholder>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment raised>
          <Placeholder style={{ height: 100, width: 100 }}>
            <Placeholder.Line />
            <Placeholder.Image />
          </Placeholder>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment raised>
          <Placeholder style={{ height: 100, width: 100 }}>
            <Placeholder.Line />
            <Placeholder.Image />
          </Placeholder>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment raised>
          <Placeholder style={{ height: 100, width: 100 }}>
            <Placeholder.Line />
            <Placeholder.Image />
          </Placeholder>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};
export default ProductListItemPlaceholder;
