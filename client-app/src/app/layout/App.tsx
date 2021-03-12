import React, { Fragment, useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react'; 
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import GalleryDashboard from '../../features/gallery/dashboard/GalleryDashboard';
import MechanicDashboard from '../../features/mechanics/dashboard/MechanicDashboard';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import MerchantDashboard from '../../features/shop/dashboard/MerchantDashboard';
import MerchantDetails from '../../features/shop/details/MerchantDetails';
import NotFound from './NotFound';
import { ToastContainer } from 'react-toastify';
import LoginForm from '../../features/user/LoginForm';
import { RootStoreContext } from '../stores/rootStore';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import ProfilePage from '../../features/profiles/ProfilePage';
import GaleryDetails from '../../features/gallery/details/GaleryDetails';
import ForumDashboard from '../../features/forum/dashboard/ForumDashboard';
import ForumForm from '../../features/forum/form/ForumForm';
import ForumDetails from '../../features/forum/details/ForumDetails';
import MechanicDetails from '../../features/mechanics/details/MechanicDetails';
import MechanicForm from '../../features/mechanics/form/MechanicForm';
import GalleryForm from '../../features/gallery/form/GalleryForm';
import PrivateRoute from './PrivateRoute';

//t

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);

  if (!appLoaded) return <LoadingComponent content={'Loading app...'} />;
  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position='top-right' />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <PrivateRoute exact path='/activities' component={ActivityDashboard} />
                <PrivateRoute path='/activities/:id' component={ActivityDetails} />
                <PrivateRoute
                  key={location.key}
                  path={['/createActivity', '/manage/:id']}
                  component={ActivityForm}
                />
                <PrivateRoute exact path='/gallery' component={GalleryDashboard} />
                <PrivateRoute path='/gallery/:id' component={GaleryDetails} />
                <PrivateRoute
                  path={['/galleryForm', '/manageGallery/:id']}
                  key={location.key}
                  component={GalleryForm}
                />
                <PrivateRoute exact path='/forum' component={ForumDashboard} />
                <PrivateRoute exact path='/forum/:id' component={ForumDetails} />
                <PrivateRoute
                  key={location.key}
                  path={['/forumform', '/manageForum/:id']}
                  component={ForumForm}
                />
                <PrivateRoute exact path='/mechanics' component={MechanicDashboard} />
                <PrivateRoute path='/mechanics/:id' component={MechanicDetails} />
                <PrivateRoute
                  key={location.key}
                  path={['/mechanicForm', '/manageMechanic/:id']}
                  component={MechanicForm}
                />
                <PrivateRoute path='/merchant' component={MerchantDashboard} />
                <PrivateRoute path='/merchant/:id' component={MerchantDetails} />
                <PrivateRoute path='/profile/:username' component={ProfilePage} />
                <Route path='/login' component={LoginForm} />
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
