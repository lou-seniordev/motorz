import React, { Fragment } from 'react';
import { Segment,  Placeholder } from 'semantic-ui-react';
const PrivateMessagesListItemPlaceholder = () => {
  return (
    <Fragment>
      <Placeholder fluid >
        <Segment.Group>
          <Segment style={{ minHeight: 110 }}>
            <Placeholder>
              <Placeholder.Header >
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
          <Segment>
            <Placeholder>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          </Segment>
          <Segment secondary style={{ minHeight: 70 }} />
          <Segment clearing>
          </Segment>
        </Segment.Group>
      </Placeholder>
    </Fragment>
  );
};
export default PrivateMessagesListItemPlaceholder;

