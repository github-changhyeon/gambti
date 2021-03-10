import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home, Account } from './pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/account" component={Account} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;