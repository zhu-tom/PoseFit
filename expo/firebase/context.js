import React from 'react';
import {auth} from './firebase';

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    console.log("here");
    auth.onAuthStateChanged(u => {
      setUser(u);
      console.log(u);
      console.log("here2");
    });
  }, []);

  return (
    <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
  )
}