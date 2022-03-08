import React, { Fragment, useContext } from "react";
import { Menu, Input, Divider } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import GalleryChamps from "../modals/GalleryChamps";

const GalleryFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate, mostEmbraced, highestRatedMotofy } =
    rootStore.motofyStore;

  const { openModal } = rootStore.modalStore;

  const handleResultSelect = (e: any) => {
    if (e.key === "Enter") {
      setPredicate("search", e.target.value);
      e.target.value = "";
    }
  };
  const handleOpenChamps = (info: string) => {
    switch (info) {
      case 'Most Embraced':
        openModal(<GalleryChamps motofy={mostEmbraced} info={info}/>);
        break;
      default:
        openModal(<GalleryChamps motofy={highestRatedMotofy} info={info}/>);
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
          content={"By people I follow"}
          icon={"users"}
          style={styles}
        />
 
        <Divider horizontal content='champs at the moment' />
        <Menu.Item
          style={styles}
          content='Most Embraced'
          onClick={() => handleOpenChamps('Most Embraced')}
        />

        <Menu.Item
          style={styles}
          content='Highest Rated'
          onClick={() => handleOpenChamps('Highest Rated')}
        />
      </Menu>
    </Fragment>
  );
};

export default observer(GalleryFilters);
