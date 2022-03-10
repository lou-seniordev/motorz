import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Image, Item } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";

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
