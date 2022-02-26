import { observer } from "mobx-react-lite";
import React, { Fragment, useContext } from "react";
import { Card, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PeopleListItem from "./PeopleListItem";
// import FeedListItem from "./FeedListItem";

const PeopleList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { people, displayPeople } = rootStore.profileStore;

  {
    /* <Fragment>
{feedByDate.map(([gr, feeds]) => (
  <Fragment key={gr}>
      <Item.Group divided>
        {feeds.map((feed:any) => (
          <FeedListItem feed={feed} key={feed.id} />
        ))}
      </Item.Group>
  </Fragment>
))}
</Fragment> */
  }
  return (
    <Grid>
      <Grid.Column width={16}>
        <Card.Group itemsPerRow={4}>
          {displayPeople.map((member) => (
            <PeopleListItem member={member} key={member.id} />
          ))}
        </Card.Group>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PeopleList);

{
  /* <Grid>
      <Grid.Column width={16}>
        {displayPeople.map(([ind, people]) => (
          <Fragment key={ind}>
            <Card.Group itemsPerRow={4}>
              {people.map((member: any) => (
                <PeopleListItem member={member} key={member.username} />
              ))}
            </Card.Group>
          </Fragment>
        ))}
      </Grid.Column>
    </Grid> */
}
