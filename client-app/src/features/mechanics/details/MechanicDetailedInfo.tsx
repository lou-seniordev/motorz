import { observer } from 'mobx-react-lite'
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { IMechanic } from '../../../app/models/mechanic'

const MechanicDetailedInfo: React.FC<{mechanic: IMechanic}> = ({mechanic}) => {
    return (
        <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{mechanic.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              Since {mechanic.yearOfStart}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='address card' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{mechanic.city}, {mechanic.country}, {mechanic.address}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='tty' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{'phone number email address placeholder'}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar check outline' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>Published on {mechanic.datePublished}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>

    )
}

export default observer(MechanicDetailedInfo)
