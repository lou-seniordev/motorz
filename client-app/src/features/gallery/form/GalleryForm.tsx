import React, { FormEvent, useContext, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IMotofy } from '../../../app/models/motofy';
import { v4 as uuid } from 'uuid';
import MotofyStore from '../../../app/stores/motofyStore';
import { observer } from 'mobx-react-lite';

interface IProps {
  // setEditMode: (editMode: boolean) => void;
  motofy: IMotofy;
  // createMotofy: (motofy: IMotofy) => void;
  // editMotofy: (motofy: IMotofy) => void;
  // testMotofy: (motofy: IMotofy) => void;
}
const GalleryForm: React.FC<IProps> = ({
  // setEditMode,
  motofy: initalFormState,
  // createMotofy,
  // editMotofy,
  // testMotofy
}) => {
  const motofyStore = useContext(MotofyStore);
  const {
    createMotofy,
    editMotofy,
    submitting,
    cancelFormOpen,
    editMode,
  } = motofyStore;

  const initalizeForm = () => {
    if (initalFormState) {
      return initalFormState;
    } else {
      return {
        id: '',
        name: '',
        brand: '',
        model: '',
        cubicCentimeters: '',
        photoUrl: '',
        description: '',
        yearOfProduction: '',
        datePublished: '',
        city: '',
        country: '',
        pricePaid: '',
        estimatedValue: '',
        numberOfKilometers: '',
      };
    }
  };
  const [motofy, setMotofy] = useState<IMotofy>(initalizeForm);

  const handleSubmit = () => {
    if (motofy.id.length === 0) {
      let newMotofy = {
        ...motofy,
        id: uuid(),
        datePublished: new Date().toISOString(),
      };
      createMotofy(newMotofy);
      // console.log('motofy', newMotofy)
      // console.log('type', typeof (newMotofy.pricePaid))
    } else {
      // console.log('motofy', motofy)
      editMotofy(motofy);
    }
  };

  // == this is to enable input ==
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setMotofy({ ...motofy, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChange}
          name='name'
          placeholder='Name'
          value={motofy.name}
        />
        <Form.TextArea
          onChange={handleInputChange}
          name='description'
          raws={3}
          placeholder='Description'
          value={motofy.description}
        />
        <Form.Input
          onChange={handleInputChange}
          name='city'
          placeholder='City'
          value={motofy.city}
        />
        <Form.Input
          onChange={handleInputChange}
          name='country'
          placeholder='Country'
          value={motofy.country}
        />
        {/* <Form.Input
          onChange={handleInputChange}
          name='brand'
          placeholder='Brand'
          value={motofy.brand}
        /> */}
        {!editMode && (
          <Segment>
            <Form.Input
              onChange={handleInputChange}
              name='model'
              placeholder='Model'
              value={motofy.model}
            />
            <Form.Input
              onChange={handleInputChange}
              name='cubicCentimeters'
              // type='number'
              placeholder='Cubics'
              value={motofy.cubicCentimeters}
            />
            <Form.Input
              onChange={handleInputChange}
              name='yearOfProduction'
              // type='datetime-local'
              placeholder='Year of production'
              value={motofy.yearOfProduction}
            />
            <Form.Input
              onChange={handleInputChange}
              name='numberOfKilometers'
              placeholder='Number of kilometers'
              value={motofy.numberOfKilometers}
            />
            <Form.Input
              onChange={handleInputChange}
              name='pricePaid'
              placeholder='Price paid'
              value={motofy.pricePaid}
            />
            <Form.Input
              onChange={handleInputChange}
              name='estimatedValue'
              placeholder='Estimated value'
              value={motofy.estimatedValue}
            />
          </Segment>
        )}

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

export default observer(GalleryForm);
