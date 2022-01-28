import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import "./Homepage.css";

const HomePage = () => {
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        {/* <Transition animation='slide left' duration={5} directional> */}

        <Header as='h1' inverted className='animationLeft'>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          MOTORANZA
        </Header>
        {/* </Transition> */}
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header
              // className='animationLeft'
              as='h2'
              inverted
              content={`Welcome back to Motoranza ${user.displayName}`}
            />
            <Button
              as={Link}
              to='/gallery'
              size='huge'
              inverted
              className='btn'
            >
              Enter Motoranza
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as='h2' inverted content={"Welcome to Motoranza"} />
            <Button
              onClick={() => openModal(<LoginForm />)}
              to='/login'
              size='huge'
              inverted
            >
              Login to Enter
            </Button>
            <Button
              onClick={() => openModal(<RegisterForm />)}
              size='huge'
              inverted
            >
              Register to Enter
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
