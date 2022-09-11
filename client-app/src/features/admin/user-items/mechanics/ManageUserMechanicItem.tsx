import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
// import { IActivity } from "../../../../app/models/activity";
import { RootStoreContext } from "../../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}
const ManageUserActivityItem: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const adminStore = rootStore.adminStore;

  const { loadActivity, activity, showActivityView, loadingActivity } =
    adminStore;
  //setActivityView

  useEffect(() => {
    loadActivity(match.params.id);
    // showActivityView();
  }, [loadActivity, match.params.id, history]);

  if (loadingActivity || !activity)
    return <LoadingComponent content={"Loading activity..."} />;

  return (
    <>
      <h3>ManageUserActivityItem</h3>
      <h4></h4>
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
          />
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>{activity.country}</Card.Meta>
          <Card.Description>
            {activity.description.slice(0, 100)}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui three buttons'>
            <Button basic color='green'>
              Delete
            </Button>
            <Button basic color='red'>
              Deactivate
            </Button>
            <Button basic color='red'>
              Complete
            </Button>
          </div>
        </Card.Content>
      </Card>
    </>
  );
};

export default ManageUserActivityItem;
