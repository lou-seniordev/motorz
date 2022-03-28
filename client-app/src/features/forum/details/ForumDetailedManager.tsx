import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Button, Grid, GridColumn } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ConfirmDelete from "../modals/ConfirmDelete";

const ForumDetailedManager: React.FC<{ forumpost: IForumpost }> = ({
  forumpost,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { openModal } = rootStore.modalStore;

  const [managing, setManaging] = useState(false);

  const handleDeleteForumpost = () => {
    openModal(<ConfirmDelete forumpostId={forumpost.id} />);
    setManaging(false);
  };

  const toggleManaging = () => {
    setManaging(true);
  };

  return (
    <>
      <Segment clearing attached='bottom'>
        <>
          {!managing ? (
            <Button onClick={toggleManaging} color='instagram' fluid>
              Manage your post
            </Button>
          ) : (
            <Grid>
              <GridColumn width={5}>
                <Button
                  as={Link}
                  to={`/manageForum/${forumpost.id}`}
                  color='teal'
                  fluid
                >
                  Manage
                </Button>
              </GridColumn>
              <GridColumn width={5}>
                <Button
                  onClick={() => {
                    setManaging(false);
                  }}
                  color='grey'
                  fluid
                >
                  Cancel
                </Button>
              </GridColumn>
              <GridColumn width={5}>
                <Button
                  onClick={handleDeleteForumpost}
                  color='google plus'
                  fluid
                >
                  Delete
                </Button>
              </GridColumn>
            </Grid>
          )}
        </>
      </Segment>
    </>
  );
};

export default observer(ForumDetailedManager);
