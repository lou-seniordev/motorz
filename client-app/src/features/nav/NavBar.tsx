import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef } from "react";
import "./Navbar.css";

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
  const rootStore = useContext(RootStoreContext);

  const { user, logout } = rootStore.userStore;

  const menuRef: any = useRef();

 

  useEffect(() => {
 
    menuRef.current.onclick = function (e: any) {
      var menu = menuRef.current.parentNode;
      console.log(menu.classList)

      if (!this.classList.contains("active")) {
        this.classList.add("active");
        menu.classList.add("open");
      } else {
        this.classList.remove("active");
        menu.classList.remove("open");
      }

      e.preventDefault();
    };

  }, []);

  // ui vertical sidebar menu   //inverted  //stackable inverted
  {/* ui */}
  return (
    <>
      <Container>
        <Menu style={{ textAlign: "center" }} fixed='top' stackable inverted pointing>
          <Menu.Item as={NavLink} exact to='/'>
            <img
              src='/assets/logo.png'
              alt='logo'
              style={{ marginRight: "10" }}
            />
            Motoranza
          </Menu.Item>
          <Responsive />
          <Menu.Item
         
            name='Motorcycle Diaries'
            exact
            as={NavLink}
            to='/activities'
          />
          <Menu.Item exact as={NavLink} to='/gallery'>
            Motofy!
          </Menu.Item>
          <Menu.Item name='forum' exact as={NavLink} to='/forum' />
          <Menu.Item name='mechanics' exact as={NavLink} to='/mechanics' />
          <Menu.Item name='market' exact as={NavLink} to='/shop' />
          <Menu.Item name='messages' exact as={NavLink} to='/messages' />
          {/* <Menu.Item name='search motoranza' /> */}
          <div className='right menu'>
            {user && (
              <Menu.Item>
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
                    <Dropdown.Item
                      onClick={logout}
                      text='Logout'
                      icon='power'
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            )}
          </div>
          <div ref={menuRef} className='hamburger '>
            <span className='hamburger-bun'></span>
            <span className='hamburger-patty'></span>
            <span className='hamburger-bun'></span>
          </div>
        </Menu>
      </Container>


      {/* <Menu fixed='top' stackable inverted>
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
         
          <Menu.Item
            name='Motorcycle Diaries'
            exact
            as={NavLink}
            to='/activities'
          />
          <Menu.Item exact as={NavLink} to='/gallery'>
            Motofy!
          </Menu.Item>
          <Menu.Item name='forum' exact as={NavLink} to='/forum' />
          <Menu.Item name='mechanics' exact as={NavLink} to='/mechanics' />
          <Menu.Item name='market' exact as={NavLink} to='/shop' />
          <Menu.Item name='messages' exact as={NavLink} to='/messages' />
          <Menu.Item name='search motoranza' />

          {user && (
            <Menu.Item>
             

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
      </Menu> */}
    </>
  );
};

export default observer(NavBar);
