import React, { createContext } from 'react';
import fire from 'src/fire';

const FirebaseContext = createContext();

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={fire}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider }