// import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react"; //, useState
// Input,
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
// import GalleryChamps from "../modals/GalleryChamps";
import SearchGallery from "../modals/SearchGallery";
import GalleryMobileInfo from "./GalleryMobileInfo";

const GalleryMobileFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    predicate,
    setPredicate,
    setInfo
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
    setPredicate("calendar", "true");
    openModal(<SearchGallery />);
  };

  const handleSetInfo = () => {
    switch (predicate.keys().next().value) {
      case 'bestRated':
       setInfo ('Best rated')
        break;
      case 'mostEmbraced':
       setInfo ('Most embraced')
        break;
      case 'iEmbraced':
       setInfo ('Motofies I embraced')
        break;
      case 'iFollow':
       setInfo ('By people I follow')
        break;
      case 'calendar':
       setInfo ('Search motofies')
        break;
      default:
       setInfo ('All motofies')
        break;
    }
  }

  return (
    <>
    <Menu fluid widths={6}>
      <Menu.Item
        active={predicate.size === 0}
        onClick={() => {setPredicate("all", "true"); handleSetInfo()}}
        color={"blue"}
        icon={"home"}
      />
      <Menu.Item
        active={predicate.has("bestRated")}
        onClick={() => {setPredicate("bestRated", "true"); handleSetInfo()}}
        color={"blue"}
        icon={"winner"}
      />
      <Menu.Item
        active={predicate.has("mostEmbraced")}
        onClick={() => {setPredicate("mostEmbraced", "true"); handleSetInfo()}}
        color={"blue"}
        icon={"thumbs up outline"}
      />
      <Menu.Item
        active={predicate.has("iEmbraced")}
        onClick={() => {setPredicate("iEmbraced", "true"); handleSetInfo()}}
        color={"blue"}
        icon={"heart"}
      />
      <Menu.Item
        active={predicate.has("iFollow")}
        onClick={() => {setPredicate("iFollow", "true"); handleSetInfo()}}
        color={"blue"}
        icon={"eye"}
      />
      <Menu.Item
        active={predicate.has("calendar")}
        onClick={() => {handleSearch(); handleSetInfo()}}
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
    <GalleryMobileInfo/>
    </>
  );
};

export default observer(GalleryMobileFilters);
