import React, { useContext, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ProductList from './ProductList'

import LoadingComponent from '../../../app/layout/LoadingComponent';

import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';

const ProductDashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const {loadProducts,loadingInitial } = rootStore.productStore;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);
  
    return (
        <Grid>
           <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={14}>
          <ProductList/>
        </Grid.Column>
        <Grid.Column width={1}>        
        </Grid.Column>
      </Grid>
    )
}

export default observer(ProductDashboard)
