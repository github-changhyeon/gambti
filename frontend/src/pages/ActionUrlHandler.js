import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import qs from 'query-string';
import JoinComplete from '../firebase/JoinComplete/JoinComplete';
import ChangePassword from '../firebase/ChangePassword/ChangePassword';


function ActionUrlHandler({ location }) {
  const query = qs.parse(location && location.search);
  const mode = query.mode;


  if (mode === 'resetPassword') {
    return <ChangePassword />;
  } else if (mode === 'verifyEmail') {
    return <JoinComplete query={query} />;
  }

}

export default ActionUrlHandler;