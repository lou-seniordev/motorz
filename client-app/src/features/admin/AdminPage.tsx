import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Tab } from "semantic-ui-react";
import UsersOverview from "./user-administration/UsersOverview";
import LoadingComponent from "../../app/layout/LoadingComponent";

interface RouteParams {
  username: string;
}

interface IProps extends RouteComponentProps<RouteParams> {}

const AdminPage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadMembers, loadingMembers} = rootStore.adminStore;

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const panes = [

    { menuItem: "Users", render: () => <Tab.Pane><UsersOverview /></Tab.Pane> },
    { menuItem: "Posts", render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: "Comments", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ];

  if (loadingMembers)
    return <LoadingComponent content={"Loading members..."} />;
  return (
    <Grid>
      <Grid.Column width={16}>
        <Tab menu={{ pointing: true }} panes={panes} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(AdminPage);
