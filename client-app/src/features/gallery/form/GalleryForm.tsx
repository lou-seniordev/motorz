import React, { useContext, useEffect, useState } from "react"; 
import {
  Button,
  Form,
  Grid,
  Segment,
  Image,
  Sticky,
  Header,
  Label,
} from "semantic-ui-react";
import { MotofyFormValues } from "../../../app/models/motofy";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";

import { year } from "../../../app/common/options/yearOptions";
import { motoOptions } from "../../../app/common/options/motoOptions";


import { toast } from "react-toastify";

import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
  isNumeric,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import { useTranslation } from "react-i18next";


const validate = combineValidators({
  name: isRequired({ message: "The event name is required" }),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  city: isRequired("City"),
  countryName: isRequired("countryName"),
  model: isRequired("model"),
  pricePaid: composeValidators(
    isNumeric("Price paid"),
    isRequired("Price paid")
  )(),
  cubicCentimeters: composeValidators(
    isNumeric("Power of engine"),
    isRequired("Power of engine")
  )(),
  yearOfProduction: isRequired("Year of production"),
  numberOfKilometers: composeValidators(
    isNumeric("Number of kilometers"),
    isRequired("Number of kilometers")
  )(),
  estimatedValue: composeValidators(
    isNumeric("Estimated valude"),
    isRequired("Estimated valude")
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
    loadMotofy,
  } = rootStore.motofyStore;

  const random = Math.floor(Math.random() * motoOptions.length);
  const motomoto = motoOptions[random];

  const { loadBrandsToSelect, brands } = rootStore.brandStore;
  const { loadCountriesToSelect, countries } = rootStore.countryStore;
  const { addFeedItem } = rootStore.feedStore;

  const { t } = useTranslation(["gallery"]);


  const [motofy, setMotofy] = useState(new MotofyFormValues());
  const [loading, setLoading] = useState(false);

  const [editMode, setEditMode] = useState(false);


  const [uploaded, setUploaded] = useState(false);

  const [edited, setEdited] = useState(false);
  const [ready, setReady] = useState(false);

  const [imageToUpload, setImageToUpload] = useState(null);

  let image: any;
  const [previewImage, setPreviewImage] = useState();

  //==proposal for AA001 bug==
  useEffect(() => {
    return () => {
      history.goForward();
    };
  }, [history]);

  useEffect(() => {
    loadBrandsToSelect();
    loadCountriesToSelect();
    if (match.params.id) {
      setEditMode(true);

      setUploaded(true);
      setLoading(true);
      setEdited(true);
      loadMotofy(match.params.id)
        .then((motofy) => setMotofy(new MotofyFormValues(motofy)))
        .finally(() => setLoading(false));
    }
    setReady(true);
  }, [loadBrandsToSelect, loadCountriesToSelect, loadMotofy, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...motofy } = values;
    let newId = uuid();
    if (!motofy.id) {
      let newMotofy = {
        ...motofy,
        id: newId,
        datePublished: new Date().toISOString(),
        file: imageToUpload,
        photoUrl: previewImage,
        isOwner: true,
        motofyScores: [],
      };

      createMotofy(newMotofy); 
      addFeedItem(newId, "Added Motofy");
    } else {
      editMotofy(motofy);
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
  
  if (!ready) return <LoadingComponent content={t('Loading values...')} />;

  return (
    <Grid>
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
      {uploaded &&  (
        <Grid.Column computer={10} mobile={16}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              initialValues={motofy}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                 {editMode && <Label content={t('Motorcycle name')}/>}
                  <Field
                    name='name'
                    placeholder={t('Motorcycle name')}
                    value={motofy.name}
                    component={TextInput}
                  />
                    {editMode && <Label content={t('Description')}/>}
                  <Field
                    placeholder={t('Description')}
                    name='description'
                    rows={3}
                    value={motofy.description}
                    component={TextAreaInput}
                  />
                    {editMode && <Label content={t('City')}/>}
                  <Field
                    placeholder='City'
                    name='city'
                    value={motofy.city}
                    component={TextInput}
                  />
                  {editMode && <Label content={t("Country")}/>}
                  <Field
                    placeholder={t("Country")}
                    name='countryName'
                    options={countries}
                    component={SelectInput}
                  />
                  {!editMode && (
                    <>
                      <Field
                        name='brandName'
                        placeholder={t("Brand")} //
                        options={brands}
                        component={SelectInput}
                      />

                      <Field
                        name='model'
                        placeholder={t('Model')}
                        value={motofy.model}
                        component={TextInput}
                      />
                      <Field
                        name='cubicCentimeters'
                        placeholder={t('Cubics')}
                        value={motofy.cubicCentimeters}
                        component={TextInput}
                      />
                      <Field
                        name='yearOfProduction'
                        placeholder={t('Year of production')}
                        options={year}
                        value={motofy.yearOfProduction}
                        component={SelectInput}
                      />
                    </>
                  )}
                    {editMode && <Label content={t('Number of kilometers')}/>}
                  <Field
                    placeholder={t('Number of kilometers')}
                    name='numberOfKilometers'
                    value={motofy.numberOfKilometers}
                    component={TextInput}
                  />
                    {editMode && <Label content={t('Price paid')}/>}
                  <Field
                    placeholder={t('Price paid')}
                    name='pricePaid'
                    value={motofy.pricePaid}
                    component={TextInput}
                  />
                    {editMode && <Label content={t('Estimated value')}/>}
                  <Field
                    placeholder={t('Estimated value')}
                    name='estimatedValue'
                    value={motofy.estimatedValue}
                    component={TextInput}
                  />
                  {edited && (
                    <Button
                      loading={submitting}
                      disabled={loading || invalid}
                      positive
                      floated='right'
                      type='submit'
                      content={t('Submit')}
                    />
                  )}
                  {!edited && (
                    <Button
                      loading={submitting}
                      disabled={loading || invalid || pristine}
                      positive
                      floated='right'
                      type='submit'
                      content={t('Submit')}
                    />
                  )}
                  <Button
                    onClick={
                      motofy.id
                        ? () => history.push(`/gallery/${motofy.id}`)
                        : () => history.push("/galleryForm")
                    }
                    disabled={loading}
                    floated='right'
                    type='button'
                    content={t('Cancel')}
                  />
                </Form>
              )}
            />
          </Segment>
        </Grid.Column>
      )}
      {uploaded && !edited && (
        <Grid.Column width={6}>
          <Sticky style={{ marginRight: 30, position: "fixed" }}>
            <Segment>
              <Header as='h2'>{motomoto}</Header>
              <Image size='large' bordered src={previewImage} />
            </Segment>
          </Sticky>
        </Grid.Column>
      )}
      {uploaded && edited && (
        <Grid.Column width={6}>
          <Sticky style={{ marginRight: 30, position: "fixed" }}>
            <Segment>
              <Header as='h2'>{motofy.name}</Header>
              <Image size='large' bordered src={motofy.photoUrl} />
            </Segment>
          </Sticky>
        </Grid.Column>
      )}
    </Grid>
  );
};

export default observer(GalleryForm);
