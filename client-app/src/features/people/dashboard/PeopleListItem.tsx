import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import { IProfile } from "../../../app/models/profile";

const PeopleListItem: React.FC<{ member: IProfile }> = ({ member }) => {

 
  return (
    // <Card as={Link} to={`/profile/${member.username}`}>
    //     <Image src={member.image || '/assets/user.png'} size='tiny' circular/>
    //     <Card.Content>
    //       <Card.Header>{member.displayName || 'display name'}</Card.Header>
    //     </Card.Content>
    //     <Card.Meta>
    //       {/* <div> */}
    //         <Icon name='user' />
    //         {member.followersCount} Followers
    //       {/* </div> */}
    //     </Card.Meta>
    //   </Card>

    <Card as={Link} to={`/profile/${member.username}`} raised>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={member.image || "/assets/user.png"}
        />
        <Card.Header>{member.displayName || "display name"}</Card.Header>
        <Card.Meta>{member.followersCount === 1 ? member.followersCount + ' Folower' : ' Followers'} </Card.Meta>
        {member.following && (
          <Card.Description style={{ color: "green" }}>
            Following
          </Card.Description>
        )}
      </Card.Content>
    </Card>
  );
};

export default PeopleListItem;


