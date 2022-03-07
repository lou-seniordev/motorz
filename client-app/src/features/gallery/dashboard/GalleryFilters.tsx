import React, { Fragment, useContext } from "react";
import { Menu, Grid, Input, Divider } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import GalleryChamps from "../modals/GalleryChamps";
// import GalleryHighestRated from "../modals/GalleryHighestRated";

const GalleryFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate, mostEmbraced, highestRatedMotofy } =
    rootStore.motofyStore;

  const { openModal } = rootStore.modalStore;

  // const motofy = toJS(mostEmbraced);
  // const highestMotofy = toJS(highestRatedMotofy);

  const handleResultSelect = (e: any) => {
    if (e.key === "Enter") {
      setPredicate("search", e.target.value);
      e.target.value = "";
    }
  };
  const handleOpenChamps = (info: string) => {
    switch (info) {
      case 'Most Embraced':
        openModal(<GalleryChamps champ={mostEmbraced} info={info}/>);
        break;
      default:
        openModal(<GalleryChamps champ={highestRatedMotofy} info={info}/>);
        break;
    }
  };

  const styles = {
    textAlign: "center",
    cursor: "pointer",
  };

  return (
    <Fragment>
      <Menu vertical size={"large"} style={{ width: "100%" }}>
        <Menu.Item active={predicate.has("search")}>
          <Input
            icon='search'
            placeholder='Search all...'
            onKeyDown={(e: any) => handleResultSelect(e)}
          />
        </Menu.Item>
        <Divider horizontal content='or chose built in filters' />

        <Menu.Item
          active={predicate.size === 0}
          onClick={() => setPredicate("all", "true")}
          color={"blue"}
          name={"all"}
          icon={"globe"}
          content={"All motofies"}
          style={styles}
        />
        <Menu.Item
          active={predicate.has("bestRated")}
          onClick={() => setPredicate("bestRated", "true")}
          color={"blue"}
          name={"bestRated"}
          icon={"hand spock"}
          content={"Best Rated"}
          style={styles}
        />
        <Menu.Item
          active={predicate.has("mostEmbraced")}
          onClick={() => setPredicate("mostEmbraced", "true")}
          color={"blue"}
          name={"mostEmbraced"}
          icon={"winner"}
          content={"Most Embraced"}
          style={styles}
        />
        <Menu.Item
          active={predicate.has("iEmbraced")}
          onClick={() => setPredicate("iEmbraced", "true")}
          color={"blue"}
          name={"username"}
          icon={"heart"}
          content={"I Embraced"}
          style={styles}
        />
        <Menu.Item
          active={predicate.has("iFollow")}
          onClick={() => setPredicate("iFollow", "true")}
          color={"blue"}
          name={"country"}
          content={"From people I follow"}
          icon={"users"}
          style={styles}
        />
        {/* </Menu>
      <Menu> */}
        <Divider horizontal content='champs at the moment' />
        <Menu.Item
          // as='h3'
          style={styles}
          content='Most Embraced'
          onClick={() => handleOpenChamps('Most Embraced')}
        />

        <Menu.Item
          // as='h3'
          style={styles}
          content='Highest Rated'
          // onClick={handleOpenModalHighestRatedMotofy}
          onClick={() => handleOpenChamps('Highest Rated')}
        />
      </Menu>
    </Fragment>
  );
};

export default observer(GalleryFilters);
