import { observer } from "mobx-react-lite";
import React from "react"; // , { Fragment, useContext }
import { Link } from "react-router-dom";
import { Segment, Header } from "semantic-ui-react"; //, Image
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const host = activity.attendees.filter((h) => h.isHost)[0];
  const { t } = useTranslation(["diaries"]);

  return (
    <Segment style={{ padding: "0" }} raised>
      <Segment textAlign='center'>
        <Header as='h2'>
          {activity.title}
          <Header.Subheader>
            <span>
              {t("Hosted by")}{" "}
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
