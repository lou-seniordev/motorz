import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Header, Segment, Sticky, Image } from "semantic-ui-react";
import {
  ActivityFormValues,
  DiaryEntryFormValues,
} from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { mood } from "../../../app/common/options/moodOptions";
import { motoOptions } from "../../../app/common/options/motoOptions";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import { RootStoreContext } from "../../../app/stores/rootStore";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
} from "revalidate";
import { toast } from "react-toastify";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";

// const validate = combineValidators({
//   title: isRequired({ message: "The title is required" }),
//   category: isRequired("Category"),
//   description: composeValidators(
//     isRequired("Description"),
//     hasLengthGreaterThan(4)({
//       message: "Description needs to be at least 5 characters",
//     })
//   )(),
//   city: isRequired("City"),
//   departure: isRequired("Departure"),
//   date: isRequired("Date"),
//   time: isRequired("Time"),
// });

interface DetailParams {
  id: string;
  // activityId: string;
}

const DiaryEntryForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
    createDiaryEntry
    // ,
  } = rootStore.activityStore;

  const { addFeedItem } = rootStore.feedStore;
  const { loadCountriesToSelect, countries } = rootStore.countryStore;
  const [modeForCountry, setModeForCountry] = useState(true);

  const random = Math.floor(Math.random() * motoOptions.length);
  // console.log(random, motoOptions[random]);
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
    // console.log('uploaded, edited', uploaded, edited);
  };

  const [activity, setActivity] = useState();


  useEffect(() => {
    // if (match.path === "/createDiaryEntry/:id") {
    //   console.log("create");
    // } else if (match.path === "/manageDiaryEntry/:id") {
    //   console.log("manage");
    // }

    loadCountriesToSelect();

    loadActivity(match.params.id)
      .then((activity) => setActivity((activity)))
      .finally(() => setLoading(false));

    // if (match.path === "/manageDiaryEntry/:id") {
    //   setModeForCountry(false);
    //   setLoading(true);
    //   loadActivity(match.params.id)
    //   .then((activity) => setActivity(new ActivityFormValues(activity)))
    //   .finally(() => setLoading(false));
    // }
  }, [
    //   loadActivity,
    match.path,
    match.params.id,
    loadCountriesToSelect,
  ]);

  // if (match.path === "/createDiaryEntry/:id") {
  //   console.log("create");
  // } else if (match.path === "/manageDiaryEntry/:id") {
  //   console.log("manage");
  // }
  const handleFinalFormSubmit = (values: any) => {
    let uiId = uuid();
    if (match.path === "/createDiaryEntry/:id") {
      // let activity = loadActivity(match.params.id);
      let newDiaryEntry = {
        ...values,
        id: uiId,
        // activityId;
        // id: match.params.id,
        entryDate: new Date(),
        file: imageToUpload,
        photoUrl: previewImage
      };
      createDiaryEntry(newDiaryEntry, activity!);
      // // .then(() => {
      // //   history.push(`/activities/${match.params.id}`)
      // });
    }

    // let newId = uuid();
    // const dateAndTime = combineDateAndTime(values.date, values.time);
    // const { date, time, ...activity } = values;
    // activity.date = dateAndTime;
    // if (!activity.id) {
    //   let newActivity = {
    //     ...activity,
    //     id: newId,
    //     isHost: true,
    //     isActive: true,
    //   };
    //   createActivity(newActivity);
    //   addFeedItem(newId, "Added Motocycle Diary");
    // } else {
    //   editActivity(activity);
    // }
  };


//   locationCity: "Rome"
// locationCountry: "Italy"
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
      {/* <Grid.Column width={3} /> */}
      {uploaded && (
        <Grid.Column width={10}>
          <Segment clearing>
            <FinalForm
              // validate={validate}
              initialValues={diaryEntry}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                  {/* <Field
                  name='title'
                  placeholder='Title'
                  value={activity.title}
                  component={TextInput}
                /> */}
                  <Field
                    name='body'
                    placeholder='What happened today?'
                    // value={activity.body}
                    rows={5}
                    component={TextAreaInput}
                  />
                  <Field
                    name='mood'
                    placeholder='What is your mood today?'
                    options={mood}
                    // value={activity.category}
                    component={SelectInput}
                  />

                  {!modeForCountry && (
                    <Field
                      // placeholder={"Country"} // edit form
                      name='locationCountry'
                      options={countries}
                      // value={product.countryId}
                      component={SelectInput}
                    />
                  )}
                  {modeForCountry && ( //empty form
                    <Field
                      name='locationCountry'
                      // name='countryId'
                      placeholder={"Country you are in"} //
                      options={countries}
                      // value={product.countryName}
                      component={SelectInput}
                    />
                  )}
                  <Field
                    name='locationCity'
                    placeholder='City you are in'
                    // value={activity.city}
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
                  {/* <Button
                  onClick={
                    activity.id
                      ? () => history.push(`/activities/${activity.id}`)
                      : () => history.push('/activities')
                  }
                  disabled={loading}
                  floated='right'
                  type='button'
                  content='Cancel'
                ></Button> */}
                </Form>
              )}
            />
          </Segment>
        </Grid.Column>
      )}
      {/* !edited && */}
      {uploaded &&  (
        <Grid.Column width={6}>
          <Sticky style={{ marginRight: 30, position: "fixed" }}>
            <Segment>
              <Header as='h2'>{motomoto}</Header>
              <Image size='large' bordered src={previewImage} />
            </Segment>
          </Sticky>
        </Grid.Column>
      )}
      <Grid.Column width={3} />
    </Grid>
  );
};

export default observer(DiaryEntryForm);
