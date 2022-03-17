import React from "react";
import { Link } from "react-router-dom";
import { Feed, Segment } from "semantic-ui-react";
import { IFeed } from "../../../app/models/feed";

const FeedListItem: React.FC<{ feed: IFeed }> = ({ feed }) => {
  return (
    <Segment.Group raised>

      <Feed>
        <Feed.Event>
          <Feed.Label
          >
            <img
              src={feed.notifierPhotoUrl || "/assets/user.png"}
              alt='userPoto'
            />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User as={Link} to={`/profile/${feed.notifierUsername}`}>
                {feed.notifierDisplayname} 
              </Feed.User>
              {" "} 
              <Feed.Meta>{feed.info}</Feed.Meta>
              <Feed.Date>
                {feed.dateTriggered}
              </Feed.Date>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    </Segment.Group>
  );
};

export default FeedListItem;

