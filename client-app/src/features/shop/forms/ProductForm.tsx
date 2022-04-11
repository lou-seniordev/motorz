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
import { useTranslation } from "react-i18next";




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

  const { t } = useTranslation(["forms"]);

  const validate = combineValidators({
  
    title: isRequired({ message: t("Title is required") }),
    category: isRequired({ message: t("Category is required") }),
    description: composeValidators(
      isRequired({ message: t("Description is required") }),
      hasLengthGreaterThan(4)({
        message:t("Description needs to be at least 5 characters"),
      })
    )(),
    countryName: isRequired({ message: t("Country is required") }),
    city: isRequired({ message: t("City is required") }),
    phoneNumber: composeValidators(
      isNumeric({ message: t("Phone must be numeric value") }),
      // isRequired({ message: t("Phone is required") }),
      hasLengthGreaterThan(8)({
        message: t("Phone needs to be at least 9 characters"),
      })
    )(),
    price: composeValidators(
      isNumeric({ message: t("Price must be numeric value") }),
      isRequired({ message: t("Price is required") })
  
    )(),
   
  });
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
        inactivityExpirationDate: new Date(Date.now() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 30),
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
        <Grid.Column computer={10} mobile={16}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              initialValues={product}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit} loading={loading}>
                  {editMode && <Label content={t('Title')} />}

                  <Field
                    placeholder={t('Title')}
                    name='title'
                    value={product.title}
                    component={TextInput}
                  />
                  {editMode && <Label content={t('Price')} />}
                  <Field
                    placeholder={t('Price')}
                    name='price'
                    value={product.price}
                    component={TextInput}
                  />
                  {editMode && <Label content={t('Description')} />}
                  <Field
                    placeholder={t('Description')}
                    name='description'
                    rows={3}
                    value={product.description}
                    component={TextAreaInput}
                  />

                  {editMode && <Label content={t('Category')} />}
                  <Field
                    placeholder={t('Category')}
                    name='category'
                    options={categories}
                    value={product.category}
                    component={SelectInput}
                  />

                  {editMode && <Label content={t('Country')} />}
                  <Field
                    placeholder={t('Country')} 
                    name='countryName'
                    options={countries}
                    component={SelectInput}
                  />
                  {editMode && <Label content={t('City')} />}
                  <Field
                    placeholder={t('City')}
                    name='city'
                    value={product.city}
                    component={TextInput}
                  />
                  {editMode && <Label content={t('Phone')} />}
                  <Field
                    placeholder={t('Phone')}
                    name='phoneNumber'
                    value={product.phoneNumber}
                    component={TextInput}
                  />
                  {editMode && <Label content={t('Model')} />}
                  <Field
                    placeholder={t('Model')}
                    name='model'
                    value={product.model}
                    component={TextInput}
                  />
                  {editMode && <Label content={t('Brand')} />}
                  <Field
                    placeholder={t('Brand')}
                    name='brand'
                    value={product.brand}
                    component={TextInput}
                  />

                  <Button
                    loading={submitting}
                    disabled={loading || invalid || pristine}
                    positive
                    floated='right'
                    type='submit'
                    content={t('Submit')}
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
