import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef } from "react";
import "./Navbar.css";

import { Link, NavLink } from "react-router-dom";
import {
  Container,
  Dropdown,
  Image,
  Label,
  Menu,
  Popup,
} from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { user, logout, isLoggedIn } = rootStore.userStore;
  const { unreadPrivateMessages, getUnreadPrivate } =
    rootStore.privateMessageStore;
  const { unreadProductMessages, getUnreadProduct } = rootStore.messageStore;

  const menuRef: any = useRef();

  const closeStackableMenu = (e: any) => {
    var actionMenu = menuRef.current.parentNode;
    var actionIcon = menuRef.current;
    actionMenu.classList.remove("active");
    actionMenu.classList.remove("open");
    actionIcon.classList.remove("active");
    actionIcon.classList.remove("open");
  };

  useEffect(() => {
    if (isLoggedIn) {
      menuRef.current.onclick = function (e: any) {
        var menu = menuRef.current.parentNode;

        if (!this.classList.contains("active")) {
          this.classList.add("active");
          menu.classList.add("open");
        } else {
          this.classList.remove("active");
          menu.classList.remove("open");
        }

        e.preventDefault();
      };
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      setInterval(() => {
        getUnreadPrivate();
        getUnreadProduct();
      }, 2000);
    }
  }, [getUnreadPrivate, getUnreadProduct]);

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
              onClick={closeStackableMenu}
            />
            Motoranza
          </Menu.Item>

          {isLoggedIn && (
            <>
              <Menu.Item
                name='Motorcycle Diaries'
                exact
                as={NavLink}
                to='/activities'
                onClick={closeStackableMenu}
              />
              <Menu.Item
                exact
                as={NavLink}
                to='/gallery'
                onClick={closeStackableMenu}
              >
                Motofy!
              </Menu.Item>
              <Menu.Item
                name='forum'
                exact
                as={NavLink}
                onClick={closeStackableMenu}
                to='/forum'
              />
              <Menu.Item
                name='mechanics'
                exact
                as={NavLink}
                to='/mechanics'
                onClick={closeStackableMenu}
              />
              <Menu.Item>
                <Dropdown text='Social' className='icon' floating labeled>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      name='people'
                      text='People'
                      // exact
                      as={Link}
                      onClick={closeStackableMenu}
                      to='/people'
                    />
                    <Dropdown.Item
                      name='people'
                      text='Private messages'
                      onClick={closeStackableMenu}
                      as={Link}
                      to='/privateMessages'
                    />
                    <Dropdown.Item
                      name='feed'
                      text='Feed'
                      // exact
                      as={Link}
                      onClick={closeStackableMenu}
                      to='/feed'
                    />
                  </Dropdown.Menu>
                </Dropdown>
                {unreadPrivateMessages > 0 && (
                  <Label
                    as={Link}
                    to='/privateMessages'
                    color='orange'
                    onClick={closeStackableMenu}
                  >
                    {unreadPrivateMessages}
                  </Label>
                )}
              </Menu.Item>
              <Menu.Item>
                <Dropdown text='Shop' className='icon' floating labeled>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      name='market'
                      text='Motoranza market'
                      // exact
                      value='Market'
                      as={Link}
                      to='/shop'
                      onClick={closeStackableMenu}
                    />
                    <Dropdown.Item
                      name='messages'
                      text='Market messages'
                      // exact
                      value='Messages'
                      as={Link}
                      to='/messages'
                      onClick={closeStackableMenu}
                    />
                  </Dropdown.Menu>
                </Dropdown>
                {unreadProductMessages > 0 && (
                  <Label
                    as={Link}
                    to='/messages'
                    color='orange'
                    onClick={closeStackableMenu}
                  >
                    {unreadProductMessages}
                  </Label>
                )}
              </Menu.Item>
              <div className='right menu'>
                {/* {user && ( */}
                <Menu.Item>
                  <Dropdown text='New' className='icon' floating labeled>
                    <Dropdown.Menu>
                      <Popup
                        size='mini'
                        position='right center'
                        trigger={
                          <Dropdown.Item
                            text='Motorcycle Diary'
                            value='MotoDiary'
                            as={Link}
                            onClick={closeStackableMenu}
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
                            onClick={closeStackableMenu}
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
                            text='Mecanics Shop'
                            value='Mecanic'
                            as={Link}
                            onClick={closeStackableMenu}
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
                            text='Forum post'
                            value='Forum'
                            as={Link}
                            onClick={closeStackableMenu}
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
                            onClick={closeStackableMenu}
                            to='/productform'
                          />
                        }
                        content='Post and item that you want to sell'
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
                {/* )}*/}
                {user && (
                  <Menu.Item position='right'>
                    <Image
                      avatar
                      spaced='right'
                      src={user!.image || "/assets/user.png"}
                    />
                    <Dropdown pointing='top left' text={user!.displayName}>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          to={`/profile/${user!.userName}`}
                          text='My profile'
                          onClick={closeStackableMenu}
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
            </>
          )}
        </Menu>
      </Container>
    </>
  );
};
export default observer(NavBar);
