import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef } from "react";//, useState
import "./Navbar.css";
import { useHistory } from "react-router";
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

import { useTranslation } from "react-i18next";
import i18next from "i18next";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { user, logout, isLoggedIn } = rootStore.userStore;
  const { unreadIncomingMessages, getUnreadItems } = rootStore.presenceStore;
  const { loadFeed, unseenFeedItems, feedByDate, markSeenInDB, feedMounted } =
    rootStore.feedStore;
  const { setInitialView } = rootStore.privateMessageStore;

  const { createHubConnection, stopHubConnection } = rootStore.feedStore;

  const { i18n, t } = useTranslation(["navbar"]);

  const menuRef: any = useRef();


  let history = useHistory();

  const closeStackableMenu = () => {
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
      createHubConnection();
    }
  }, [isLoggedIn, createHubConnection]);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length! > 2) {
      i18next.changeLanguage("en");
    }
    if (isLoggedIn) {
      getUnreadItems();
      loadFeed();
    }
    return () => {
      stopHubConnection();
    };
  }, [getUnreadItems, loadFeed, isLoggedIn, stopHubConnection]);

  const handleLanguageChange = (e: string) => {
    i18n.changeLanguage(e);
    closeStackableMenu();
  };

  const handleViewUnread = () => {
    closeStackableMenu();
    setInitialView();
  };

  const markSeen = async () => {
    let ids: string[] = [];
    for (var i = 0, len = feedByDate.length; i < len; i++) {
      if (feedByDate[i][1][0].isSeen === false)
        ids.push(feedByDate[i][1][0].id);
      markSeenInDB(ids);
    }
  };
  const handleViewUnseen = () => {
    // console.log("feedMounted", feedMounted);
    closeStackableMenu();
    markSeen();
    if (feedMounted) {
      history.go(0);
    } else {
      history.push(`/feed`);
    }
  };

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
                exact
                as={NavLink}
                to='/activities'
                onClick={closeStackableMenu}
              >
                {t("motorcycle diaries")}
              </Menu.Item>
              <Menu.Item
                exact
                as={NavLink}
                to='/gallery'
                onClick={closeStackableMenu}
              >
                Motofy!
              </Menu.Item>
              <Menu.Item
                exact
                as={NavLink}
                onClick={closeStackableMenu}
                to='/forum'
              >
                {" "}
                {t("forum")}
              </Menu.Item>
              <Menu.Item
                name='mechanics'
                exact
                as={NavLink}
                to='/mechanics'
                onClick={closeStackableMenu}
              >
                {t("mechanics")}
              </Menu.Item>
              <Menu.Item
                name='market'
                value='Market'
                as={Link}
                to='/shop'
                onClick={closeStackableMenu}
              >
                {" "}
                {t("market")}
              </Menu.Item>
              <Menu.Item>
                <Dropdown text={t("social")} className='icon' floating labeled>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      name='people'
                      as={Link}
                      onClick={closeStackableMenu}
                      to='/people'
                      icon='users'
                      text={t("people")}
                    />
                    <Dropdown.Item
                      name='people'
                      onClick={closeStackableMenu}
                      as={Link}
                      to='/privateMessages'
                      icon='envelope outline'
                      text={t("private messages")}
                    />
                  </Dropdown.Menu>
                </Dropdown>
                {unreadIncomingMessages > 0 && (
                  <Label
                    as={Link}
                    to='/privateMessages'
                    color='orange'
                    onClick={() => handleViewUnread()}
                  >
                    {unreadIncomingMessages}
                  </Label>
                )}
              </Menu.Item>
              <div className='right menu'>
                <Menu.Item>
                  <Dropdown text={t("new")} className='icon' floating labeled>
                    <Dropdown.Menu>
                      <Popup
                        size='mini'
                        position='right center'
                        trigger={
                          <Dropdown.Item
                            text={t("motorcycle diary")}
                            value='MotoDiary'
                            as={Link}
                            onClick={closeStackableMenu}
                            to='/createDiary'
                          />
                        }
                        content={t("motorcycle diary pop")}
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
                        content={t("motofy pop")}
                      />

                      <Popup
                        size='mini'
                        position='right center'
                        trigger={
                          <Dropdown.Item
                            text={t("mechanic shop")}
                            value='Mecanic'
                            as={Link}
                            onClick={closeStackableMenu}
                            to='/mechanicForm'
                          />
                        }
                        content={t("mechanic shop pop")}
                      />
                      <Popup
                        size='mini'
                        position='right center'
                        trigger={
                          <Dropdown.Item
                            text={t("forumpost")}
                            value='Forum'
                            as={Link}
                            onClick={closeStackableMenu}
                            to='/forumform'
                          />
                        }
                        content={t("forumpost pop")}
                      />
                      <Popup
                        size='mini'
                        position='right center'
                        trigger={
                          <Dropdown.Item
                            text={t("product to sell")}
                            value='Product'
                            as={Link}
                            onClick={closeStackableMenu}
                            to='/productform'
                          />
                        }
                        content={t("product to sell pop")}
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item>
                {user && (
                  <>
                    <Menu.Item position='right'>
                      <Dropdown pointing='top left' text={t("Select language")}>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            text={t("English")}
                            onClick={() => handleLanguageChange("en")}
                            flag='uk'
                          />
                          <Dropdown.Item
                            text={t("Italian")}
                            onClick={() => handleLanguageChange("it")}
                            flag='italy'
                          />
                          <Dropdown.Item
                            text={t("German")}
                            onClick={() => handleLanguageChange("de")}
                            flag='germany'
                          />
                          <Dropdown.Item
                            text={t("French")}
                            onClick={() => handleLanguageChange("fr")}
                            flag='france'
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    </Menu.Item>

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
                            text={t("my profile")}
                            onClick={closeStackableMenu}
                            icon='user'
                          />
                          <Dropdown.Item
                            name='feed'
                            as={Link}
                            onClick={closeStackableMenu}
                            to='/feed'
                            icon='info'
                            text='Feed'
                          />
                          <Dropdown.Item
                            onClick={logout}
                            text={t("logout")}
                            icon='power'
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                      {unseenFeedItems > 0 && (
                        <Label
                          color='orange'
                          style={{ cursor: "pointer" }}
                          onClick={() => handleViewUnseen()}
                        >
                          {unseenFeedItems}
                        </Label>
                      )}
                    </Menu.Item>
                  </>
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
