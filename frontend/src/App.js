import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
import routerInfo from 'src/constants/routerInfo';
import 'src/firebaseConfig';

import {
  Home,
  Login,
  Signup,
  Forgot,
  ForgotSent,
  GenreGames,
  Search,
  Detail,
  Profile,
  EditProfile,
  Test,
} from './pages';

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route exact path={routerInfo.PAGE_URLS.HOME} component={Home} />
            <Route path={routerInfo.PAGE_URLS.LOGIN} component={Login} />
            <Route path={routerInfo.PAGE_URLS.SIGNUP} component={Signup} />
            <Route exact path={routerInfo.PAGE_URLS.FORGOT} component={Forgot} />
            <Route path={routerInfo.PAGE_URLS.FORGOT_SENT} component={ForgotSent} />
            <Route path={routerInfo.PAGE_URLS.GAMES} component={GenreGames} />
            <Route path={routerInfo.PAGE_URLS.SEARCH} component={Search} />
            <Route path={routerInfo.PAGE_URLS.DETAIL} component={Detail} />
            <Route exact path={routerInfo.PAGE_URLS.PROFILE} component={Profile} />
            <Route path={routerInfo.PAGE_URLS.PROFILE_EDIT} component={EditProfile} />
            <Route path="/test" component={Test} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </StylesProvider>
  );
}

export default App;
