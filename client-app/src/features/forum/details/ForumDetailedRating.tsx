import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Segment, Grid, Button } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ForumDetailedRating: React.FC<{ forumpost: IForumpost }> = ({
  forumpost,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const { setRating } = rootStore.forumPostStore;
  const { addFeedItem } = rootStore.feedStore;

  const [rated, setRated] = useState(false);
  const { t } = useTranslation(["forum"]);

  const [username, setUsername] = useState('');


  useEffect(() => {

    setUsername(forumpost.userName)

    if (forumpost.forumpostRatings!.length > 0) {
      
      forumpost.forumpostRatings?.forEach((rating) => {
        if (rating.authorUsername === user?.userName) {
          setRated(true);
        } 
      });
    }
    console.log(toJS(username));

  }, [forumpost, user, username]);

  const handleRating = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: any
  ) => {
    setRated(true);
    setRating(forumpost.id, data.value);
    addFeedItem(forumpost.id, 'Rated Forumpost', username)
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
                content={t('Interesting')}
                value={'3'}
              />
            </Grid.Column>

            <Grid.Column width={5} style={{ width: "100%" }}>
              <Button
                fluid
                onClick={(e, data) => handleRating(e, data)}
                content={t('Usefull')}
                value={'4'}
              />
            </Grid.Column>

            <Grid.Column width={5} style={{ width: "100%" }}>
              <Button
                fluid
                onClick={(e, data) => handleRating(e, data)}
                content={t('Helping')}
                value={'5'}
              />
            </Grid.Column>
          </Grid>
        </Segment>
      )}
    </>
  );
};

export default observer(ForumDetailedRating);
