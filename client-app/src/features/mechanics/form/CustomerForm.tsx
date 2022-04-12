import React, { useContext} from "react";//, useState 
// import { Field } from "react-final-form";
import { Form as FinalForm, Field } from "react-final-form";

// import { useHistory } from "react-router";
import {
  Header,
  Button,
  Grid,
  Form,
  Segment,
  Checkbox,
  Label,
} from "semantic-ui-react";
// import { IUser } from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";

// import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";

import { ratingOptions } from "../../../app/common/options/ratingOptions";
import { yesNo}   from '../../../app/common/options/yesNoOptions';

import {
  combineValidators,
    composeValidators,
    hasLengthGreaterThan,
  isRequired,
} from "revalidate";
import ConfirmBecomeCustomer from "../modals/ConfirmBecomeCustomer";
import { useTranslation } from "react-i18next";

const validate = combineValidators({
  recommend: isRequired("recommend"),
  rating: isRequired("rating"),
    testimonial: composeValidators(
      isRequired("Testimonial"),
      hasLengthGreaterThan(4)({
        message: "Testimonial needs to be at least 25 characters",
      })
    )(),
});



interface IProps {
  mechanicId: string;
}
const CustomerForm: React.FC<IProps> = ({ mechanicId }) => {
  const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;

    const { t } = useTranslation(["forms"]);


    const { 
      setCloseCustomerForm , 
      } = rootStore.mechanicStore;

  const handleFinalFormSubmit = (values: any) => {
    
    let username = user?.userName;
    let rating = values.rating;
    let hasRecommended = values.recommend;
    let testimonial = values.testimonial;

    openModal(<ConfirmBecomeCustomer mechanicId={mechanicId} 
        username={username} 
        rating={rating}
        hasRecommended={hasRecommended}
        testimonial={testimonial}
        user={user}
        />);
    

  };

  const handleChange = (key: any, value: any) => {
    
    if (value.checked === true){
        // setAgreeTermsAndServices(value.checked);
    } else {
        // setAgreeTermsAndServices(value.checked);
    }
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment clearing>
          <Header
            as='h2'
            content={t('Register as a customer of this mechanic is enabling you to review, evaluate, comment and more...')}
            color='teal'
            textAlign='center'
          />
          <FinalForm
            validate={validate}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name='rating'
                  placeholder={t('How would you evaluate this shop?')}
                  options={ratingOptions}
                  component={SelectInput}
                />
                <Field
                  name='recommend'
                  placeholder={t('Would you recommend this shop?')}
                  options={yesNo}
                  component={SelectInput}
                />
                <Field
                  name='testimonial'
                  rows={4}
                  placeholder={t('Please write a couple of words about your experience with this mechanic shop')}
                  component={TextAreaInput}
                />
                <Checkbox
                  name='checkForUpdates'
                  onChange={(e, data) => handleChange(e, data)}
                  />
                <Label onClick={()=> console.log('open modal')} content={t('I have read and understood the rules of a portal')}/>

                <Button
                  floated='right'
                  type='button'
                  content={t("No, don't register me")}
                  onClick={() => setCloseCustomerForm()}
                />
                <Button
                  floated='right'
                  disabled={invalid || pristine}
                  positive
                  type='submit'
                  content={t('Yes, register me as a customer')}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default CustomerForm;
