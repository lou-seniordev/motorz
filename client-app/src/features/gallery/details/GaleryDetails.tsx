import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { IMotofy } from '../../../app/models/motofy';
import MotofyStore from '../../../app/stores/motofyStore';



const GaleryDetails: React.FC = () => {
  const motofyStore = useContext(MotofyStore);
  const {
    selectedMotofy: motofy,
    openEditForm,
    cancelSelectedMotofy,
  } = motofyStore;

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
            onClick={() => openEditForm(motofy!.id)}
            basic
            color='blue'
            content='edit'
          />
          <Button
            onClick={cancelSelectedMotofy}
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
