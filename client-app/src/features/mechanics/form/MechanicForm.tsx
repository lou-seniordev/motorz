import { observer } from 'mobx-react-lite';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import { IMechanic } from '../../../app/models/mechanic';
import MechanicStore from '../../../app/stores/mechanicStore';

// interface IProps {
//   // setEditMode: (editMode: boolean) => void;
//   mechanic: IMechanic;
// }
interface DetailParams {
  id: string;
}
const MechanicForm: React.FC<RouteComponentProps<DetailParams>> = ({
  history,
  match
}) => {
  const mechanicStore = useContext(MechanicStore);
  const {
    createMechanic,
    editMechanic,
    submitting,
    editMode,
    cancelFormOpen,
    mechanic: initalFormState,
    loadMechanic,
    clearMechanic
  } = mechanicStore;

  // const initalizeForm = () => {
  //   if (initalFormState) {
  //     return initalFormState;
  //   } else {
  //     return {
  //       id: '',
  //       // author: '', // add author in API
  //       photoUrl: '',
  //       name: '',
  //       description: '',
  //       yearOfStart: '',
  //       datePublished: '',
  //       country: '',
  //       city: '',
  //       address: '',
  //     };
  //   }
  // };

  const [mechanic, setMechanic] = useState<IMechanic>({
    id: '',
    photoUrl: '',
    name: '',
    description: '',
    yearOfStart: '',
    datePublished: '',
    country: '',
    city: '',
    address: '',
  });


  useEffect(()=> {
    if(match.params.id && mechanic.id.length === 0) {
      loadMechanic(match.params.id).then(()=> {
        initalFormState && setMechanic(initalFormState);
      });
    }
    return () => {
      clearMechanic();
    }
  }, [loadMechanic, clearMechanic, match.params.id, initalFormState, mechanic.id.length]);


  const handleSubmit = () => {
    if (mechanic.id.length === 0) {
      let newMechanic = {
        ...mechanic,
        id: uuid(),
        datePublished: new Date().toISOString(),
      };
      createMechanic(newMechanic).then(() => history.push(`/mechanics/${newMechanic.id}`));
    } else {
      editMechanic(mechanic).then(() => history.push(`/mechanics/${mechanic.id}`));
    }
  };

  // input into virtual DOM
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setMechanic({ ...mechanic, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='name'
          placeholder='Name'
          value={mechanic.name}
        />
        <Form.Input
          onChange={handleInputChange}
          name='country'
          placeholder='Country'
          value={mechanic.country}
        />
        <Form.Input
          onChange={handleInputChange}
          name='city'
          placeholder='City'
          value={mechanic.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name='address'
          placeholder='Address'
          value={mechanic.address}
        />
        {!editMode && (
          <Form.Input
            onChange={handleInputChange}
            name='yearOfStart'
            type='datetime-local'
            placeholder='Year of Start'
            value={mechanic.yearOfStart}
          />
        )}
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          raws={3}
          placeholder='Description'
          value={mechanic.description}
        />
        <Button
          loading={submitting}
          positive
          floated='right'
          type='submit'
          content='submit'
        />
        <Button
          onClick={cancelFormOpen}
          floated='right'
          type='button'
          content='cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(MechanicForm);
