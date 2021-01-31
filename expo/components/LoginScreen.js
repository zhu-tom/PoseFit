import React from 'react';
import { Button, TextInput, View } from 'react-native';
import * as firebase from 'firebase';

const LoginScreen = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <View>
      <TextInput
        value={username}
        autoCompleteType="username"
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        value={password}
        autoCompleteType="password"
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Log In" onPress={() => handleLogin()}/>
    </View>
  )
}

export default LoginScreen;