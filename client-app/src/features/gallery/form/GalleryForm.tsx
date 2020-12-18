import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IMotofy } from '../../../app/models/motofy';
import { v4 as uuid } from 'uuid';
import MotofyStore from '../../../app/stores/motofyStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
  id: string;
}
const GalleryForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const motofyStore = useContext(MotofyStore);
  const {
    createMotofy,
    editMotofy,
    submitting,
    editMode,
    motofy: initalFormState,
    loadMotofy,
    clearMotofy
  } = motofyStore;

  const [motofy, setMotofy] = useState<IMotofy>({
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
  });

  useEffect(() => {
    if (match.params.id && motofy.id.length === 0) {
      loadMotofy(match.params.id).then(
        () => initalFormState && setMotofy(initalFormState)
        );
    }
    return () => {
      clearMotofy();
    }
  }, [loadMotofy, match.params.id, clearMotofy, initalFormState, motofy.id.length]);

  const handleSubmit = () => {
    if (motofy.id.length === 0) {
      let newMotofy = {
        ...motofy,
        id: uuid(),
        datePublished: new Date().toISOString(),
      };
      createMotofy(newMotofy).then(() => history.push(`/gallery/${newMotofy.id}`));
    } else {
      editMotofy(motofy).then(() => history.push(`/gallery/${motofy.id}`));
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
          onClick={()=> history.push('/gallery')}
          floated='right'
          type='button'
          content='cancel'
        />
      </Form>
    </Segment>
  );
};

export default observer(GalleryForm);
