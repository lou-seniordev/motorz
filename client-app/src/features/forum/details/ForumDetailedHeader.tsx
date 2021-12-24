import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";
import { RootStoreContext } from "../../../app/stores/rootStore";

const activityImageStyle = {
  filter: "brightness(90%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const ForumDetailedHeader: React.FC<{ forumpost: IForumpost }> = ({
  forumpost,
}) => {
  const rootStore = useContext(RootStoreContext);
  // const {forumpostsByDate } = rootStore.forumPostStore;

  const { user } = rootStore.userStore;
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: "0" }}>
        <Image
          src={`/assets/forumCategoryImages/${forumpost.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={forumpost.title}
                  style={{ color: "white" }}
                />
                <p>{forumpost.category}</p>
                <p>{forumpost.dateAdded}</p>
                <p>
                  Posted by
                  <Link to={`/profile/${forumpost.userName}`}>
                    <strong> {forumpost.displayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {forumpost.userName === user?.userName && (
          <Button
            as={Link}
            to={`/manageForum/${forumpost.id}`}
            color='orange'
            floated='left'
          >
            Manage Your Post
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(ForumDetailedHeader);
