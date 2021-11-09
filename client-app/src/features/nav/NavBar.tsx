import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Responsive,
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const createOptions = [
    {
      key: "Mecanic",
      text: "Mecanics Shop",
      value: "Mecanic",
      as: Link,
      to: "/mechanicForm",
    },
    {
      key: "Riding",
      text: "Riding Route",
      value: "Riding",
      as: Link,
      to: "/createActivity",
    },
    {
      key: "Post",
      text: "Motofy!",
      value: "Post",
      as: Link,
      to: "/galleryForm",
    },
    {
      key: "Forum",
      text: "Forum Post",
      value: "Forum",
      as: Link,
      to: "/forumform",
    },
  ];
  const rootStore = useContext(RootStoreContext);

  const { user, logout } = rootStore.userStore;

  return (
    <Menu fixed='top' stackable inverted>
      {/* pointing secondary */}
      <Container>
        <Menu.Item as={NavLink} exact to='/'>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: "10" }}
          />
          Motoranza
        </Menu.Item>
        <Responsive />
        {/* ex gallery */}
        {/* name='motofy'  */}
        <Menu.Item name='moto sessions' exact as={NavLink} to='/activities' />
        <Menu.Item exact as={NavLink} to='/gallery' >Motofy!</Menu.Item>
        {/* <Menu.Item name='motospots' exact as={NavLink} to='/activities' /> */}
        <Menu.Item name='moto forum' exact as={NavLink} to='/forum' />
        <Menu.Item name='moto mechanics' exact as={NavLink} to='/mechanics' />
        <Menu.Item name='moto shopping' exact as={NavLink} to='/merchant' />
        {user && (
          <Menu.Item>
            <Dropdown
              button
              item
              className='icon'
              floating
              labeled
              icon='world'
              options={createOptions}
              // search // no, because it does not close
              text='Create'
            />
          </Menu.Item>
        )}
        {user && (
          <Menu.Item position='right'>
            <Image
              avatar
              spaced='right'
              src={user.image || "/assets/user.png"}
            />
            <Dropdown pointing='top left' text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.userName}`}
                  text='My profile'
                  icon='user'
                />
                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
