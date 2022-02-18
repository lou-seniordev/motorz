import { formatDistance } from "date-fns";
import React from "react";
// import { Link } from "react-router-dom";
import {  Feed, Icon,  Segment } from "semantic-ui-react";
import { IFeed } from "../../../app/models/feed";
// import { IForumpost } from "../../../app/models/forumpost";

const FeedListItem: React.FC<{ feed: IFeed }> = ({ feed }) => {
  return (
    <Segment.Group raised>
        {/* <h1>{feed.notifierDisplayname}</h1> */}

         <Feed>
        <Feed.Event>
          <Feed.Label>
            <img src={feed.notifierPhotoUrl || "/assets/user.png"} />
          </Feed.Label>
          <Feed.Content>
            <Feed.Summary>
              <Feed.User>{feed.notifierDisplayname} {feed.info}</Feed.User> 
              <Feed.Date>
              {feed.dateTriggered} 
              
            
              {/* {formatDistance(
                        new Date(feed.dateTriggered),
                        new Date()
                      )} */}
              
              </Feed.Date>
            </Feed.Summary>
            <Feed.Extra images>
              <a>
                <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
              </a>
              <a>
                <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
              </a>
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like>
                <Icon name='like' />4 Likes
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>

      </Feed>

     
    </Segment.Group>
  );
};

export default FeedListItem;




// <Feed.Event>
// <Feed.Label image='/images/avatar/small/helen.jpg' />
// <Feed.Content>
//   <Feed.Summary>
//     <a>Helen Troy</a> added <a>2 new illustrations</a>
//     <Feed.Date>4 days ago</Feed.Date>
//   </Feed.Summary>
//   <Feed.Extra images>
//     <a>
//       <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
//     </a>
//     <a>
//       <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
//     </a>
//   </Feed.Extra>
//   <Feed.Meta>
//     <Feed.Like>
//       <Icon name='like' />1 Like
//     </Feed.Like>
//   </Feed.Meta>
// </Feed.Content>
// </Feed.Event>

// <Feed.Event>
// <Feed.Label image='/images/avatar/small/jenny.jpg' />
// <Feed.Content>
//   <Feed.Summary
//     date='2 Days Ago'
//     user='Jenny Hess'
//     content='add you as a friend'
//   />
//   <Feed.Meta>
//     <Feed.Like>
//       <Icon name='like' />8 Likes
//     </Feed.Like>
//   </Feed.Meta>
// </Feed.Content>
// </Feed.Event>

// <Feed.Event>
// <Feed.Label image='/images/avatar/small/joe.jpg' />
// <Feed.Content>
//   <Feed.Summary>
//     <a>Joe Henderson</a> posted on his page
//     <Feed.Date>3 days ago</Feed.Date>
//   </Feed.Summary>
//   <Feed.Extra text>
//     Ours is a life of constant reruns. We're always circling back to
//     where we'd we started, then starting all over again. Even if we
//     don't run extra laps that day, we surely will come back for more
//     of the same another day soon.
//   </Feed.Extra>
//   <Feed.Meta>
//     <Feed.Like>
//       <Icon name='like' />5 Likes
//     </Feed.Like>
//   </Feed.Meta>
// </Feed.Content>
// </Feed.Event>

// <Feed.Event>
// <Feed.Label image='/images/avatar/small/justen.jpg' />
// <Feed.Content>
//   <Feed.Summary>
//     <a>Justen Kitsune</a> added <a>2 new photos</a> of you
//     <Feed.Date>4 days ago</Feed.Date>
//   </Feed.Summary>
//   <Feed.Extra images>
//     <a>
//       <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
//     </a>
//     <a>
//       <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
//     </a>
//   </Feed.Extra>
//   <Feed.Meta>
//     <Feed.Like>
//       <Icon name='like' />
//       41 Likes
//     </Feed.Like>
//   </Feed.Meta>
// </Feed.Content>
// </Feed.Event>


//   <Segment >
//         <Item>
//           <Item.Image
//             size='tiny'
//             // circular
//             src={`/assets/forumCategoryImages/${forumpost.category}.jpg`}
//           />
//           <Item.Content>
//             <Item.Header as='a'>{forumpost.title}</Item.Header>
//             <Item.Meta>{forumpost.dateAdded}</Item.Meta>

//             <Item.Description>
//               Posted by 
//               <Link to={`/profile/${forumpost.userName}`}>
//                 {forumpost.displayName}
//               </Link>
//             </Item.Description>
//             <Item.Description>
//               <div>{forumpost.body}</div>
//             </Item.Description>

//             <Item.Description>
//               <div>Just to compare {forumpost.id}</div>
//             </Item.Description>

//             <Item.Extra>
//               <Button
//                 as={Link}
//                 to={`/forum/${forumpost.id}`}
//                 floated='right'
//                 content='view'
//                 color='blue'
//               />
//               <Label basic content={forumpost.category} />
//             </Item.Extra>
//           </Item.Content>
//         </Item>
//       </Segment>
//       <Segment>
//         <Icon name='clock' /> {forumpost.dateAdded}
//       </Segment>
//       <Segment secondary>{forumpost.numberOfComents!} Responses from {forumpost.commenters?.length} Members</Segment> 