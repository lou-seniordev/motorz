// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react"; //, useState
// Input,
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
// import GalleryChamps from "../modals/GalleryChamps";
import SearchGallery from "../modals/SearchGallery";

const GalleryMobileFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    predicate,
    setPredicate,
    // mostEmbraced, highestRatedMotofy
  } = rootStore.motofyStore;

  const { openModal } = rootStore.modalStore;

  // const handleOpenChamps = (info: string) => {
  //   switch (info) {
  //     case 'Most Embraced':
  //       openModal(<GalleryChamps motofy={mostEmbraced} info={info}/>);
  //       break;
  //     default:
  //       openModal(<GalleryChamps motofy={highestRatedMotofy} info={info}/>);
  //       break;
  //   }
  // };

  const handleSearch = () => {
    openModal(<SearchGallery />);
  };

  return (
    <Menu fluid widths={6}>
      <Menu.Item
        active={predicate.size === 0}
        onClick={() => setPredicate("all", "true")}
        color={"blue"}
        icon={"home"}
      />
      <Menu.Item
        active={predicate.has("bestRated")}
        onClick={() => setPredicate("bestRated", "true")}
        color={"blue"}
        icon={"hand spock"}
      />
      <Menu.Item
        active={predicate.has("mostEmbraced")}
        onClick={() => setPredicate("mostEmbraced", "true")}
        color={"blue"}
        icon={"winner"}
      />
      <Menu.Item
        active={predicate.has("iEmbraced")}
        onClick={() => setPredicate("iEmbraced", "true")}
        color={"blue"}
        icon={"heart"}
      />
      <Menu.Item
        active={predicate.has("iFollow")}
        onClick={() => setPredicate("iFollow", "true")}
        color={"blue"}
        icon={"users"}
      />
      <Menu.Item
        onClick={() => handleSearch()}
        color={"blue"}
        icon={"search"}
      />
      {/* <Menu.Item
          // style={styles}
          icon={"sun"}
          // content='Most Embraced'
          onClick={() => handleOpenChamps('Most Embraced')}
          />

        <Menu.Item
          // style={styles}
          icon={"moon"}
          // content='Highest Rated'
          onClick={() => handleOpenChamps('Highest Rated')}
        /> */}
    </Menu>
  );
};

export default observer(GalleryMobileFilters);
