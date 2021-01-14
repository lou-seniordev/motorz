import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { IMotofy } from '../../../app/models/motofy';
import { RootStoreContext } from '../../../app/stores/rootStore';

const activityImageStyle = {
  filter: 'brightness(90%)',
};

const activityImageTextStyle = {
  position: 'absolute',
  top: '50%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

interface IProps {
  motofy: IMotofy;
}
const GaleryDetailedHeader: React.FC<IProps> = ({ motofy }) => {
  const rootStore = useContext(RootStoreContext);
  const { embraceMotofy, unembraceMotofy, loading } = rootStore.motofyStore;
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={motofy!.photoUrl || `/assets/placeholder.png`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='large'
                  content={motofy.name}
                  style={{ color: 'white' }}
                />
                <p>Published on {motofy.datePublished}</p>
                <p>
                  By <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {motofy.isOwner ? (
          <Button
            as={Link}
            to={`/manageGallery/${motofy.id}`}
            color='orange'
            floated='right'
          >
            Manage
          </Button>
        ) : motofy.embraced ? (
          <Button loading={loading} onClick={unembraceMotofy}>
            Maybe not...
          </Button>
        ) : (
          <Button loading={loading} onClick={embraceMotofy} color='teal'>
            Embrace
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(GaleryDetailedHeader);
