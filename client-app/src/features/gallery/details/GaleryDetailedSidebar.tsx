import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Segment, List, Item, Label, Image } from 'semantic-ui-react';
import { IEmbracer } from '../../../app/models/motofy';

interface IProps {
  embracers: IEmbracer[];
}
const GaleryDetailedSidebar: React.FC<IProps> = ({ embracers }) => {
  // const isOwner = false;
  return (
    <Fragment>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='teal'
      >
        {embracers.length} {embracers.length === 1 ? 'Person' : 'People '}{' '}
        embraced
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {embracers.map((embracer) => (
            <Item key={embracer.username} style={{ position: 'relative' }}>
              {embracer.isOwner && (
                <Label
                  style={{ position: 'absolute' }}
                  color='orange'
                  ribbon='right'
                >
                  Owner
                </Label>
              )}

              <Image size='tiny' src={embracer.image || '/assets/user.png'} />
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`/profile/${embracer.username}`}>
                    {embracer.displayName}
                  </Link>
                </Item.Header>
                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(GaleryDetailedSidebar);
