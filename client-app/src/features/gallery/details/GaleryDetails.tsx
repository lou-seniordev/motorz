import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MotofyStore from '../../../app/stores/motofyStore';

interface DetailParams {
  id: string
}
const GaleryDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
  const motofyStore = useContext(MotofyStore);
  const {
    motofy,
    loadMotofy,
    loadingInitial
  } = motofyStore;

  useEffect(() => {
    loadMotofy(match.params.id);
  },[loadMotofy, match.params.id])

  if (loadingInitial || !motofy) return <LoadingComponent content='Loading motofies...'/>

  // return <h1>This be motofy details</h1>
  return (
    <Card fluid>
      <Image src={`/assets/placeholder.png`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{motofy!.name}</Card.Header>
        <Card.Meta>
          <span>{motofy!.datePublished}</span>
        </Card.Meta>
        <Card.Description>{motofy!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            // onClick={() => openEditForm(motofy!.id)}
            as={Link} to={`/manageGallery/${motofy.id }`}
            basic
            color='blue'
            content='edit'
          />
          <Button
            onClick={() => history.push('/gallery')}
            basic
            color='grey'
            content='cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(GaleryDetails);
