import React, { Fragment, useContext } from "react";
import { Menu,  Grid, Input } from "semantic-ui-react";
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

  const handleResultSelect = (e: any) => {
    if(e.key === 'Enter') {
      setPredicate( 'search', e.target.value)   
      e.target.value = '';
  }
}
  
  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%" }}>
        <Menu.Item active={predicate.has("search")}>
          <Input
            icon='search'
            placeholder='Search...'
            onKeyDown={(e: any) => handleResultSelect(e)}
          />
        </Menu.Item>
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          icon={'globe'}
          content={"All motofies"}
        />
        <Menu.Item
          active={predicate.has("bestRated")}
          onClick={() => setPredicate("bestRated", "true")}
          color={"blue"}
          name={"bestRated"}
          icon={'hand spock'}
          content={"Highest Rated"}
        />
        <Menu.Item
          active={predicate.has("mostEmbraced")}
          onClick={() => setPredicate("mostEmbraced", "true")}
          color={"blue"}
          name={"mostEmbraced"}
          icon={'winner'}
          content={"Most Embraced"}
          />
        <Menu.Item
          active={predicate.has("iEmbraced")}
          onClick={() => setPredicate("iEmbraced", "true")}
          color={"blue"}
          name={"username"}
          icon={'heart'}
          content={"I Embraced"}
        />
      </Menu>
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
