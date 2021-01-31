import React from 'react';
import { Text, View } from 'react-native';
import { auth } from '../firebase/firebase';

const ProfileScreen = () => {
  return (
    <View>
      <Text>{auth.currentUser.email}</Text>
    </View>
  )
}

export default ProfileScreen;