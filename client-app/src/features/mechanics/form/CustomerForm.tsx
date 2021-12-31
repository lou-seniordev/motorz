import React, { useContext, useState } from "react";
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

import {
  combineValidators,
  //   composeValidators,
  //   hasLengthGreaterThan,
  isRequired,
} from "revalidate";
import ConfirmBecomeCustomer from "../modals/ConfirmBecomeCustomer";
// import ConfirmDelete from "./ConfirmDelete";
// import ConfirmBecomeCustomer from "./ConfirmBecomeCustomer";
// import { values } from "mobx";
const validate = combineValidators({
  //   title: isRequired({ message: "The event title is required" }),
  recommend: isRequired("recommend"),
  rating: isRequired("rating"),
  //   testimonial: composeValidators(
  //     isRequired("Testimonial"),
  //     hasLengthGreaterThan(4)({
  //       message: "Testimonial needs to be at least 25 characters",
  //     })
  //   )(),
});

const ratingOptions = [
  {
    key: "1",
    text: "Not satisfied at all",
    value: "1",
  },
  {
    key: "2",
    text: "It could be better, but ok",
    value: "2",
  },
  { key: "3", text: "Satified", value: "3" },
  { key: "4", text: "Very satisfied", value: "4" },
  {
    key: "5",
    text: "Totally happy",
    value: "5",
  },
];
const customerOptions = [
  { key: "Yes", text: "Yes", value: "1" },
  { key: "No", text: "No", value: "0" },
];

interface IProps {
  mechanicId: string;
  // user: IUser;
}
// const BecomeCustomer: React.FC<IProps> = ({ mechanicId }) => {
const CustomerForm: React.FC<IProps> = ({ mechanicId }) => {
  const rootStore = useContext(RootStoreContext);
    const { user } = rootStore.userStore;
    const { openModal } = rootStore.modalStore;

    const { 
        becomeCustomer, recommend, rate, addTestimonial, setCloseCustomerForm , 
        confirmCustomer} = rootStore.mechanicStore;
  const { closeModal } = rootStore.modalStore;
  const [registerForUpdates, setRegisterForUpdates] = useState<boolean>(false);

  //   const handleBecomeCustomer = (id: string) => {
  //     // becomeCustomer(id, user);
  //     closeModal();
  //     // history.push(`/mechanics`);
  //   };

  const cancelBecomeCustomer = () => {
    closeModal();
  };
  // let history = useHistory();

  const handleFinalFormSubmit = (values: any) => {
    
    let username = user?.userName;
    let rating = values.rating;
    let testimonial = values.testimonial;
    openModal(<ConfirmBecomeCustomer mechanicId={mechanicId} 
        username={username} 
        rating={rating}
        testimonial={testimonial}
        user={user}
        />);
    // if(confirmCustomer){
    //     console.log('confirmed also here')
    // }
    
    // addTestimonial(mechanicId, values.testimonial, user)

    // recommend(mechanicId, user?.userName)
    //     const {...forumpost} = values;
    //   if (!forumpost.id) {
    //       let newForumpost = {
    //         ...forumpost,
    //         id: uuid(),
    //         dateAdded: new Date().toISOString(),
    //         displayName: user?.displayName
    //       };
    //       createForumpost(newForumpost)
    //     } else {
    //       editForumpost(forumpost);
    //     }
  };

  const handleChange = (key: any, value: any) => {
    
    if (value.checked === true){
        setRegisterForUpdates(value.checked);
        // console.log( registerForUpdates);
    } else {
        setRegisterForUpdates(value.checked);
        // console.log( registerForUpdates);
    }
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment clearing>
          <Header
            as='h2'
            content='Register as a customer of this mechanic is enabling you to review, evaluate, comment and more...'
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
                  placeholder='How would you evaluate this shop?'
                  options={ratingOptions}
                  component={SelectInput}
                />
                <Field
                  name='recommend'
                  placeholder='Would you recommend this shop?'
                  options={customerOptions}
                  component={SelectInput}
                />
                <Field
                  name='testimonial'
                  rows={4}
                  placeholder='Please write a couple of words about your experience with this mechanic shopÎ'
                  component={TextAreaInput}
                />
                <Checkbox
                  name='checkForUpdates'
                  onChange={(e, data) => handleChange(e, data)}
                  />
                  {/* label */}
                <Label onClick={()=> console.log('open modal')} content='I have read and understood the rules of a portal'/>

                <Button
                  floated='right'
                  type='button'
                  content="No, don't register me"
                //   onClick={() => cancelBecomeCustomer()}
                  onClick={() => setCloseCustomerForm()}
                />
                <Button
                  floated='right'
                  disabled={invalid || pristine}
                  positive
                  type='submit'
                  content='Yes, register me as a customer'
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
