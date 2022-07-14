import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react"; 
import { useTranslation } from "react-i18next";
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import GalleryChamps from "../modals/GalleryChamps";
import SearchGallery from "../modals/SearchGallery";
import GalleryMobileInfo from "./GalleryMobileInfo";

const GalleryMobileFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate, setInfo, mostEmbraced, highestRatedMotofy } =
    rootStore.motofyStore;

  const { openModal } = rootStore.modalStore;

  const { t } = useTranslation(["mobile-info"]);

  useEffect(() => {
    setInfo(t("All motofies"));
  }, [setInfo, t]);

  const handleOpenChamps = (info: string) => {
    switch (info) {
      case "Most Embraced":
        openModal(<GalleryChamps motofy={mostEmbraced} info={info} />);
        break;
      default:
        openModal(<GalleryChamps motofy={highestRatedMotofy} info={info} />);
        break;
    }
  };

  const handleSearch = () => {
    setPredicate("calendar", "true");
    openModal(<SearchGallery />);
  };

  const handleSetInfo = () => {
    switch (predicate.keys().next().value) {
      case "bestRated":
        setInfo(t("Best rated"));
        break;
      case "mostEmbraced":
        setInfo(t("Most embraced"));
        break;
      case "iEmbraced":
        setInfo(t("Motofies I embraced"));
        break;
      case "iFollow":
        setInfo(t("By people I follow"));
        break;
      case "mostEmbraces":
        setInfo(t("Most Embraces"));
        break;
      case "highestRated":
        setInfo(t("Highest Rated"));
        break;
      case "calendar":
        setInfo(t("Search motofies"));
        break;
      default:
        setInfo(t("All motofies"));
        break;
    }
  };

  return (
    <>
      <Menu fluid widths={8}>
        <Menu.Item
          active={predicate.size === 0}
          onClick={() => {
            setPredicate("all", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"home"}
        />
        <Menu.Item
          active={predicate.has("bestRated")}
          onClick={() => {
            setPredicate("bestRated", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"winner"}
        />
        <Menu.Item
          active={predicate.has("mostEmbraced")}
          onClick={() => {
            setPredicate("mostEmbraced", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"thumbs up outline"}
        />
        <Menu.Item
          active={predicate.has("iEmbraced")}
          onClick={() => {
            setPredicate("iEmbraced", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"heart"}
        />
        <Menu.Item
          active={predicate.has("iFollow")}
          onClick={() => {
            setPredicate("iFollow", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"eye"}
        />
        <Menu.Item
          active={predicate.has("mostEmbraces")}
          icon={"sun"}
          onClick={() => {
            handleOpenChamps("Most Embraces");
            setPredicate("mostEmbraces", "true");
            handleSetInfo();
          }}
        />

        <Menu.Item
          active={predicate.has("highestRated")}
          icon={"moon"}
          onClick={() => {
            handleOpenChamps(t("Highest Rated"));
            setPredicate("highestRated", "true");
            handleSetInfo();
          }}
        />
        <Menu.Item
          active={predicate.has("calendar")}
          onClick={() => {
            handleSearch();
            handleSetInfo();
          }}
          color={"blue"}
          icon={"search"}
        />
      </Menu>
      <GalleryMobileInfo />
    </>
  );
};

export default observer(GalleryMobileFilters);
