import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import GalleryDashboard from "../../features/gallery/dashboard/GalleryDashboard";
import MechanicDashboard from "../../features/mechanics/dashboard/MechanicDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
// import MerchantDashboard from '../../features/shop/dashboard/MerchantDashboard';
import ProductDetails from "../../features/shop/details/ProductDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import LoginForm from "../../features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";
import GaleryDetails from "../../features/gallery/details/GaleryDetails";
import ForumDashboard from "../../features/forum/dashboard/ForumDashboard";
import ForumForm from "../../features/forum/form/ForumForm";
import ForumDetails from "../../features/forum/details/ForumDetails";
import MechanicDetails from "../../features/mechanics/details/MechanicDetails";
import MechanicForm from "../../features/mechanics/form/MechanicForm";
import GalleryForm from "../../features/gallery/form/GalleryForm";
import PrivateRoute from "./PrivateRoute";
import ConfirmDelete from "../../features/gallery/modals/ConfirmDelete";
import ProductDashboard from "../../features/shop/dashboard/ProductDashboard";
import MessagesDashboard from "../../features/messages/dashboard/MessagesDashboard";
import ProductForm from "../../features/shop/forms/ProductForm";
import MessageThreadListItem from "../../features/messages/dashboard/MessageThreadListItem";
import FeedDashboard from "../../features/feed/dashboard/FeedDashboard";
import PeopleDashboard from "../../features/people/dashboard/PeopleDashboard";
import DiaryEntryForm from "../../features/activities/form/DiaryEntryForm";
import PrivateMessagesDashboard from "../../features/private_messages/PrivateMessagesDashboard";

//t

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token && !appLoaded) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token, appLoaded]);

  if (!appLoaded) return <LoadingComponent content={"Loading app..."} />;
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='top-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <PrivateRoute
                  exact
                  path='/activities'
                  component={ActivityDashboard}
                />
                <PrivateRoute
                  path='/activities/:id'
                  component={ActivityDetails}
                />
                <PrivateRoute
                  key={location.key}
                  path={["/createDiary", "/manage/:id"]}
                  component={ActivityForm}
                />
                <PrivateRoute
                  key={location.key}
                  path={["/createDiaryEntry/:activityId", "/manageDiaryEntry/:id/:activityId"]}
                  component={DiaryEntryForm}
                />

                <PrivateRoute
                  exact
                  path='/gallery'
                  component={GalleryDashboard}
                />
                <PrivateRoute path='/gallery/:id' component={GaleryDetails} />
                <PrivateRoute
                  path={["/galleryForm", "/manageGallery/:id"]}
                  key={location.key}
                  component={GalleryForm}
                />
                <PrivateRoute exact path='/forum' component={ForumDashboard} />
                <PrivateRoute
                  exact
                  path='/forum/:id'
                  component={ForumDetails}
                />
                <PrivateRoute
                  key={location.key}
                  path={["/forumform", "/manageForum/:id"]}
                  component={ForumForm}
                />
                <PrivateRoute
                  exact
                  path='/mechanics'
                  component={MechanicDashboard}
                />
                <PrivateRoute
                  path='/mechanics/:id'
                  component={MechanicDetails}
                />
                <PrivateRoute
                  key={location.key}
                  path={["/mechanicForm", "/manageMechanic/:id"]}
                  component={MechanicForm}
                />

                <PrivateRoute exact path='/shop' component={ProductDashboard} />
                <PrivateRoute path='/product/:id' component={ProductDetails} />
                <PrivateRoute
                  key={location.key}
                  path={["/productForm", "/manageProduct/:id"]}
                  component={ProductForm}
                />

                <PrivateRoute
                  exact
                  path='/messages'
                  component={MessagesDashboard}
                />
                <PrivateRoute
                  exact
                  path='/messageThread/:id'
                  component={MessageThreadListItem}
                />
                <PrivateRoute
                  exact
                  path='/privateMessages'
                  component={PrivateMessagesDashboard}
                />
                {/* <PrivateRoute
                  exact
                  path='/privateMessageThread/:id'
                  component={MessageThreadListItem}
                /> */}

                <PrivateRoute exact path='/feed' component={FeedDashboard} />
                <PrivateRoute
                  exact
                  path='/people'
                  component={PeopleDashboard}
                />

                <PrivateRoute
                  path='/profile/:username'
                  component={ProfilePage}
                />
                <Route path='/login' component={LoginForm} />
                <Route path='/confirmDelete' component={ConfirmDelete} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
