import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Sticky,
  Image,
} from "semantic-ui-react";
import { DiaryEntryFormValues } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { mood } from "../../../app/common/options/moodOptions";
import { motoOptions } from "../../../app/common/options/motoOptions";
import { RootStoreContext } from "../../../app/stores/rootStore";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from "revalidate";
import { toast } from "react-toastify";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";
// import { formatDistance } from "date-fns";

const validate = combineValidators({
  locationCity: isRequired({ message: "The location city is required" }),
  locationCountry: isRequired({ message: "The location country is required" }),
  body: composeValidators(
    isRequired("Body"),
    hasLengthGreaterThan(4)({
      message: "Body needs to be at least 5 characters",
    })
  )(),
  mood: isRequired({ message: "The mood is required" }),
});

interface DetailParams {
  id: string;
  activityId: string;
}

const DiaryEntryForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    submitting,
    loadActivity,
    createDiaryEntry,
    loadDiaryEntry,
    editDiaryEntry,
    // ,
  } = rootStore.activityStore;

  // const { addFeedItem } = rootStore.feedStore;
  const { loadCountriesToSelect, countries } = rootStore.countryStore;

  const random = Math.floor(Math.random() * motoOptions.length);

  const motomoto = motoOptions[random];

  const [diaryEntry, setdiaryEntry] = useState(new DiaryEntryFormValues());
  const [loading, setLoading] = useState(false);

  //===PHOTO UPLOAD===
  let image: any;
  const [previewImage, setPreviewImage] = useState();
  const [imageToUpload, setImageToUpload] = useState(null);
  const [uploaded, setUploaded] = useState(false);

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

  const [edited, setEdited] = useState(false);

  const [activity, setActivity] = useState();

  useEffect(() => {
    loadCountriesToSelect();

    loadActivity(match.params.activityId)
      .then((activity) => setActivity(activity))
      .finally(() => setLoading(false));

    if (match.path === "/manageDiaryEntry/:id/:activityId") {
      console.log("match", match);
      loadDiaryEntry(match.params.id)
        .then((diaryEntry) => setdiaryEntry(diaryEntry!))
        .finally(() => setLoading(false));
      setEdited(true);
      setUploaded(true);

    }
  }, [
    loadActivity,
    match,
    match.path,
    match.params.id,
    loadCountriesToSelect,
    loadDiaryEntry,
  ]);


  const handleFinalFormSubmit = (values: any) => {
    let uiId = uuid();
    if (match.path === "/createDiaryEntry/:activityId") {
      let newDiaryEntry = {
        ...values,
        id: uiId,
        entryDate: new Date(),
        file: imageToUpload,
        photoUrl: previewImage,
      };
      createDiaryEntry(newDiaryEntry, activity!);
 
    } else {
      let newDiaryEntry = {
        ...values,
        activityId: match.params.activityId,
      };

      editDiaryEntry(newDiaryEntry, activity!);
    }

  };

  return (
    <Grid>
      {!uploaded && (
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
              initialValues={diaryEntry}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                  <Field
                    name='body'
                    placeholder='What happened today?'
                    rows={5}
                    component={TextAreaInput}
                  />
                  <Field
                    name='mood'
                    placeholder='What is your mood today?'
                    options={mood}
                    component={SelectInput}
                  />
                  <Field
                    name='locationCountry'
                    placeholder={"Country you are in"} //
                    options={countries}
                    component={SelectInput}
                  />
                  <Field
                    name='locationCity'
                    placeholder='City you are in'
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
                    onClick={() =>
                      history.push(`/activities/${match.params.activityId}`)
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
              <Header as='h2'>
                {diaryEntry.locationCity}
                {/* {formatDistance(
                  new Date(diaryEntry.entryDate)
                  ,
                  new Date()
                )}{" "}
                ago{" "} */}
              </Header>
              <Image size='large' bordered src={diaryEntry.photoUrl} />
            </Segment>
          </Sticky>
        </Grid.Column>
      )}
    </Grid>
  );
};

export default observer(DiaryEntryForm);
