import { formatDistance } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Card, Segment, Image, Icon, Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { IMember } from "../../../app/models/member";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ConfirmLockout from "../modals/ConfirmLockout";
import ConfirmUnlock from "../modals/ConfirmUnlock";
import { useHistory } from "react-router-dom";
import ConfirmRoles from "../modals/ConfirmRoles";
import TableUserActivity from "../user-items/activities/TableUserActivity";
import TableUserMotofy from "../user-items/motofies/TableUserMotofy";
import TableUserForumpost from "../user-items/forumposts/TableUserForumpost";
import TableUserMechanic from "../user-items/mechanics/TableUserMechanic";
import TableUserProduct from "../user-items/products/TableUserProduct";

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

  // const { loadActivities, loadingActivities, activities } =
  // rootStore.adminStore;  setActivityView

  const {
    loadMember,
    member,
    loadingMember,
    suspendMember,
    reactivateMember,
    loadActivities,
    activities,
    showActivityView,
    activityView,
    loadMotofies,
    motofies,
    showMotofyView,
    motofyView,
    loadForumposts,
    forumposts,
    showForumpostView,
    forumpostView,
    loadMechanics,
    mechanics,
    showMechanicView,
    mechanicView,
    loadProducts,
    products,
    showProductView,
    productView
  } = adminStore;

  const { openModal, setSize } = modalStore;

  const classesPosts = 'ui button fluid basic admin-button';
  const classesUserActions = 'ui button basic action-button';

  let back = useHistory();

  useEffect(() => {
    // console.log(member)
    loadMember(match.params.username);
    loadActivities(match.params.username);
    loadMotofies(match.params.username);
    loadForumposts(match.params.username);
    loadMechanics(match.params.username);
    loadProducts(match.params.username);
  }, [loadMember, match.params.username, history]);

  // const [activityView, showActivityView] = useState(false);

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
      {!activityView && !motofyView && !forumpostView && !mechanicView && !productView &&
      <Grid>
        <Grid.Column width={16}>
          <div className='action-button-container'>
            <button
              className={classesUserActions}
              onClick={() => back.goBack()}
            >
              Back
            </button>

            <button
              className={classesUserActions}
              disabled={member.suspended}
              onClick={() => handleSuspendUser(member)}
            >
              Suspend User{" "}
            </button>
            <button
              className={classesUserActions}
              disabled={!member.suspended}
              onClick={() => handleReactivateUser(member)}
            >
              Reactivate User{" "}
            </button>
            <button
              disabled={member.userRoles.includes("Admin")}
              className={classesUserActions}
              onClick={() => handleLockoutUser(member.username)}
            >
              Lockout User{" "}
            </button>
            <button
              disabled={member.userRoles.includes("Admin")}
              className={classesUserActions}
              onClick={() => handleUnlockUser(member.username)}
            >
              Unlock{" "}
            </button>
            <button className={classesUserActions}>
              Send User A Message{" "}
            </button>
            <button
              className={classesUserActions}
              onClick={() => handleEditRoles(member)}
            >
              Manage Roles{" "}
            </button>
          </div>
        </Grid.Column>
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


              <button
                className={classesPosts}
                color='grey'
                onClick={()=>showActivityView(true)}
              >
                Get {member.displayName}'s Activities{" "}
              </button>

              <button
                className={classesPosts}
                color='grey'
                onClick={()=>showMotofyView(true)}
              >
                Get {member.displayName}'s Motofies{" "}
              </button>
              <button
                className={classesPosts}
                color='grey'
                onClick={()=> showForumpostView(true)}
              >
                Get {member.displayName}'s Forumposts{" "}
              </button>
              <button
                className={classesPosts}
                color='grey'
                onClick={()=>showMechanicView(true)}
              >
                Get {member.displayName}'s Mechanics{" "}
              </button>
              <button
                className={classesPosts}
                color='grey'
                onClick={()=>showProductView(true)}
              >
                Get {member.displayName}'s Products{" "}
              </button>
          </div>
        </Grid.Column>
      </Grid>
       }
       {activityView && 
       <TableUserActivity activities={activities}/>
       }
       {motofyView && 
       <TableUserMotofy motofies={motofies}/>

       }
       {forumpostView && 
       <TableUserForumpost forumposts={forumposts}/>

       }
       {mechanicView && 
       <TableUserMechanic mechanics={mechanics}/>

       }
       {productView && 
       <TableUserProduct products={products}/>

       }
    </Segment>
  );
};

export default observer(UserDetailedInfo);
