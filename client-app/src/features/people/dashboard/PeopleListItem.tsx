// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { IProfile } from "../../../app/models/profile";
import { RootStoreContext } from "../../../app/stores/rootStore";

const PeopleListItem: React.FC<{ member: IProfile }> = ({ member }) => {
  const rootStore = useContext(RootStoreContext);
  const { onlineUsers } = rootStore.presenceStore;

  const { t } = useTranslation(["social"]);
  // console.log("onlineUsers", onlineUsers);
  // console.log("member.username", member.username);

  //  console.log('onlineUsers', toJS(onlineUsers))
  // const styles = {
  //   borderColor: "green",
  //   borderWidth: 3,
  // };
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
          circular
          bordered
          // style={ styles}
          // style={onlineUsers.includes(member.username) ? styles : null}
        />
        <Card.Header>
          {onlineUsers.includes(member.username) && (
            <Icon name='check circle' className='isOnline' bordered circular size="tiny"/>
            )}
            {member.displayName || "display name"}
        </Card.Header>

        <Card.Meta>
          {member.followersCount === 1
            ? member.followersCount + t("Folower")
            : t("Followers")}{" "}
        </Card.Meta>
        {member.following && (
          <Card.Description style={{ color: "green" }}>
            {t("Following")}
          </Card.Description>
        )}
      </Card.Content>
    </Card>
  );
};

export default observer(PeopleListItem);
