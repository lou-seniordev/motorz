import { observer } from "mobx-react-lite";
import React, {  useContext } from "react";
import { Card, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PeopleListItem from "./PeopleListItem";

const PeopleList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { displayPeople } = rootStore.profileStore;

  return (
    <Grid>
      <Grid.Column width={16}>
        <Card.Group itemsPerRow={4} stackable={true} doubling={true}>
          {displayPeople.map((member) => (
            <PeopleListItem member={member} key={member.id} />
          ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PeopleList);

