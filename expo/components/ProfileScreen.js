import React from 'react';
import { Button, Text, View } from 'react-native';
import { auth, database } from '../firebase/firebase';

const ProfileScreen = () => {
  const [username, setUsername] = React.useState("");
  React.useEffect(() => {
    database.ref(`users/${auth.currentUser.uid}`).on("value", (snapshot) => {
      setUsername(snapshot.toJSON().username);
    });
  }, [])
  
  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 24}}>Hello, {username}</Text>
      <Text style={{fontSize: 16}}>{auth.currentUser.email}</Text>
      <Button title="Log Out" onPress={() => auth.signOut()}/>
    </View>
  )
}

export default ProfileScreen;