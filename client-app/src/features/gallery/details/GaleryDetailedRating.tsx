import React from 'react';
import { Rating, Segment } from 'semantic-ui-react';

// const GaleryDetailedRating = () => (
// );

// export default GaleryDetailedRating;

const GaleryDetailedRating = () => {
  return (
    <Segment.Group>
        <Segment>

        <Rating icon='star' defaultRating={1} maxRating={5} />
        </Segment>
    </Segment.Group>
  )
};

export default GaleryDetailedRating;
