import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { ActivityFormValues } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import { RootStoreContext } from '../../../app/stores/rootStore';
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from 'revalidate';

const validate = combineValidators({
  title: isRequired({ message: 'The title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters',
    })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time'),
});

interface DetailParams {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
    addFeedItem,
  } = rootStore.activityStore;

  const { loadCountriesToSelect, countries } = rootStore.countryStore;
  const [modeForCountry, setModeForCountry] = useState(true);


  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(category)
    loadCountriesToSelect();

    if (match.params.id) {
      setModeForCountry(false);
      setLoading(true);
      loadActivity(match.params.id)
      .then((activity) => setActivity(new ActivityFormValues(activity)))
      .finally(() => setLoading(false));
      // console.log('activity---',activity.category)
    }
  }, [loadActivity, match.params.id, loadCountriesToSelect]);

  const handleFinalFormSubmit = (values: any) => {
    let newId = uuid();
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: newId//uuid(),
      };
      createActivity(newActivity);
      addFeedItem(newId, 'Added Motocycle Diary')
    } else {
      editActivity(activity);
    }
  };

  return (
    <Grid>
      <Grid.Column width={3} />
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name='title'
                  placeholder='Title'
                  value={activity.title}
                  component={TextInput}
                />
                <Field
                  name='description'
                  placeholder='Description'
                  value={activity.description}
                  rows={3}
                  component={TextAreaInput}
                />
                <Field
                  name='category'
                  placeholder='Category'
                  options={category}
                  value={activity.category}
                  component={SelectInput}
                />
                <Form.Group widths='equal'>
                  <Field
                    component={DateInput}
                    name='date'
                    date={true}
                    placeholder='Date'
                    value={activity.date}
                  />
                  <Field
                    component={DateInput}
                    name='time'
                    time={true}
                    placeholder='Time'
                    value={activity.time}
                  />
                </Form.Group>
                {!modeForCountry && (
                    <Field
                      // placeholder={"Country"} // edit form
                      name='countryName'
                      options={countries}
                      // value={product.countryId}
                      component={SelectInput}
                    />
                  )}
                  {modeForCountry && ( //empty form
                    <Field
                      name='countryName'
                      // name='countryId'
                      placeholder={"Country"} //
                      options={countries}
                      // value={product.countryName}
                      component={SelectInput}
                    />
                  )}
                <Field
                  name='city'
                  placeholder='City'
                  value={activity.city}
                  component={TextInput}
                />
                <Field
                  name='venue'
                  placeholder='Venue/Starting Point'
                  value={activity.venue}
                  component={TextInput}
                />
                <Field
                  name='destination'
                  placeholder='Destination'
                  value={activity.destination}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                ></Button>
                <Button
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push('/activities')
                  }
                  disabled={loading}
                  floated='right'
                  type='button'
                  content='Cancel'
                ></Button>
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
      <Grid.Column width={3} />
    </Grid>
  );
};

export default observer(ActivityForm);
