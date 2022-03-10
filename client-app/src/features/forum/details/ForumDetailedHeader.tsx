import { observer } from "mobx-react-lite";
import React from "react";
// import { Link } from "react-router-dom";
import { Segment, Image, Item, Header } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";
// import { RootStoreContext } from "../../../app/stores/rootStore";
// import ConfirmDelete from "../modals/ConfirmDelete";

const activityImageStyle = {
  filter: "brightness(90%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "15%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const ForumDetailedHeader: React.FC<{ forumpost: IForumpost }> = ({
  forumpost,
}) => {
  // const rootStore = useContext(RootStoreContext);

  // const { user } = rootStore.userStore;
 
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
                <p>{forumpost.category}</p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      
    </Segment.Group>
  );
};

export default observer(ForumDetailedHeader);
