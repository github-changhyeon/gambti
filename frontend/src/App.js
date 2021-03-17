import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import Header from 'src/components/Header/Header';
import Footer from 'src/components/Footer/Footer';
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
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/forgot" component={Forgot} />
            <Route path="/forgot/sent" component={ForgotSent} />
            <Route path="/games/:genre" component={GenreGames} />
            <Route path="/search" component={Search} />
            <Route path="/detail/:gameName" component={Detail} />
            <Route exact path="/profiles/:id" component={Profile} />
            <Route path="/profiles/:id/edit" component={EditProfile} />
            <Route path="/test" component={Test} />
          </Switch>
        </Router>
        <Footer />
      </div>
    </StylesProvider>
  );
}

export default App;
