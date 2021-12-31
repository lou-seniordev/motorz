import React, { Fragment, useContext } from "react";
// import { useHistory } from "react-router";
import { Header, Button, Grid } from "semantic-ui-react";
import { IUser } from "../../../app/models/user";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface IProps {
    mechanicId: string;
    username: string | undefined;
    rating: string;
    testimonial: string;
    user: IUser | null;
}
const ConfirmBecomeCustomer: React.FC<IProps> = ({ mechanicId, username, rating, testimonial, user}) => {
// const ConfirmBecomeCustomer = () => {
  const rootStore = useContext(RootStoreContext);
  // const { user } = rootStore.userStore;

  const { 
    // becomeCustomer, 
    becomeCustomer, recommend, rate, addTestimonial,
    setCloseCustomerForm, setHasBecomeCustomer } = rootStore.mechanicStore;
  const { closeModal } = rootStore.modalStore;

  const handleBecomeCustomer = (id: string) => {

    // setConfirmCustomer();

    // console.log('yes confirmed')
    setCloseCustomerForm();
    setHasBecomeCustomer()

    becomeCustomer(mechanicId, user)
    .then(() => recommend(mechanicId, user?.userName))
    .then(() => rate(mechanicId, rating, user))
    .then(() => addTestimonial(mechanicId, testimonial, user) )
    .catch(error => console.log(error));

    // becomeCustomer(id, user);
    closeModal();
  };

  const cancelBecomeCustomer = () => {
    closeModal();
  };
  // let history = useHistory();

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          as='h2'
          content='Become a customer of this moto shop?'
          color='teal'
          textAlign='center'
        />
        <Fragment>
          <Button
            // fluid
            onClick={() => handleBecomeCustomer('id')}
            color='teal'
            content='Yes, gladly!'
            floated='left'
          />
          <Button
            // fluid
            onClick={() => cancelBecomeCustomer()}
            content='No, cancel'
            floated='right'
          />
        </Fragment>
      </Grid.Column>
    </Grid>
  );
};

export default ConfirmBecomeCustomer;
