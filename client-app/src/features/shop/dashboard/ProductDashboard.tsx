import React, { useContext, useEffect, useState } from "react";
import { Grid, Loader, Sticky } from "semantic-ui-react";
import ProductList from "./ProductList";

// import LoadingComponent from "../../../app/layout/LoadingComponent";

import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ProductFilters from "./ProductFilters";
import InfiniteScroll from "react-infinite-scroller";
import ProductListItemPlaceholder from "./ProductListItemPlaceholder";
import ProductMobileFilters from "./ProductMobileFilters";

const ProductDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadProducts, loadingInitial, setPage, page, totalPages } = rootStore.productStore;


  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadProducts().then(()=> {
      setLoadingNext(false);
    })
  }

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  
  return (
    <Grid>
      <Grid.Column mobile={16} tablet={16} className='mobile only'>
        <ProductMobileFilters />
      </Grid.Column>
      <Grid.Column computer={11} mobile={16} >
     { loadingInitial && page === 0 ? <ProductListItemPlaceholder/> :
     <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && page + 1 < totalPages}
            initialLoad={false}
          >
        <ProductList />
        </InfiniteScroll>}
      </Grid.Column>
      <Grid.Column width={5}>
        <Sticky className="mobile hidden" style={{ marginRight: 30, position: "fixed" }}>
          <ProductFilters />
        </Sticky>
      </Grid.Column>
      <Grid.Column computer={9} mobile={16}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProductDashboard);
