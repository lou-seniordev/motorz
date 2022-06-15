import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import SearchProducts from "../modals/SearchProducts";
import SearchProductsByCategory from "../modals/SearchProductsByCategory";
import SearchProductsByCountry from "../modals/SearchProductsByCountry";
import ProductMobileInfo from "./ProductMobileInfo";

const ProductMobileFilters = () => {
  const rootStore = useContext(RootStoreContext);
  const { predicate, setPredicate, setInfo } = rootStore.productStore;

  const { t } = useTranslation(["mobile-info"]);

  
  useEffect(()=>{
    setInfo(t('All products'))
  },[setInfo])
  const { openModal } = rootStore.modalStore;

  const handleSearch = () => {
    setPredicate("search", "true");
    openModal(<SearchProducts />);
  };
  const handleSearchByCountry = () => {
    setPredicate("country", "true");
    openModal(<SearchProductsByCountry />);
  };
  const handleSearchByCategory = () => {
    setPredicate("category", "true");
    openModal(<SearchProductsByCategory />);
  };

  const handleSetInfo = () => {
    switch (predicate.keys().next().value) {
      case "iView":
        setInfo(t("Favorites"));
        break;
      case "myProducts":
        setInfo(t("My products"));
        break;
      case "iFollow":
        setInfo(t("By people I follow"));
        break;
      case "inActive":
        setInfo(t("My inactive products"));
        break;
      case "search":
        setInfo(t("Search products"));
        break;
      case "category":
        setInfo(t("Search by category"));
        break;
      case "country":
        setInfo(t("Search by country"));
        break;
      default:
        setInfo(t("All products"));
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
          active={predicate.has("iView")}
          onClick={() => {
            setPredicate("iView", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"heart outline"}
        />
        <Menu.Item
          active={predicate.has("myProducts")}
          onClick={() => {
            setPredicate("myProducts", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"user circle"}
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
          active={predicate.has("inActive")}
          onClick={() => {
            setPredicate("inActive", "true");
            handleSetInfo();
          }}
          color={"blue"}
          icon={"hourglass end"}
        />
        <Menu.Item
          active={predicate.has("search")}
          onClick={() => {
            handleSearch();
            handleSetInfo();
          }}
          color={"blue"}
          icon={"search"}
        />
        <Menu.Item
          active={predicate.has("country")}
          onClick={() => {
            handleSearchByCountry();
            handleSetInfo();
          }}
          color={"blue"}
          icon={"globe"}
        />
        <Menu.Item
          active={predicate.has("category")}
          onClick={() => {
            handleSearchByCategory();
            handleSetInfo();
          }}
          color={"blue"}
          icon={"filter"}
        />
      </Menu>
      <ProductMobileInfo />
    </>
  );
};

export default observer(ProductMobileFilters);
