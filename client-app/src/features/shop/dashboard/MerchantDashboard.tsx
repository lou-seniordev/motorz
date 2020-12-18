import React from 'react'
import { Grid } from 'semantic-ui-react'
import MerchantList from './MerchantList'

const MerchantDashboard = () => {
    return (
        <Grid>
        <Grid.Column width={10}>
          <MerchantList/>
        </Grid.Column>
        <Grid.Column width={6}>
          <h2>Merchant Filters Go Here</h2>
        
        </Grid.Column>
      </Grid>
    )
}

export default MerchantDashboard
