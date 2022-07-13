import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import { Header, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
  activityId: string;
}
const ConfirmRating: React.FC<IProps> = ({ activityId }) => {
  const rootStore = useContext(RootStoreContext);
const {  deactivateActivity} = rootStore.activityStore;
const {  addFeedItem, 
} = rootStore.feedStore;

  const { closeModal } = rootStore.modalStore;

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content='Sure you want to do this?'
          color='teal'
          textAlign='center'
        />

        <Fragment>
          <Button
            fluid
            // onClick={() => handleDeactivateActivity(activityId)}
            color='teal'
            content='Yes, deactivate it!'
            floated='left'
          />
          <Button
            fluid
            // onClick={() => cancelDeactivateActivity()}
            content='No, keep it active'
            floated='right'
          />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmRating;
