import React, { useContext, useEffect, useState } from "react";
import { Grid,  Sticky } from "semantic-ui-react";//Loader,
import GalleryList from "./GalleryList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";
import GalleryFilters from "./GalleryFilters";
import GalleryMobileMenu from "./GalleryMobileMenu";

const GalleryDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadMotofies, loadingInitial, setPage, page, totalPages } =
    rootStore.motofyStore;
  const [loadingNext, setLoadingNext] = useState(false);
  // const [loadingBest, setLoadingBest] = useState(null);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadMotofies().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadMotofies();
  }, [loadMotofies]);
  
  // const handleGetMostEmbraced = () => {
  //   // console.log("mostEmbraced: ", mostEmbraced)
  //   //   console.log(mostEmbraced);

  // }

  if (loadingInitial && page === 0)
    return <LoadingComponent content={"Loading motofies..."} />;

  return (
    <Grid>
      {/* // mobile={16} tablet={8} computer={4} */}
      <Grid.Column mobile={16} tablet={16} className="mobile only" >
      {/* embracers={motofy.embracers} */}
        <GalleryMobileMenu  />
      </Grid.Column>
      <Grid.Column computer={9} mobile={16}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <GalleryList/>
        </InfiniteScroll>
       
      </Grid.Column>
      {/* className="mobile hidden" */}
      {/*  width={2} only='computer' computer={2}*/}
      <Grid.Column className="mobile hidden">
        <Sticky style={{ marginRight: 30, position: "fixed" }}>
        {/* handleGetMostEmbraced={handleGetMostEmbraced} */}
          <GalleryFilters />
        </Sticky>
      </Grid.Column>

      {/* Find what is it!!! */}
        {/* <Loader active={loadingNext}/> */}
      {/* <Grid.Column width={5}>
      </Grid.Column> */}
    </Grid>
  );
};

export default observer(GalleryDashboard);
