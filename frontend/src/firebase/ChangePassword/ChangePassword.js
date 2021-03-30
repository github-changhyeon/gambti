import React, { useEffect, useContext } from 'react';
import styles from './ChangePassword.module.css';
import fire from 'src/fire';
import { useHistory } from 'react-router';


export default function ChangePassword({ query }) {
  const history = useHistory();
  const auth = fire.auth;
  const actionCode = query.oobCode;
  const currentUser = fire.auth.currentUser;



}
