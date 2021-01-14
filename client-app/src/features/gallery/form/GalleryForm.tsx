import React, {  useContext, useEffect, useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import {  MotofyFormValues } from '../../../app/models/motofy';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';

import { brand } from '../../../app/common/options/brandOptions';
import { year } from '../../../app/common/options/yearOptions';
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
  isNumeric,
} from 'revalidate';
import { RootStoreContext } from '../../../app/stores/rootStore';

const validate = combineValidators({
  name: isRequired({ message: 'The event name is required' }),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters',
    })
  )(),
  photoUrl: isRequired('Photo'),
  city: isRequired('City'),
  country: isRequired('Country'),
  model: isRequired('model'),
  pricePaid: composeValidators(
    isNumeric('Price paid'),
    isRequired('Price paid')
  )(),
  cubicCentimeters: composeValidators(
    isNumeric('Power of engine'),
    isRequired('Power of engine')
  )(),
  yearOfProduction: isRequired('Year of production'),
  numberOfKilometers: composeValidators(
    isNumeric('Number of kilometers'),
    isRequired('Number of kilometers')
  )(),
  estimatedValue: composeValidators(
    isNumeric('Estimated valude'),
    isRequired('Estimated valude')
  )(),
});

interface DetailParams {
  id: string;
}
const GalleryForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    createMotofy,
    editMotofy,
    submitting,
    editMode,
    loadMotofy,
  } = rootStore.motofyStore;

  const [motofy, setMotofy] = useState(new MotofyFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadMotofy(match.params.id)
        .then((motofy) => setMotofy(new MotofyFormValues(motofy)))
        .finally(() => setLoading(false));
    }
  }, [loadMotofy, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...motofy } = values;

    if (!motofy.id) {
      let newMotofy = {
        ...motofy,
        id: uuid(),
        datePublished: new Date().toISOString(),
      };
      // console.log(newMotofy);
      createMotofy(newMotofy);
    } else {
      editMotofy(motofy);
    }
  };
  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={motofy}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  // onChange={handleInputChange}
                  name='name'
                  placeholder='Name'
                  value={motofy.name}
                  component={TextInput}
                />
                <Field
                  name='description'
                  raws={3}
                  placeholder='Description'
                  value={motofy.description}
                  component={TextAreaInput}
                />
                <Field
                  name='photoUrl'
                  placeholder='PhotoUrl'
                  value={motofy.photoUrl}
                  component={TextInput}
                />
                <Field
                  name='city'
                  placeholder='City'
                  value={motofy.city}
                  component={TextInput}
                />
                <Field
                  name='country'
                  placeholder='Country'
                  value={motofy.country}
                  component={TextInput}
                />
                <Field
                  name='brand'
                  placeholder='Brand'
                  options={brand}
                  value={motofy.brand}
                  component={SelectInput}
                />
                {!editMode && (
                  <Segment>
                    <Field
                      name='model'
                      placeholder='Model'
                      value={motofy.model}
                      component={TextInput}
                    />
                    <Field
                      name='cubicCentimeters'
                      placeholder='Cubics'
                      value={motofy.cubicCentimeters}
                      component={TextInput}
                    />
                    <Field
                      name='yearOfProduction'
                      placeholder='Year of production'
                      options={year}
                      value={motofy.yearOfProduction}
                      component={SelectInput}
                    />
                    <Field
                      name='numberOfKilometers'
                      placeholder='Number of kilometers'
                      value={motofy.numberOfKilometers}
                      component={TextInput}
                    />
                    <Field
                      name='pricePaid'
                      placeholder='Price paid'
                      value={motofy.pricePaid}
                      component={TextInput}
                    />
                    <Field
                      name='estimatedValue'
                      placeholder='Estimated value'
                      value={motofy.estimatedValue}
                      component={TextInput}
                    />
                  </Segment>
                )}

                <Button
                  loading={submitting}
                  disabled={loading|| invalid || pristine}
                  positive
                  floated='right'
                  type='submit'
                  content='submit'
                />
                <Button
                  onClick={
                    motofy.id
                      ? () => history.push(`/gallery/${motofy.id}`)
                      : () => history.push('/gallery')
                  }
                  disabled={loading}
                  floated='right'
                  type='button'
                  content='cancel'
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(GalleryForm);
