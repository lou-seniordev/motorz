import React from "react";
import { Segment, Placeholder } from "semantic-ui-react";
const FeedListItemPlaceholder = () => {
  return (
    <Segment.Group raised>
      <Segment>

      <Placeholder fluid>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
      </Segment>
    </Segment.Group>
  );
};
export default FeedListItemPlaceholder;
