/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import '@react-navigation/native/'
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import ExerciseScreen from './components/ExerciseScreen';
import AnalysisScreen from './components/AnalysisScreen';
import * as Permissions from 'expo-permissions';


const Stack = createStackNavigator();

const App = () => {
  const [permission, askForPermission] = Permissions.usePermissions(Permissions.CAMERA, { ask: true});

  if (!permission || permission.status !== 'granted') {
    return (
      <View>
        <Text>Permission is not granted</Text>
        <Button title="Grant permission" onPress={askForPermission} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
