import React, { useEffect } from 'react';
import {auth} from './firebase';

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(u => {
      setUser(u);
      console.log("authstatechange");
    });
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>{children}</AuthContext.Provider>
  )
}