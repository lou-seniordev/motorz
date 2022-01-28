import React, { Fragment, useContext } from "react";
import { Menu, Header, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import GalleryMostEmbraced from "./GalleryMostEmbraced";
import GalleryHighestRated from "./GalleryHighestRated";

const GalleryFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate, mostEmbraced, highestRatedMotofy } =
    rootStore.motofyStore;
  const motofy = toJS(mostEmbraced);
  const highestMotofy = toJS(highestRatedMotofy);

  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%" }}>
      {/* , marginTop: 50 */}
        <Header icon={"filter"} attached color={"teal"} content={"Filters"} />
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          content={"All motofies"}
        />
        <Menu.Item
          active={predicate.has("all")}
          onClick={() => setPredicate("iOwn", "true")}
          color={"blue"}
          name={"owner"}
          content={"My mofofies"}
        />
        <Menu.Item
          active={predicate.has("winningFive")}
          onClick={() => setPredicate("winningFive", "true")}
          color={"blue"}
          name={"winningFive"}
          content={"Most embraced 3"}
        />
        <Menu.Item
          active={predicate.has("iEmbraced")}
          onClick={() => setPredicate("iEmbraced", "true")}
          color={"blue"}
          name={"username"}
          content={"I embraced"}
        />
        {/* <Menu.Item
          color={"blue"}
          name={"host"}
          content={"My people motofies"}
        />
        <Menu.Item
          color={"blue"}
          name={"host"}
          content={"Oldest to newest viceversa..."}
        /> */}
      </Menu>
      {/* <Header
        icon={"calendar"}
        attached
        color={"teal"}
        content={"Placeholder calendar for champion!!!"}
      /> */}
      {/* <Calendar /> */}
      {/* <GalleryListItem motofy={motofy}/> */}
      <Grid>
        <Grid.Column width={8}>
          <GalleryHighestRated highestRatedMotofy={highestMotofy} />
        </Grid.Column>
        <Grid.Column width={8}>
          <GalleryMostEmbraced motofyEmbraced={motofy} />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(GalleryFilters);
