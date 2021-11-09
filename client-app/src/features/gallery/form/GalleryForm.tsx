import React, { useContext, useEffect, useState } from "react"; //InputHTMLAttributes
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import { MotofyFormValues } from "../../../app/models/motofy";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";


// import { brand } from '../../../app/common/options/brandOptions';
import { year } from "../../../app/common/options/yearOptions";

import { toast } from "react-toastify";

//NOTSHIT
// import {
//   combineValidators,
//   composeValidators,
//   hasLengthGreaterThan,
//   isRequired,
//   isNumeric,
// } from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";



//NOTSHIT
// const validate = combineValidators({
//   name: isRequired({ message: "The event name is required" }),
//   description: composeValidators(
//     isRequired("Description"),
//     hasLengthGreaterThan(4)({
//       message: "Description needs to be at least 5 characters",
//     })
//   )(),
//   // photoUrl: isRequired("Photo"),
//   city: isRequired("City"),
//   country: isRequired("Country"),
//   model: isRequired("model"),
//   pricePaid: composeValidators(
//     isNumeric("Price paid"),
//     isRequired("Price paid")
//   )(),
//   cubicCentimeters: composeValidators(
//     isNumeric("Power of engine"),
//     isRequired("Power of engine")
//   )(),
//   yearOfProduction: isRequired("Year of production"),
//   numberOfKilometers: composeValidators(
//     isNumeric("Number of kilometers"),
//     isRequired("Number of kilometers")
//   )(),
//   estimatedValue: composeValidators(
//     isNumeric("Estimated valude"),
//     isRequired("Estimated valude")
//   )(),
// });



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
    // editMotofy,
    uploadingMotofyPhoto,
    submitting,
    editMode,
    loadMotofy,
  } = rootStore.motofyStore;

  const { loadBrandsToSelect, brands } = rootStore.brandStore;

  const [motofy, setMotofy] = useState(new MotofyFormValues());
  const [loading, setLoading] = useState(false);

  //why using this??
  const [uploaded, setUploaded] = useState(false);



  let old: boolean = true;
  // let : Blob | null= null;
  const [imageToUpload, setImageToUpload] = useState(null);

  useEffect(() => {
    // setBrands(()=> )
    // handlePopulateBrands();
    // setBrands(() => (loadBrandsToSelect))
    old = true;

    loadBrandsToSelect();
    if (match.params.id) {
      old = false;
      setLoading(true);
      loadMotofy(match.params.id)
        .then((motofy) => setMotofy(new MotofyFormValues(motofy)))
        .finally(() => setLoading(false));
    }
  }, [loadMotofy, match.params.id]); // ,loadBrandsToSelect, brands

  const handleFinalFormSubmit = (values: any) => {
    const { ...motofy } = values;
    console.log("Has it got an ID??", motofy.id);

    if (!motofy.id) {
      let newMotofy = {
        ...motofy,
        id: uuid(),
        datePublished: new Date().toISOString(),
        file: imageToUpload,
        
      };
      console.log("From Gallery Form:", imageToUpload);
      console.log("From newMotofy:", newMotofy);
      createMotofy(newMotofy);
    } else {
      // editMotofy(motofy);
    }
  };


  const handleUploadImage = (photo: any) => {
    // uploadPhoto(photo).then(() => setAddPhotoMode(false));

    // toastr!!!!!! najbolje
    console.log("Zivjo from handleUploadImage!");

    setImageToUpload(photo);
    // imageToUpload = photo;
    console.log("From handleUploadImage Form:", imageToUpload);
    toast.info("Your image is uploaded, please fill in the form");
    setUploaded(true);
  };

  return (
    <Grid>
      {!uploaded && (
        
        <Grid.Column width={16}>
          {/* <Grid.Row> */}
            <Segment>
              <PhotoUploadWidget
                uploadPhoto={handleUploadImage}
                loading={uploadingMotofyPhoto}
                // setUpFiles={setUpFiles}
                />
            </Segment>
          {/* </Grid.Row> */}
        </Grid.Column>
        
        )}
      {uploaded && (
        // <Segment></Segment>
        <Grid.Column width={16}>
          <Segment clearing>
            <FinalForm
              // validate={validate}
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
                    rows={3}
                    placeholder='Description'
                    value={motofy.description}
                    component={TextAreaInput}
                  />
                  {/* <Field
                  name='photoUrl'
                  placeholder='PhotoUrl'
                  value={motofy.photoUrl}
                  component={TextInput}
                /> */}
                  {/* <a href="">FileField</a>{""} */}

                  {/* <input type="file" onChange={fileSelectedHandler}/> */}
                  {/* <input type="file" onChange={(event) => {uploadImage(event.target.files)}}/> */}

                  {/* onChange={(event: any) => {imageHandler(event.target)}} */}
                  {/* <Field component={FileInput} name='file' placeholder='Motofy' 
                onChange={imageHandler}
                /> */}

                  {/* <FileInputField name='File'                   
                // placeholder='Image'
                /> */}

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
                  {!old && (
                    <Field
                      name='brandName'
                      placeholder='Brand'
                      options={brands}
                      value={motofy.brandName}
                      component={SelectInput}
                    />
                  )}
                  {old && (
                    <Field
                      // name is naming the value
                      name='brandName'
                      // placeholder={old}

                      placeholder={"Brand"} //
                      // placeholder={motofy.brandName} //'Brand'
                      options={brands}
                      // value={brands}
                      value={motofy.brandId}
                      component={SelectInput}
                      // component={TextInput}
                    />
                  )}

                  {/*REASON - cannot edit what??? */}
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
                    disabled={loading || invalid || pristine}
                    positive
                    floated='right'
                    type='submit'
                    content='submit'
                  />
                  <Button
                    onClick={
                      motofy.id
                        ? () => history.push(`/gallery/${motofy.id}`)
                        : () => history.push("/galleryForm")
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
    </Grid>
  );
};

export default observer(GalleryForm);


//totaltrash
{
  /* <Grid.Row>
          {uploaded && ( //motofyPreview !== null &&
            <Segment>
              <h1>Check your photo</h1>
              <Button
                content='choose another photo?'
                color='google plus'
                onClick={() => setUploaded(!uploaded)}
              />
              <Image
                src={
                  imageToUpload! ||
                  // URL.createObjectURL(imageToUpload)
                  `/assets/placeholder.png`
                }
              />
            </Segment>
          )}
        </Grid.Row> */
}
  //maxx
  // const [selectedFile, setSelectedFile] = useState(undefined);

  // setSelectedFile(event!.target!.files[0])

  // const fileSelectedHandler = (event: any) => {
  //   console.log(event.target.files[0]);
  //   // console.log(event.target.files[0]);
  // }

  // var preview: any;

  // this got it working!!!
  // const uploadImage = (files: any) => {
  //   console.log('uploadImage: ', files[0])
  //   // imageToUpload = files[0];
  // }

  // const imageHandler = (event: any) => {
  //   console.log(event.target.files[0]);
  // }


    // const [upFiles, setUpFiles] = useState<any[]>([]);

  // const [preview, setPreview] = useState<Blob | null>(null);

  // const [brands, setBrands] = useState([]); //new BrandFormValues()
  // const setBrands()

  // import FileInputField from "../../../app/common/form/FileInputField";

// import {FilesField} from 'react-final-form-file-field';

// import FileInput from "../../../app/common/form/FileInput";
// import axios, { AxiosResponse } from "axios";
// const responseBody = (response: AxiosResponse) => response.data;

// import { IBrandToSelect} from "../../../app/models/brand";
// import { brand } from "../../../app/common/options/brandOptions";
// import { BrandFormValues } from "../../../app/models/brand";


//== for input file ===
// interface Props extends InputHTMLAttributes<HTMLInputElement> {
//   name: string
// }

// const FileField = ({ name, ...props }: Props) => (
//   <Field<FileList> name={name}>
//     {({ input: { value, onChange, ...input } }) => (
//       <input
//         {...input}
//         type="file"
//         onChange={({ target }) => onChange(target.files)} // instead of the default target.value
//         {...props}
//       />
//     )}
//   </Field>
// )