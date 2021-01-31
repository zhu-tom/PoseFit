import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ProfileScreen from './ProfileScreen';

const Stack = createStackNavigator();

const ProfileTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Profile" 
        options={{title: "Profile"}} 
        component={ProfileScreen}/>
    </Stack.Navigator>
  );
}

export default ProfileTab;