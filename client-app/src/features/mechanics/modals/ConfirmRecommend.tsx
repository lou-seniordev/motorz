import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import { Header, Button, Grid } from "semantic-ui-react";
// import { IUser } from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
    mechanicId: string;
}
const ConfirmRecommend: React.FC<IProps> = ({ mechanicId}) => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;

  const { recommend } = rootStore.mechanicStore;
  const { closeModal } = rootStore.modalStore;

  const handleRecommend = (id: string) => {

    recommend(id);
    closeModal();
    // history.push(`/mechanics`);
  };

  const cancelRecommend = () => {
    closeModal();
  };
  let history = useHistory();

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content='Recommend This Mechanic To Everybody?'
          color='teal'
          textAlign='center'
        />
        <Fragment>
          <Button
            // fluid
            onClick={() => handleRecommend(mechanicId)}
            color='teal'
            content='Yes, gladly!'
            floated='left'
          />
          <Button
            // fluid
            onClick={() => cancelRecommend()}
            content='No, cancel'
            floated='right'
          />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmRecommend;
