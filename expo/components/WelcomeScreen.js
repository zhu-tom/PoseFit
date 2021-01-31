import React from 'react';
import { Button, Text, View } from 'react-native';

const WelcomeScreen = ({navigation}) => {
  return (
    <View>
      <Text>Welcome to the App</Text>
      <Button title="Log In" onPress={() => navigation.navigate("Login")}/>
      <Button title="Sign Up" onPress={() => navigation.navigate("Signup")}/>
    </View>
  )
}

export default WelcomeScreen;