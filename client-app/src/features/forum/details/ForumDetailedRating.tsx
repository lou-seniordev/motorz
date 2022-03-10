import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Segment, Grid, Button } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ForumDetailedInfo: React.FC<{ forumpost: IForumpost }> = ({
  forumpost,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const { setRating } = rootStore.forumPostStore;
  const { addFeedItem } = rootStore.feedStore;

  const [rated, setRated] = useState(false);

  useEffect(() => {
    if (forumpost.forumpostRatings!.length > 0) {
      forumpost.forumpostRatings?.forEach((rating) => {
        if (rating.authorUsername === user?.userName) {
          setRated(true);
        } 
        // else {
        //   setRated(false);
        // }
      });
    }
  }, [forumpost, user]);

  const handleRating = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: any
  ) => {
    setRated(true);
    setRating(forumpost.id, data.content);
    addFeedItem(forumpost.id, 'Rated Forumpost')
  };

  return (
    <>
      {user?.userName !== forumpost.userName && !rated && (
        
        <Segment attached>
          <Grid verticalAlign='middle'>
            <Grid.Column width={5} style={{ width: "100%" }}>
              <Button
                fluid
                onClick={(e, data) => handleRating(e, data)}
                content='Interesting'
              />
            </Grid.Column>

            <Grid.Column width={5} style={{ width: "100%" }}>
              <Button
                fluid
                onClick={(e, data) => handleRating(e, data)}
                content='Usefull'
              />
            </Grid.Column>

            <Grid.Column width={5} style={{ width: "100%" }}>
              <Button
                fluid
                onClick={(e, data) => handleRating(e, data)}
                content='Helping'
              />
            </Grid.Column>
          </Grid>
        </Segment>
      )}
    </>
  );
};

export default observer(ForumDetailedInfo);
