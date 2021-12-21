import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Container,
  Dropdown,
  Image,
  Menu,
  Responsive,
  Popup,
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  // const createOptions = [
  //   {
  //     key: "Mecanic",
  //     text: "Mecanics Shop",
  //     value: "Mecanic",
  //     as: Link,
  //     to: "/mechanicForm",
  //   },
  //   {
  //     key: "MotoDiary",
  //     text: "What are you up tu?",
  //     value: "MotoDiary",
  //     as: Link,
  //     to: "/createActivity",
  //   },
  //   {
  //     key: "Post",
  //     text: "Motofy!",
  //     value: "Post",
  //     as: Link,
  //     to: "/galleryForm",
  //   },
  //   {
  //     key: "Forum",
  //     text: "Forum Post",
  //     value: "Forum",
  //     as: Link,
  //     to: "/forumform",
  //   },
  //   {
  //     key: "Product",
  //     text: "Sell Product",
  //     value: "Product",
  //     as: Link,
  //     to: "/productform",
  //   },
  // ];
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
        <Menu.Item
          name='Motorcycle Diaries'
          exact
          as={NavLink}
          to='/activities'
        />
        <Menu.Item exact as={NavLink} to='/gallery'>
          Motofy!
        </Menu.Item>
        {/* <Menu.Item name='motospots' exact as={NavLink} to='/activities' /> */}
        <Menu.Item name='forum' exact as={NavLink} to='/forum' />
        <Menu.Item name='find mechanics' exact as={NavLink} to='/mechanics' />
        <Menu.Item name='market' exact as={NavLink} to='/shop' />
        {/* exact as={NavLink} to='/shop' */}
        <Menu.Item name='messages' exact as={NavLink} to='/messages' />
        <Menu.Item name='search motoranza' />

        {user && (
          <Menu.Item>
            {/* <Dropdown
              text='New'
              button
              item
              className='icon'
              floating
              labeled
              icon='world'
              options={createOptions}
              // search // no, because it does not close
            /> */}

            <Dropdown text='New' className='icon' floating labeled>
              <Dropdown.Menu>
                <Popup
                  size='mini'
                  position='right center'
                  trigger={
                    <Dropdown.Item
                      text='Mecanics Shop'
                      value='Mecanic'
                      as={Link}
                      to='/mechanicForm'
                    />
                  }
                  content='Let us know about your shop or recommend a mecanic that you know about'
                />
                <Popup
                  size='mini'
                  position='right center'
                  trigger={
                    <Dropdown.Item
                      text='Motorcycle Diary'
                      value='MotoDiary'
                      as={Link}
                      to='/createActivity'
                    />
                  }
                  content='Show us what you do, where you go? Find brothers and sisters to ride together...'
                />

                <Popup
                  size='mini'
                  position='right center'
                  trigger={
                    <Dropdown.Item
                      text='Motofy!'
                      value='Motofy'
                      as={Link}
                      to='/galleryForm'
                    />
                  }
                  content='Everybody wants to see a great photo of your bike. Tell us more about it'
                />
                <Popup
                  size='mini'
                  position='right center'
                  trigger={
                    <Dropdown.Item
                      text='Forum post'
                      value='Forum'
                      as={Link}
                      to='/forumform'
                    />
                  }
                  content='Ask about anything. Some one from community will have the right answer'
                />
                <Popup
                  size='mini'
                  position='right center'
                  trigger={
                    <Dropdown.Item
                      text='Product to sell'
                      value='Product'
                      as={Link}
                      to='/productform'
                    />
                  }
                  content='Post and item that you want to sell'
                />
              </Dropdown.Menu>
            </Dropdown>
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
