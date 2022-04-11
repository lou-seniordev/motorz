import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Sticky,
  Image,
  Label,
} from "semantic-ui-react";
import { v4 as uuid } from "uuid";

import { MechanicFromValues } from "../../../app/models/mechanic";

import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";

import { year } from "../../../app/common/options/yearOptions";

import SelectInput from "../../../app/common/form/SelectInput";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
  isNumeric,
  createValidator,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

import { toast } from "react-toastify";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";
import LoadingComponent from "../../../app/layout/LoadingComponent";

import { motoOptions } from "../../../app/common/options/motoOptions";
import SelectMultiple from "../../../app/common/form/SelectMultiple";
import { useTranslation } from "react-i18next";

const isValidEmail = createValidator(
  (message) => (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message;
    }
  },
  "Invalid email address"
);
const validate = combineValidators({
  name: isRequired({ message: "The name is required" }),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  // photoUrl: isRequired("Photo"),
  countryName: isRequired("countryName"),
  city: isRequired("City"),
  address: isRequired("address"),
  phone: composeValidators(
    isNumeric("Phone"),
    isRequired("Phone"),
    hasLengthGreaterThan(4)({
      message: "Phone needs to be at least 5 characters",
    })
  )(),
  email: isValidEmail(),
  yearOfStart: isRequired("Year Of Start"),
  brands: isRequired("Brands"),
});
const ownerOptions = [
  { key: "Owner", text: "Owner", value: "Owner" },
  { key: "Customer", text: "Customer", value: "Customer" },
];
interface DetailParams {
  id: string;
}
const MechanicForm: React.FC<RouteComponentProps<DetailParams>> = ({
  history,
  match,
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    createMechanic,
    editMechanic,
    submitting,
    loadMechanic,
  } = rootStore.mechanicStore;

  const random = Math.floor(Math.random() * motoOptions.length);

  const motomoto = motoOptions[random];

  const { t } = useTranslation(["forms"]);


  const { user } = rootStore.userStore;
  const { addFeedItem } = rootStore.feedStore;
  const { loadCountriesToSelect, countries } = rootStore.countryStore;

  const { loadBrandsToSelect, brands } = rootStore.brandStore;

  const [mechanic, setMechanic] = useState(new MechanicFromValues());
  const [loading, setLoading] = useState(false);

  const [uploaded, setUploaded] = useState(false);

  const [edited, setEdited] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [ready, setReady] = useState(false);

  const [imageToUpload, setImageToUpload] = useState(null);

  let image: any;
  const [previewImage, setPreviewImage] = useState();

  useEffect(() => {
    loadCountriesToSelect();
    loadBrandsToSelect();

    if (match.params.id) {
      setEditMode(true);

      setLoading(true);
      setUploaded(true);
      setEdited(true);

      loadMechanic(match.params.id) 
        .then((mechanic) => {
          setMechanic(new MechanicFromValues(mechanic));
        })
        .finally(() => setLoading(false));
    }
    setReady(true);
  }, [
    loadCountriesToSelect,
    loadMechanic,
    match.params.id,
    loadBrandsToSelect,
  ]);

  const handleFinalFormSubmit = (values: any) => {
    let newId = uuid();
    const { ...mechanic } = values;
    let owner: boolean = values.owner === "Owner" ? true : false;
    let customer = {
      username: user?.userName,
      displayName: user?.displayName,
      image: user?.image,
      isOwner: owner,
      isCustomer: !owner,
      customerRecommended: !owner,
      testimonial: values.description,
    };
    if (!mechanic.id) {
      let newMechanic = {
        ...mechanic,
        id: newId,
        datePublished: new Date().toISOString(),
        file: imageToUpload,
        photoUrl: previewImage,
        publisherUsername: user?.userName,
        customers: [customer],
      };
      createMechanic(newMechanic);
      addFeedItem(newId, "Added Mechanic");
    } else {
      editMechanic(mechanic);
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
      {uploaded && (
        <Grid.Column 
        // width={10}
        computer={10} mobile={16}
        >
          <Segment clearing>
            <FinalForm
              validate={validate}
              initialValues={mechanic}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                  {editMode && <Label content={t('Name')} />}

                  <Field
                    placeholder={t('Name')}
                    name='name'
                    value={mechanic.name}
                    component={TextInput}
                  />

                  {!editMode && (
                    <Field
                      name='owner'
                      placeholder={t('Are you owner or customer of this shop?')}
                      options={ownerOptions}
                      value={mechanic.owner}
                      component={SelectInput}
                    />
                  )}
                  {!editMode && (
                    <Field
                      name='brands'
                      placeholder={t("What brands are you specialized in *")}
                      options={brands}
                      multiple
                      component={SelectMultiple}
                    />
                  )}

                  {!editMode && (
                    <Field
                      name='countryName'
                      placeholder={t("Country")} //
                      options={countries}
                      component={SelectInput}
                    />
                  )}

                  {!editMode && (
                    <Field
                      name='city'
                      placeholder={t('City')}
                      value={mechanic.city}
                      component={TextInput}
                    />
                  )}
                  {editMode && <Label content={t('Address *')} />}

                  <Field
                    placeholder={t('Address *')}
                    name='address'
                    value={mechanic.address}
                    component={TextInput}
                  />
                  {editMode && <Label content={t('Phone *')} />}

                  <Field
                    placeholder={t('Phone *')}
                    name='phone'
                    value={mechanic.phone}
                    component={TextInput}
                  />
                  {editMode && <Label content='Email' />}

                  <Field
                    placeholder={t('Email')}
                    name='email'
                    value={mechanic.email}
                    component={TextInput}
                  />
                  {editMode && <Label content={t('Website')} />}

                  <Field
                    placeholder={t('Website')}
                    name='website'
                    value={mechanic.website}
                    component={TextInput}
                  />
                  {!editMode && (
                    <Field
                      name='yearOfStart'
                      placeholder={t('Year of Start *')}
                      value={mechanic.yearOfStart}
                      options={year}
                      component={SelectInput}
                    />
                  )}
                  {editMode && <Label content={t('Description')} />}

                  <Field
                    name='description'
                    raws={3}
                    placeholder={t('Description')}
                    value={mechanic.description}
                    component={TextAreaInput}
                  />
                  <Button
                    loading={submitting}
                    disabled={loading || invalid || pristine}
                    positive
                    floated='right'
                    type='submit'
                    content={toast('Submit')}
                  />
                  <Button
                    onClick={
                      mechanic.id
                        ? () => history.push(`/mechanics/${mechanic.id}`)
                        : () => history.push("/mechanicForm")
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
              <Header as='h2'>{mechanic.name}</Header>
              <Image size='large' bordered src={mechanic.photoUrl} />
            </Segment>
          </Sticky>
        </Grid.Column>
      )}
    </Grid>
  );
};

export default observer(MechanicForm);
