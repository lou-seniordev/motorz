import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import MechanicStore from '../../../app/stores/mechanicStore';

interface DetailParams {
  id: string
}
const MechanicDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
  const mechanicStore = useContext(MechanicStore);
  const {
    mechanic,
    loadMechanic,
    loadingInitial
  } = mechanicStore;

  useEffect(() => {
    loadMechanic(match.params.id)
  }, [loadMechanic, match.params.id])

  if (loadingInitial || !mechanic) return <LoadingComponent content='Loading mechanic shop...'/>

  return (
    <Card fluid>
      <Image src={mechanic!.photoUrl || 'assets/user.png'} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{mechanic!.name}</Card.Header>
        <Card.Meta>
          <span>Working since {mechanic!.yearOfStart}</span>
        </Card.Meta>
        <Card.Description>{mechanic!.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link} to={`/manageMechanic/${mechanic.id}`}
            basic
            color='blue'
            content='edit'
          />
          <Button
            onClick={()=> history.push('/mechanics')}
            basic
            color='grey'
            content='cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(MechanicDetails);
