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
  email: composeValidators(isRequired("Email"), isValidEmail)(),
  website: isRequired("Website"),
  yearOfStart: isRequired("Year Of Start"),
});
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
    editMode,
    // mechanic: initalFormState,
    loadMechanic,
  } = rootStore.mechanicStore;

  const [mechanic, setMechanic] = useState(new MechanicFromValues());
  const [loading, setLoading] = useState(false);
  const [modeForCountry, setModeForCountry] = useState(true);
  const { loadCountriesToSelect, countries } = rootStore.countryStore;

  const [uploaded, setUploaded] = useState(false);

  const [edited, setEdited] = useState(false);

  const [imageToUpload, setImageToUpload] = useState(null);

  let image: any;
  const [previewImage, setPreviewImage] = useState();

  useEffect(() => {
    loadCountriesToSelect();
    // console.log("modeForCountry out", modeForCountry);

    if (match.params.id) {
      // console.log('match.params.id', match.params.id);

      setModeForCountry(false);
      setLoading(true);
      setUploaded(true);
      setEdited(true);

      // console.log("modeForCountry in", modeForCountry);
      loadMechanic(match.params.id)
        .then((mechanic) => {
          setMechanic(new MechanicFromValues(mechanic));
        })
        .finally(() => setLoading(false));
    }
  }, [loadCountriesToSelect, loadMechanic, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const { ...mechanic } = values;
    if (!mechanic.id) {
      let newMechanic = {
        ...mechanic,
        id: uuid(),
        datePublished: new Date().toISOString(),
        file: imageToUpload,
        photoUrl: previewImage

      };
      createMechanic(newMechanic);
      console.log(newMechanic);
    } else {
      // editMechanic(mechanic);
      console.log(mechanic);
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
    console.log('uploaded, edited', uploaded, edited);

  };

  return (
    <Grid>
      {!uploaded && (
        <Grid.Column width={16}>
          <Segment>
            <PhotoUploadWidget
              uploadPhoto={handleUploadImage}
              loading={uploaded}
              // loading={false}
            />
          </Segment>
        </Grid.Column>
      )}
      {/* <Grid.Column width={3} /> */}
      {uploaded && (
        <Grid.Column width={10}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              initialValues={mechanic}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                  <Field
                    name='name'
                    placeholder='Name'
                    value={mechanic.name}
                    component={TextInput}
                  />
                  {!modeForCountry && (
                    <Field
                      name='countryName'
                      // placeholder='Country'
                      options={countries}
                      value={mechanic.countryName}
                      component={SelectInput}
                    />
                  )}
                  {modeForCountry && (
                    <Field
                      name='countryName'
                      placeholder={"Country"} //
                      options={countries}
                      value={mechanic.countryId}
                      component={SelectInput}
                    />
                  )}
                  <Field
                    name='city'
                    placeholder='City'
                    value={mechanic.city}
                    component={TextInput}
                  />
                  <Field
                    name='address'
                    placeholder='Address'
                    value={mechanic.address}
                    component={TextInput}
                  />
                  <Field
                    name='phone'
                    placeholder='Phone'
                    value={mechanic.phone}
                    component={TextInput}
                  />
                  <Field
                    name='email'
                    placeholder='Email'
                    value={mechanic.email}
                    component={TextInput}
                  />
                  <Field
                    name='website'
                    placeholder='Website'
                    value={mechanic.website}
                    component={TextInput}
                  />
                  {!editMode && (
                    <Field
                      name='yearOfStart'
                      // type='datetime-local'
                      placeholder='Year of Start'
                      value={mechanic.yearOfStart}
                      options={year}
                      component={SelectInput}
                    />
                  )}
                  <Field
                    name='description'
                    raws={3}
                    placeholder='Description'
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
              <Header as='h2'>Love & peace and safe riding</Header>
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
