import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import "./Homepage.css";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  const {t} = useTranslation('home'); 

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
              // content={`t("welcome back to motoranza") ${user.displayName}`}
            >
              {t("welcome back to motoranza")}{" "} {user.displayName}
            </Header>
            <Button
              as={Link}
              to='/activities'
              size='huge'
              inverted
              className='btn'
            >
             {t('enter motoranza')}
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
              {/* Login to Enter */}
              {t('login to enter')}
            </Button>
            <Button
              onClick={() => openModal(<RegisterForm />)}
              size='huge'
              inverted
            >
              {/* Register to Enter */}
              {t('register to enter')}
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
