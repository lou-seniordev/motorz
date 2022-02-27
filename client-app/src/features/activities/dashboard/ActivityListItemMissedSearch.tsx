import React, { Fragment } from "react";
import { Placeholder, Segment } from "semantic-ui-react";
const ActivityListItemMissedSearch = () => {
  return (
    <Fragment>
      {/* <h1>NONONONONONONO</h1> */}
      <Segment raised>
        <Placeholder>
          <Placeholder.Header >
            <h1>Nothing found, try another search</h1>
          </Placeholder.Header>
          <Placeholder.Line length='full' />
          <Placeholder.Line length='very long' />
          <Placeholder.Line length='long' />
          <Placeholder.Line length='medium' />
          <Placeholder.Line length='short' />
          <Placeholder.Line length='very short' />
        </Placeholder>
      </Segment>
    </Fragment>
  );
};
export default ActivityListItemMissedSearch;
