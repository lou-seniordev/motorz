import { formatDistance } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Card, Segment, Image, Icon, Grid, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IMember } from "../../../app/models/member";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ConfirmLockout from "../modals/ConfirmLockout";
import ConfirmUnlock from "../modals/ConfirmUnlock";
import { useHistory } from "react-router-dom";
import ConfirmRoles from "../modals/ConfirmRoles";

interface DetailParams {
  username: string;
}
const UserDetailedInfo: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const adminStore = rootStore.adminStore;
  const modalStore = rootStore.modalStore;

  const {
    loadMember,
    member,
    loadingMember,
    suspendMember,
    reactivateMember,
    lockoutMember,
    unlockMember,
  } = adminStore;

  const { openModal, setSize } = modalStore;

  let back = useHistory();

  useEffect(() => {
    loadMember(match.params.username);
  }, [loadMember, match.params.username, history]);

  const handleSuspendUser = (member: IMember) => {
    suspendMember(member);
  };
  const handleReactivateUser = (member: IMember) => {
    reactivateMember(member);
  };
  const handleLockoutUser = (username: string) => {
    setSize("tiny");
    openModal(<ConfirmLockout username={username} />);
  };
  const handleUnlockUser = (username: string) => {
    setSize("tiny");
    openModal(<ConfirmUnlock username={username} />);
  };
  const handleEditRoles = (member: IMember) => {
    setSize("tiny");
    openModal(<ConfirmRoles member={member} />);
  };

  if (loadingMember || !member)
    return <LoadingComponent content={"Loading member..."} />;

  return (
    <Segment attached='top' textAlign='center' raised>
      <Grid>
        <Grid.Column width={4}>
          <Card>
            <Image
              src={member.photoUrl || "/assets/user.png"}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>{member.displayName}</Card.Header>
              <Card.Meta>
                <span className='date'>
                  Member since{" "}
                  {formatDistance(new Date(member.joinedUs!), new Date())}
                </span>
              </Card.Meta>
              <Card.Description>{member.bio}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Card.Meta>
                <Icon name='user' /> {member.followersCount}{" "}
                {member.followersCount > 1 || member.followersCount === 0
                  ? "Followers"
                  : "Follower"}
              </Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={6}>
          <Card>
            <Card.Content>
              <Card.Header>
                {" "}
                Last Active{" "}
                {formatDistance(new Date(member.lastActive!), new Date(), {
                  addSuffix: true,
                })}
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Card.Meta>Age: {member.age}</Card.Meta>
              <Card.Meta>City: {member.city}</Card.Meta>
              <Card.Meta>Country: {member.country}</Card.Meta>
              <Card.Meta>Email: {member.email}</Card.Meta>
              <Card.Meta>Gender: {member.gender}</Card.Meta>
              <Card.Meta>Rank: {member.rank}</Card.Meta>
              <Card.Meta>Points: {member.points}</Card.Meta>
              <Card.Meta>Followers: {String(member.followersCount)}</Card.Meta>
              <Card.Meta>Following: {String(member.followingsCount)}</Card.Meta>
              <Card.Meta>Suspended: {String(member.suspended)}</Card.Meta>
              <Card.Header>
                Roles:
                {member.userRoles.map((role) => (
                  <Card.Meta key={role}> {role}</Card.Meta>
                ))}
              </Card.Header>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={6}>
          <div className='admin-button-container'>
            <button className='ui button fluid basic admin-button' color='grey'>
              Get {member.displayName}'s Activities{" "}
            </button>
            <button className='ui button fluid basic admin-button' color='grey'>
              Get {member.displayName}'s Motofies{" "}
            </button>
            <button className='ui button fluid basic admin-button' color='grey'>
              Get {member.displayName}'s Forumposts{" "}
            </button>
            <button className='ui button fluid basic admin-button' color='grey'>
              Get {member.displayName}'s Mechanics{" "}
            </button>
            <button className='ui button fluid basic admin-button' color='grey'>
              Get {member.displayName}'s Products{" "}
            </button>
          </div>
        </Grid.Column>
        <Grid.Column width={16}>
          <div className='action-button-container'>
            <button
              className='ui button basic action-button'
              onClick={() => back.goBack()}
            >
              Back
            </button>

            <button
              className='ui button basic action-button'
              disabled={member.suspended}
              onClick={() => handleSuspendUser(member)}
            >
              Suspend User{" "}
            </button>
            <button
              className='ui button basic action-button'
              disabled={!member.suspended}
              onClick={() => handleReactivateUser(member)}
            >
              Reactivate User{" "}
            </button>
            <button
              disabled={member.userRoles.includes("Admin")}
              className='ui button basic action-button'
              onClick={() => handleLockoutUser(member.username)}
            >
              Lockout User{" "}
            </button>
            <button
              disabled={member.userRoles.includes("Admin")}
              className='ui button basic action-button'
              onClick={() => handleUnlockUser(member.username)}
              >
              Unlock{" "}
            </button>
            <button className='ui button basic action-button'>
              Send User A Message{" "}
            </button>
            <button className='ui button basic action-button'
              onClick={() => handleEditRoles(member)}
            >
              Manage Roles{" "}
            </button>
          </div>
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default observer(UserDetailedInfo);
