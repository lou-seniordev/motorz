import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Grid, Header, Label, Segment, Sticky, Image } from 'semantic-ui-react';
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
import { useTranslation } from "react-i18next";
import PhotoUploadWidget from '../../../app/common/photoUpload/PhotoUploadWidget';
import { toast } from 'react-toastify';



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
  } = rootStore.activityStore;

  const { addFeedItem } = rootStore.feedStore;
  const { loadCountriesToSelect, countries } = rootStore.countryStore;

  const {loadBrandsToSelect, brands } = rootStore.brandStore;
  const [editMode, setEditMode] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [imageToUpload, setImageToUpload] = useState(null);

  let image: any;
  const [previewImage, setPreviewImage] = useState();

  const [activity, setActivity] = useState(new ActivityFormValues());
  const [loading, setLoading] = useState(false);

  // const [edited, setEdited] = useState(false);


  const { t } = useTranslation(["forms"]);
  const validate = combineValidators({
    title: isRequired({ message: t("Title is required") }),
    category: isRequired({ message: t("Category is required") }),
    description: composeValidators(
      isRequired({ message: t("Description is required") }),
      hasLengthGreaterThan(4)({
        message: t("Description needs to be at least 5 characters"),
      })
    )(),
    countryName: isRequired({ message: t("Country is required") }),
    city: isRequired( { message: t("City is required") }),
    departure: isRequired( { message: t("Place of departure is required")}),
    destination: isRequired( { message: t("Place of destination is required")}),
    date: isRequired({ message: t("Date is required") }),
    time: isRequired( { message: t("Time is required") }),
  });

  useEffect(() => {
    loadBrandsToSelect();

    loadCountriesToSelect();

    if (match.params.id) {
      setEditMode(true);
      setLoading(true);
      // setEdited(true);
      loadActivity(match.params.id)
      .then((activity) => setActivity(new ActivityFormValues(activity)))
      .finally(() => setLoading(false));
    }
  }, [loadBrandsToSelect, loadActivity, match.params.id, loadCountriesToSelect]);

  const handleFinalFormSubmit = (values: any) => {
    let newId = uuid();
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...activity } = values;
    activity.date = dateAndTime;
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: newId,
        isHost: true,
        isActive: true,
        file: imageToUpload,
        diaryEntries: []
      };
      createActivity(newActivity);
      addFeedItem(newId, 'Added Motocycle Diary')
    } else {
      editActivity(activity);
    }
  };

  const setPreview = (imageToSet: any) => {
    Object.assign(image, {
      preview: URL.createObjectURL(imageToSet),
    });
    setPreviewImage(image.preview);
  };

  const handleUploadImage = (photo: any) => {
    setImageToUpload(photo);
    image = photo;
    setPreview(photo);
    setUploaded(true);
    toast.info(t("Your image is uploaded, please give us more details"));
  };

  return (
    <Grid>
      {/* <Grid.Column width={3} /> */}
      {!uploaded && !editMode && (
        <Grid.Column width={16}>
          <Segment>
            <PhotoUploadWidget
              uploadPhoto={handleUploadImage}
              loading={uploaded}
            />
          </Segment>
        </Grid.Column>
      )}
      {uploaded && (

      <Grid.Column 
      computer={10} mobile={16}
      >
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={activity}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                {editMode && <Label content={t('Title')}/>}
                <Field
                  name='title'
                  placeholder={t('Title')}
                  value={activity.title}
                  component={TextInput}
                />

                  {!editMode && (
                    <Field
                      name='motorcycleBrandName'
                      placeholder={t("Your motorcycyle brand")} 
                      options={brands}
                      component={SelectInput}
                    />
                  )} 
                  {editMode && <Label content={t('Description')}/>}
                <Field
                  placeholder={t('Description')}
                  name='description'
                  value={activity.description}
                  rows={3}
                  component={TextAreaInput}
                />
                {editMode && <Label content={t('Category')}/>}
                <Field
                  placeholder={t('Category')}
                  name='category'
                  options={category}
                  value={activity.category}
                  component={SelectInput}
                />{editMode && <Label content={t('Date and Time')}/>}
                <Form.Group widths='equal'>
                  <Field
                    placeholder={t('Starting date')}
                    component={DateInput}
                    name='date'
                    date={true}
                    value={activity.date}
                  />
                  <Field
                    component={DateInput}
                    name='time'
                    time={true}
                    placeholder={t('Starting time')}
                    value={activity.time}
                  />
                </Form.Group>

                  {editMode && <Label content={t('Country')}/>}
                    <Field
                      placeholder={t('Country')}
                      name='countryName'
                      options={countries}
                      component={SelectInput}
                    />
                {editMode && <Label content={t('City')}/>}
                <Field
                  placeholder={t('City')}
                  name='city'
                  value={activity.city}
                  component={TextInput}
                />
                {editMode && <Label content={t('Departure/Starting Point')}/>}
                <Field
                  name='departure'
                  placeholder={t('Departure/Starting Point')}
                  value={activity.departure}
                  component={TextInput}
                />
                {editMode && <Label content={t('Destination')}/>}
                <Field
                  placeholder={t('Destination')}
                  name='destination'
                  value={activity.destination}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated='right'
                  positive
                  type='submit'
                  content={t('Submit')}
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
                  content={t('Cancel')}
                ></Button>
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
      )}
      {/* <Grid.Column width={3} /> */}
      {uploaded && !editMode && (
        <Grid.Column width={6}>
          <Sticky style={{ marginRight: 30, position: "fixed" }}>
            <Segment>
              {/* <Header as='h2'>{motomoto}</Header> */}
              <Image size='large' bordered src={previewImage} />
            </Segment>
          </Sticky>
        </Grid.Column>
      )}
      {uploaded && editMode && (
        <Grid.Column width={6}>
          <Sticky style={{ marginRight: 30, position: "fixed" }}>
            <Segment>
              <Header as='h2'>{activity.title}</Header>
              <Image size='large' bordered src={activity.photoUrl} />
            </Segment>
          </Sticky>
        </Grid.Column>
      )}
    </Grid>
  );
};

export default observer(ActivityForm);
