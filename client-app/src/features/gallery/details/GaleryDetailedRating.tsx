import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Rating, RatingProps, Segment } from "semantic-ui-react";
import { IMotofy, IMotofyScore } from "../../../app/models/motofy";
import { RootStoreContext } from "../../../app/stores/rootStore";

// const GaleryDetailedRating = () => (
// );

// export default GaleryDetailedRating;

interface IProps {
  motofy: IMotofy;
}
const GaleryDetailedRating: React.FC<IProps> = ({ motofy }) => {
  const rootStore = useContext(RootStoreContext);
  const { rateMotofy } = rootStore.motofyStore;
  const { user } = rootStore.userStore;

  let username = user?.userName;
  // const [rating, setRating] = useState<string | number | undefined>();
  const [rated, setRated] = useState(false);
  const [userRated, setUserRated] = useState<string | number | undefined>();

  // console.log("motofy:", toJS(motofy));

  useEffect(() => {
    // console.log('motofy!!!! ', motofy);

    if (motofy.motofyScores.some((x) => x.username === username)) {
      setUserRated(
        motofy.motofyScores.find((x) => x.username === username).score
      );

      setRated(true);
    } else {
      // console.log('rating!!!! ', rating);
    }

    // motofy.motofyScores
    // loadMessageThread(match.params.id);
  }, [motofy.motofyScores, username]); //[loadMessageThread, match.params.id, setUser, user]//rating,

  // const handleRateMotofy = (rating: any) => {
  //   let newScore: IMotofyScore = {
  //     username: user?.userName,
  //     displayName: user?.displayName,
  //     score: rating,
  //   };
  //   // motofy.motofyScores.push(newScore);
  //   // console.log("WHATSHAPPNIN???");
  //   // console.log(motofy.motofyScores);

  // };
  const handleRate = (e: any, rating: RatingProps) => {
    // handleRateMotofy(rating.rating);

    rateMotofy(rating.rating, motofy, user);
    setUserRated(rating.rating);
    e.preventDefault();
    // setRating(rating.rating);
    setRated(true);
  };
  return (
    <Segment.Group>
      <Segment>
        {!motofy.isOwner ? (
          <Fragment>
            <Rating
              icon='star'
              size='large'
              onRate={(e, rating) => {
                handleRate(e, rating);
              }}
              defaultRating={motofy.averageRating}
              maxRating={5}
              disabled={rated}
            />
            <p>Average Rating: {motofy.averageRating}</p>
            {userRated ? (
              <p>You Rated: {userRated}</p>
            ) : (
              <p>You Have Not Rated Yet</p>
            )}
          </Fragment>
        ) : (
          <Fragment>You cannot rate your own motofy</Fragment>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(GaleryDetailedRating);
