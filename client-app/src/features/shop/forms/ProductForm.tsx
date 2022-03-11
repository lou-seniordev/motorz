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

import { ProductFormValues } from "../../../app/models/product";

import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";

import { categories } from "../../../app/common/options/productOptions";

import SelectInput from "../../../app/common/form/SelectInput";
import {
  combineValidators,
  composeValidators,
  hasLengthGreaterThan,
  isRequired,
  isNumeric,
} from "revalidate";
import { RootStoreContext } from "../../../app/stores/rootStore";

import { toast } from "react-toastify";
import PhotoUploadWidget from "../../../app/common/photoUpload/PhotoUploadWidget";
import { motoOptions } from "../../../app/common/options/motoOptions";
import LoadingComponent from "../../../app/layout/LoadingComponent";


const validate = combineValidators({
  title: isRequired({ message: "The title is required" }),
  category: isRequired("Category"),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",
    })
  )(),
  countryName: isRequired("countryName"),
  city: isRequired("City"),
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

  )(),
 
});
interface DetailParams {
  id: string;
}
const ProductForm: React.FC<RouteComponentProps<DetailParams>> = ({
  history,
  match,
}) => {
  const rootStore = useContext(RootStoreContext);

  const { createProduct, editProduct, submitting, loadProduct } =
    rootStore.productStore;
  const { addFeedItem } = rootStore.feedStore;
  const { loadCountriesToSelect, countries } = rootStore.countryStore;
  const { user } = rootStore.userStore;

  const random = Math.floor(Math.random() * motoOptions.length);
  const motomoto = motoOptions[random];

  const [product, setProduct] = useState(new ProductFormValues());
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

      loadProduct(match.params.id)
        .then((product) => {
          setProduct(new ProductFormValues(product));
        })
        .finally(() => setLoading(false));
    }
    setReady(true);

  }, [loadCountriesToSelect, loadProduct, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    let newId = uuid();

    const { ...product } = values;
    if (product.brand === "") product.brand = "Brand not asigned";
    if (product.model === "") product.model = "Model not asigned";

    if (!product.id) {
      let newProduct = {
        ...product,
        id: newId,
        datePublished: new Date().toISOString(),
        file: imageToUpload,
        photoUrl: previewImage,
        sellerUsername: user?.userName,
      };
      createProduct(newProduct);
      addFeedItem(newId, "Added Product");
    } else {
      editProduct(product);
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
        <Grid.Column computer={10} mobile={16}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              initialValues={product}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                  {editMode && <Label content='Title' />}

                  <Field
                    name='title'
                    placeholder='Title *'
                    value={product.title}
                    component={TextInput}
                  />
                  {editMode && <Label content='Price' />}
                  <Field
                    name='price'
                    placeholder='Price *'
                    value={product.price}
                    component={TextInput}
                  />
                  {editMode && <Label content='Description' />}
                  <Field
                    name='description'
                    rows={3}
                    placeholder='Description *'
                    value={product.description}
                    component={TextAreaInput}
                  />

                  {editMode && <Label content='Category' />}
                  <Field
                    name='category'
                    placeholder='Category *'
                    options={categories}
                    value={product.category}
                    component={SelectInput}
                  />

                  {editMode && <Label content='Country' />}
                  <Field
                    name='countryName'
                    placeholder={"Country *"} //
                    options={countries}
                    component={SelectInput}
                  />
                  {editMode && <Label content='City' />}
                  <Field
                    name='city'
                    placeholder='City'
                    value={product.city}
                    component={TextInput}
                  />
                  {editMode && <Label content='Phone' />}
                  <Field
                    name='phoneNumber'
                    placeholder='Phone *'
                    value={product.phoneNumber}
                    component={TextInput}
                  />
                  {editMode && <Label content='Model' />}
                  <Field
                    name='model'
                    placeholder='Model'
                    value={product.model}
                    component={TextInput}
                  />
                  {editMode && <Label content='Brand' />}
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
                        : () => history.push("/productForm")
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
