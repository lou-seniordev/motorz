// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Item, ItemExtra, Rating, RatingProps, Segment } from "semantic-ui-react";
import { IMotofy } from "../../../app/models/motofy";
import { RootStoreContext } from "../../../app/stores/rootStore";



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
      <Segment style={{
          display: 'flex', 
          flexDirection: 'column', 
          textAlign: 'center', 
          justifyContent: 'space-around'}}>
        <Item.Group>

        <Item.Header>Average Rating: {motofy.averageRating}</Item.Header>
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
            {userRated ? (
              <ItemExtra>You Gave This Motofy {userRated} Stars</ItemExtra>
            ) : (
              <ItemExtra>You Have Not Rated Yet</ItemExtra>
            )}
          </Fragment>
        ) : (
          <Fragment>NB: You cannot rate your own motofy</Fragment>
        )}
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
};

export default observer(GaleryDetailedRating);
