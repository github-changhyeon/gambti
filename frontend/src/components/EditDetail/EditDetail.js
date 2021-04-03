import React, { useEffect, useContext } from 'react';
import { UserContext } from 'src/Context/UserContext';
import styles from './EditDetail.module.css';

export default function MyDetail() {

  const user = useContext(UserContext);
  console.log(user)
  return (
    <div>
      hi
    </div>
  );
}