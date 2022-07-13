import { observer } from "mobx-react-lite";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Item, ItemExtra, Rating, RatingProps, Segment } from "semantic-ui-react";
import { IMotofy } from "../../../app/models/motofy";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { useTranslation } from "react-i18next";



interface IProps {
  motofy: IMotofy;
}
const GaleryDetailedRating: React.FC<IProps> = ({ motofy }) => {
  const rootStore = useContext(RootStoreContext);
  const { rateMotofy } = rootStore.motofyStore;
  const { user } = rootStore.userStore;
  const { addFeedItem } = rootStore.feedStore;

  const { t } = useTranslation(["gallery"]);


  let username = user?.userName;
  const [rated, setRated] = useState(false);
  const [userRated, setUserRated] = useState<string | number | undefined>();
  
  const [notifyeeUsername, setNotifyeeUsername] = useState('');


  useEffect(() => {
    setNotifyeeUsername(motofy.publisherUsername);

    if(motofy.motofyScores.length > 0) {

      if (motofy.motofyScores.some((x) => x.username === username)) {
        setUserRated(
          motofy.motofyScores.find((x) => x.username === username).score
        );
        setRated(true);
      } 
     
    }


  }, [motofy.motofyScores, username, motofy.publisherUsername]); 


  const handleRate = (e: any, rating: RatingProps) => {

    rateMotofy(rating.rating, motofy, user);
    setUserRated(rating.rating);
    e.preventDefault();
    setRated(true);
    addFeedItem(motofy.id, 'Rated Motofy', notifyeeUsername)

  };
  return (
    <Segment.Group>
      <Segment style={{
          display: 'flex', 
          flexDirection: 'column', 
          textAlign: 'center', 
          justifyContent: 'space-around'}}>
        <Item.Group>

        <Item.Header>{t("Average Rating:")} {motofy.averageRating}</Item.Header>
        {motofy.publisherUsername !== user!.userName ? (
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
              <ItemExtra>{t("You Gave This Motofy ")} {userRated} {t("Stars")}</ItemExtra>
            ) : (
              <ItemExtra>{t("You Have Not Rated Yet")}</ItemExtra>
            )}
          </Fragment>
        ) : (
          <Fragment>{t("NB: You cannot rate your own motofy")}</Fragment>
        )}
        </Item.Group>
      </Segment>
    </Segment.Group>
  );
};

export default observer(GaleryDetailedRating);
