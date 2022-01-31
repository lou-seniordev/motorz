import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef } from "react"; 
import "./Navbar.css";

import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, Image, Menu, Popup } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { user, logout } = rootStore.userStore;

  const menuRef: any = useRef();
  

  const toggleShowMenu = (e: any) => {
    
    var actionMenu = menuRef.current.parentNode;
    var actionIcon = menuRef.current;
    actionMenu.classList.remove('active')
    actionMenu.classList.remove('open')
    actionIcon.classList.remove('active')
    actionIcon.classList.remove('open')

  };

  useEffect(() => {
    menuRef.current.onclick = function (e: any) {
      var menu = menuRef.current.parentNode;
      // console.log("menuRef", menuRef);

     

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
  return (
    <>
      <Container>
        <Menu
          style={{ textAlign: "center" }}
          fixed='top'
          stackable
          inverted
          pointing
        >
          <Menu.Item as={NavLink} exact to='/'>
            <img
              src='/assets/logo.png'
              alt='logo'
              style={{ marginRight: "10" }}
              onClick={toggleShowMenu}
            />
            Motoranza
          </Menu.Item>
          {/* <Responsive /> */}
          <Menu.Item
            name='Motorcycle Diaries'
            exact
            as={NavLink}
            to='/activities'
            onClick={toggleShowMenu}
          />
          <Menu.Item exact as={NavLink} 
            to='/gallery' 
            onClick={toggleShowMenu}>
            Motofy!
          </Menu.Item>
          <Menu.Item
            name='forum'
            exact
            as={NavLink}
            onClick={toggleShowMenu}
            to='/forum'
          />
          <Menu.Item 
            name='mechanics' 
            exact as={NavLink} 
            to='/mechanics'
            onClick={toggleShowMenu}
          />
          <Menu.Item 
            name='market' 
            exact as={NavLink} 
            onClick={toggleShowMenu}
            to='/shop' 
          />
          <Menu.Item 
            name='messages' 
            exact as={NavLink} 
            onClick={toggleShowMenu}
            to='/messages' />
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
                          onClick={toggleShowMenu}
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
                          onClick={toggleShowMenu}
                          to='/createDiary'
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
                          onClick={toggleShowMenu}
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
                          onClick={toggleShowMenu}
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
                          onClick={toggleShowMenu}
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
                      onClick={toggleShowMenu}
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
    </>
  );
};
export default observer(NavBar);


