import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import Header from 'src/components/Header/Header';
import Nav from 'src/components/Nav/Nav';
import Footer from 'src/components/Footer/Footer';
import routerInfo from 'src/constants/routerInfo';
import 'src/fire';
import { UserContext, UserProvider } from 'src/Context/UserContext';
import { FirebaseProvider } from 'src/Context/FirebaseContext';

import {
  Home,
  Login,
  Signup,
  CheckGambti,
  CheckInfo,
  EmailConfirm,
  Forgot,
  ForgotSent,
  GenreGames,
  Search,
  Detail,
  Profile,
  EditProfile,
  Test,
  NoAccess,
  Loading
} from './pages';


const AppRouter = () => {
  const user = useContext(UserContext);
  return user.isLoggedIn === null ? (
    <Loading />
  ) : user.isLoggedIn ? (
    user.emailVerified ? (<MainRouter />) : (<EmailConfirm />)) : (< NotLogin />);
};


const NotLogin = () => {

  return (
    <Router>
      <Header />
      <Nav />
      <div style={{ paddingLeft: '64px' }}>
        <Switch>
          <Route exact path={routerInfo.PAGE_URLS.HOME} component={Home} />
          <Route path={routerInfo.PAGE_URLS.LOGIN} component={Login} />
          <Route path={routerInfo.PAGE_URLS.SIGNUP} component={Signup} />
          <Route path={routerInfo.PAGE_URLS.CHECK_INFO} component={CheckInfo} />
          <Route path={routerInfo.PAGE_URLS.CHECK_GAMBTI} component={CheckGambti} />
          <Route exact path={routerInfo.PAGE_URLS.FORGOT} component={Forgot} />
          <Route path={routerInfo.PAGE_URLS.FORGOT_SENT} component={ForgotSent} />
          <Route path={routerInfo.PAGE_URLS.GAMES} component={GenreGames} />
          <Route path={routerInfo.PAGE_URLS.SEARCH} component={Search} />
          <Route path={routerInfo.PAGE_URLS.DETAIL} component={Detail} />
          <Route exact path={routerInfo.PAGE_URLS.PROFILE} component={Profile} />
          <Route path="/test" component={Test} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

const MainRouter = () => {
  const user = useContext(UserContext);

  return (
    <Router>
      <Header />
      <Nav />
      <div style={{ paddingLeft: '64px' }}>
        <Switch>
          <Route exact path={routerInfo.PAGE_URLS.HOME} component={Home} />
          <Route path={routerInfo.PAGE_URLS.GAMES} component={GenreGames} />
          <Route path={routerInfo.PAGE_URLS.SEARCH} component={Search} />
          <Route path={routerInfo.PAGE_URLS.DETAIL} component={Detail} />
          <Route exact path={routerInfo.PAGE_URLS.PROFILE} component={Profile} />
          <Route path={routerInfo.PAGE_URLS.PROFILE_EDIT} component={EditProfile} />
          <Route path="/test" component={Test} />
        </Switch>
        <Footer />
      </div>
    </Router >
  )
}




function App() {
  return (
    <StylesProvider injectFirst>
      <FirebaseProvider>
        <UserProvider>
          <div className="App">
            <AppRouter />
          </div>
        </UserProvider>
      </FirebaseProvider>
    </StylesProvider>
  );
}

export default App;
