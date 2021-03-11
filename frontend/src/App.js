import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {
  Home,
  Account,
  Forgot,
  ForgotSent,
  GenreGames,
  Search,
  Detail,
  Profile,
  EditProfile,
} from './pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/account" component={Account} />
          <Route exact path="/forgot" component={Forgot} />
          <Route path="/forgot/sent" component={ForgotSent} />
          <Route path="/games/:genre" component={GenreGames} />
          <Route path="/search" component={Search} />
          <Route path="/detail/:gameName" component={Detail} />
          <Route exact path="/profiles/:id" component={Profile} />
          <Route path="/profiles/:id/edit" component={EditProfile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
