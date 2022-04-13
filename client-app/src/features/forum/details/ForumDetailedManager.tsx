import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation(["forum"]);

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
              {t("Manage your post")}
            </Button>
          ) : (
            <div className='ui three buttons'>

          
                <Button
                  as={Link}
                  to={`/manageForum/${forumpost.id}`}
                  color='pink'
                  basic
                >
                  {t("Edit")}
                </Button>
           
                <Button
                  onClick={handleDeleteForumpost}
                  color='google plus'
                  // fluid
                >
                  {t("Delete")}
                </Button>
                <Button
                  onClick={() => {
                    setManaging(false);
                  }}
                  // color='grey'
                  // fluid
                >
                  {t("Cancel")}
                </Button>
            </div>
          )}
        </>
      </Segment>
    </>
  );
};

export default observer(ForumDetailedManager);
