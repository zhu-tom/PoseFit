import React from 'react';
import {firebaseConfig} from './firebase';
import * as firebase from 'firebase';

export const AuthContext = React.createContext(null);

export const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    firebase.initializeApp(firebaseConfig).auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
  )
}