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
      message: "Description needs to be at least 5 characters",
    })
  )(),
  email: isValidEmail(),
  yearOfStart: isRequired("Year Of Start"),
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
    // editMode,
    // mechanic: initalFormState,
    loadMechanic,
  } = rootStore.mechanicStore;

   const random = Math.floor(Math.random() * motoOptions.length);

  const motomoto = motoOptions[random];

  const { user } = rootStore.userStore;
  const { addFeedItem } = rootStore.feedStore;
  const { loadCountriesToSelect, countries } = rootStore.countryStore;

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

    if (match.params.id) {
      setEditMode(true);

      setLoading(true);
      setUploaded(true);
      setEdited(true);

      loadMechanic(match.params.id) //, 'PLACEHOLDER!!!'
        .then((mechanic) => {
          setMechanic(new MechanicFromValues(mechanic));
        })
        .finally(() => setLoading(false));
    }
    setReady(true);
  }, [loadCountriesToSelect, loadMechanic, match.params.id]);

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
    toast.info("Your image is uploaded, please give us more details");
  };

  if (!ready) return <LoadingComponent content='Loading values...' />;

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
        <Grid.Column width={10}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              initialValues={mechanic}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                  {editMode && <Label content='Name' />}

                  <Field
                    name='name'
                    placeholder='Name *'
                    value={mechanic.name}
                    component={TextInput}
                  />

                  {!editMode && (
                    <Field
                      name='owner'
                      placeholder='Are you owner or customer of this shop?'
                      options={ownerOptions}
                      value={mechanic.owner}
                      component={SelectInput}
                    />
                  )}

                  {!editMode && (
                    <Field
                      name='countryName'
                      placeholder={"Country *"} //
                      options={countries}
                      component={SelectInput}
                    />
                  )}
                  {editMode && <Label content='Description' />}

                  <Field
                    name='city'
                    placeholder='City *'
                    value={mechanic.city}
                    component={TextInput}
                  />
                  {editMode && <Label content='Address' />}

                  <Field
                    name='address'
                    placeholder='Address *'
                    value={mechanic.address}
                    component={TextInput}
                  />
                  {editMode && <Label content='Phone' />}

                  <Field
                    name='phone'
                    placeholder='Phone *'
                    value={mechanic.phone}
                    component={TextInput}
                  />
                  {editMode && <Label content='Email' />}

                  <Field
                    name='email'
                    placeholder='Email'
                    value={mechanic.email}
                    component={TextInput}
                  />
                  {editMode && <Label content='Website' />}

                  <Field
                    name='website'
                    placeholder='Website'
                    value={mechanic.website}
                    component={TextInput}
                  />
                  {!editMode && (
                    <Field
                      name='yearOfStart'
                      placeholder='Year of Start *'
                      value={mechanic.yearOfStart}
                      options={year}
                      component={SelectInput}
                    />
                  )}
                  {editMode && <Label content='Description' />}

                  <Field
                    name='description'
                    raws={3}
                    placeholder='Description *'
                    value={mechanic.description}
                    component={TextAreaInput}
                  />
                  <Button
                    loading={submitting}
                    disabled={loading || invalid || pristine}
                    positive
                    floated='right'
                    type='submit'
                    content='submit'
                  />
                  <Button
                    onClick={
                      mechanic.id
                        ? () => history.push(`/mechanics/${mechanic.id}`)
                        : () => history.push("/mechanics")
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
