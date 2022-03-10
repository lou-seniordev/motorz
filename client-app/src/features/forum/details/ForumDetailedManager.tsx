import { observer } from "mobx-react-lite";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Segment, Button } from "semantic-ui-react";
import { IForumpost } from "../../../app/models/forumpost";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ConfirmDelete from "../modals/ConfirmDelete";
import ForumDetailedRating from "./ForumDetailedRating";

// const activityImageStyle = {
//   filter: "brightness(90%)",
// };

// const activityImageTextStyle = {
//   position: "absolute",
//   bottom: "5%",
//   left: "5%",
//   width: "100%",
//   height: "auto",
//   color: "white",
// };

const ForumDetailedManager: React.FC<{ forumpost: IForumpost }> = ({
  forumpost,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
//   const { setRated } = rootStore.forumPostStore;

  const [managing, setManaging] = useState(false);

  const handleDeleteForumpost = () => {
    openModal(<ConfirmDelete forumpostId={forumpost.id} />);
    setManaging(false);
  };

  const toggleManaging = () => {
    setManaging(true);
  };

//   const handleView = useCallback(
//     (forumpost: IForumpost) => {
//       if (forumpost.forumpostRatings!.length > 0) {
//         forumpost.forumpostRatings!.forEach((customer: any) => {
//           if (user!.userName === customer.authorUsername) setRated(true);
//         });
//       }
//     },
//     [
//       setRated,
//       // setCommented,
//       user,
//     ]
//   );

//   useEffect(() => {
//     handleView(forumpost);
//     return () => {
//       //   console.log("cleaned up");
//       setRated(false);
//     //   setCommented(false);
//     };
//   }, [handleView, forumpost, setRated]);

  return (
    <>
      <Segment clearing attached='bottom'>
        {/* {forumpost.userName === user?.userName && ( */}
          <>
            {!managing ? (
              <Button onClick={toggleManaging} color='twitter' fluid>
                Manage your diary
              </Button>
            ) : (
              <>
                <Button
                  as={Link}
                  to={`/manageForum/${forumpost.id}`}
                  // onClick={handleDeleteForumpost}
                  color='teal'
                  floated='left'
                >
                  Manage Your Post
                </Button>
                <Button
                  onClick={() => {
                    setManaging(false);
                  }}
                  color='grey'
                  floated='right'
                //   fluid
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteForumpost}
                  color='google plus'
                  floated='right'
                >
                  Delete Post
                </Button>
              </>
            )}
          </>
        {/* )} */}
      </Segment>
    </>
  );
};

export default observer(ForumDetailedManager);
