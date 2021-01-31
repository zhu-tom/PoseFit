import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './HomeScreen';
import ExerciseScreen from './ExerciseScreen';
import AnalysisScreen from './AnalysisScreen';

const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: "Home"}}
        />
        <Stack.Screen
          name="Exercise"
          component={ExerciseScreen}
        />
        <Stack.Screen
          name="Analysis"
          component={AnalysisScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default HomeTab;