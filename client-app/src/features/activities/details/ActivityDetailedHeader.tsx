import { observer } from "mobx-react-lite";
import React from "react"; // , { Fragment, useContext }
import { Link } from "react-router-dom";
import { Segment, Header } from "semantic-ui-react"; //, Image
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
// import { RootStoreContext } from "../../../app/stores/rootStore";

// import ConfirmDeactivate from "../modals/ConfirmDeactivate";

// const activityImageStyle = {
//   filter: "brightness(70%)",
// };

// const activityImageTextStyle = {
//   position: "absolute",
//   bottom: "5%",
//   left: "5%",
//   width: "100%",
//   height: "auto",
//   color: "white",
// };
const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const host = activity.attendees.filter((h) => h.isHost)[0];

  return (
    <Segment style={{ padding: "0" }} raised>
      <Segment textAlign='center'>
        <Header as='h2'>
          {activity.title}
          <Header.Subheader>
            <span>
              Hosted by{" "}
              <Link to={`/profile/${host.username}`}>
                <strong>{host.displayName}</strong>
              </Link>
            </span>
            <span>
              {", "} on {format(activity.date, "eeee do MMMM")}{" "}
            </span>
          </Header.Subheader>
        </Header>
      </Segment>
    </Segment>
  );
};

export default observer(ActivityDetailedHeader);
