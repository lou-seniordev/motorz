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

import { ProductFormValues } from "../../../app/models/product";

import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";

// import { year } from "../../../app/common/options/yearOptions";
import { categories } from "../../../app/common/options/productOptions";

import SelectInput from "../../../app/common/form/SelectInput";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
  isNumeric,
  // createValidator,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

import { toast } from "react-toastify";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";
// import { toJS } from "mobx";

// const isValidEmail = createValidator(
//   (message) => (value) => {
//     if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
//       return message;
//     }
//   },
//   "Invalid email address"
// );

const validate = combineValidators({
  title: isRequired({ message: "The title is required" }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  // photoUrl: isRequired("Photo"),
  countryName: isRequired("countryName"),
  // model: isRequired("model"),
  // brand: isRequired("brand"),
  city: isRequired("City"),
  // address: isRequired("address"),
  phoneNumber: composeValidators(
    isNumeric("Phone"),
    isRequired("Phone"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  price: composeValidators(
    isNumeric("Price"),
    isRequired("Price")
    // hasLengthGreaterThan(4)({
    //   message: "Description needs to be at least 5 characters",
    // })
  )(),
  // email: composeValidators(isRequired("Email"), isValidEmail)(),
  // website: isRequired("Website"),
  // yearOfStart: isRequired("Year Of Start"),
});
interface DetailParams {
  id: string;
}
const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
  history,
  match,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { createProduct, editProduct, submitting, loadProduct } = rootStore.productStore;
  const { addFeedItem } = rootStore.feedStore;
  const { loadCountriesToSelect, countries } = rootStore.countryStore;
  const { user } = rootStore.userStore;


  const [product, setProduct] = useState(new ProductFormValues());
  const [loading, setLoading] = useState(false);
  const [modeForCountry, setModeForCountry] = useState(true);
  const [modeForCategory, setModeForCategory] = useState(true);
  const [uploaded, setUploaded] = useState(false);
  const [edited, setEdited] = useState(false);

  const [imageToUpload, setImageToUpload] = useState(null);

  let image: any;
  const [previewImage, setPreviewImage] = useState();

  useEffect(() => {
    loadCountriesToSelect();
    // console.log("modeForCategory out", modeForCategory);

    if (match.params.id) {
      // console.log("match.params.id", match.params.id);
      
      // console.log("modeForCategory in", modeForCategory);
      setModeForCountry(false);
      setModeForCategory(false);
      setLoading(true);
      setUploaded(true);
      setEdited(true);
      
      // console.log("modeForCountry in", modeForCountry)
      loadProduct(match.params.id)
      .then((product) => {
        setProduct(new ProductFormValues(product));
       
        })
        .finally(() => setLoading(false));

        
    }
  }, [loadCountriesToSelect, loadProduct, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    let newId = uuid();

    const { ...product } = values;
    if (product.brand === '') product.brand = 'Brand not asigned';
    if (product.model === '') product.model = 'Model not asigned';

    if (!product.id) {
      let newProduct = {
        ...product,
        id: newId,
        datePublished: new Date().toISOString(),
        file: imageToUpload,
        photoUrl: previewImage,
        sellerUsername: user?.userName
      };
      createProduct(newProduct);
      addFeedItem(newId, 'Added Product');

    } else {
      editProduct(product);
      // console.log(product);
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
    // setUploadingMechanicPhoto(true)
    toast.info("Your image is uploaded, please give us more details");
    // console.log('uploaded, edited', uploaded, edited);
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
              initialValues={product}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                  <Field
                    name='title'
                    placeholder='Title *'
                    value={product.title}
                    component={TextInput}
                  />
                  <Field
                    name='price'
                    placeholder='Price *'
                    value={product.price}
                    component={TextInput}
                  />
                  <Field
                    name='description'
                    rows={3}
                    placeholder='Description *'
                    value={product.description}
                    component={TextAreaInput}
                  />

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
                      placeholder={"Country *"} //
                      options={countries}
                      // value={product.countryName}
                      component={SelectInput}
                    />
                  )}
                  {!modeForCategory && ( //edit form
                    <Field
                      name='category'
                      // name='product.category'
                      // placeholder='Category'
                      options={categories}
                      // value={product.category}
                      component={SelectInput}
                    />
                  )}
                  {modeForCategory && ( //new form
                    <Field
                      name='category'
                      placeholder='Category *'
                      options={categories}
                      value={product.category}
                      component={SelectInput}
                    />
                  )}
                  <Field
                    name='city'
                    placeholder='City'
                    value={product.city}
                    component={TextInput}
                  />

                  <Field
                    name='phoneNumber'
                    placeholder='Phone *'
                    value={product.phoneNumber}
                    component={TextInput}
                  />

                  <Field
                    name='model'
                    placeholder='Model'
                    value={product.model}
                    component={TextInput}
                  />
                  <Field
                    name='brand'
                    placeholder='Brand'
                    value={product.brand}
                    component={TextInput}
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
                      product.id
                        ? () => history.push(`/product/${product.id}`)
                        : () => history.push("/product")
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
              <Header as='h2'>{product.title}</Header>
              <Image size='large' bordered src={product.photoUrl} />
            </Segment>
          </Sticky>
        </Grid.Column>
      )}
    </Grid>
  );
};

export default observer(ProductForm);
