import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";
import "./Homepage.css";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const token = window.localStorage.getItem("jwt");
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal, setSize } = rootStore.modalStore;

  const { t } = useTranslation("home");

  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container textAlign='center' className="home-container" style={{ marginLeft:"auto", marginRight:"auto"}}>
        <Header as='h1' inverted style={{marginLeft:"5rem"}}>
          <span style={{ color: "#FA5" }}>M</span>OTORANZA
        </Header>
        {isLoggedIn && user && token ? (
          <Fragment>
            <Header as='h2' inverted>
              {t("welcome back to motoranza")} {user.displayName}
            </Header>
            <Button
              as={Link}
              to='/activities'
              size='huge'
              inverted
              className='btn'
            >
              {t("enter motoranza")}
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as='h2' inverted content={t("Welcome to Motoranza")} />
            <Button
              onClick={() => {
                setSize("tiny");
                openModal(<LoginForm />);
              }}
              to='/login'
              size='huge'
              inverted
              className="usr-btn"
            >
              {t("login to enter")}
            </Button>
            <Button
              onClick={() => {
                setSize("tiny");
                openModal(<RegisterForm />);
              }}
              size='huge'
              inverted
              className="usr-btn"
            >
              {t("register to enter")}
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
