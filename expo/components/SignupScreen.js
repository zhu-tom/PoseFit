import React from 'react';
import { TextInput, Button, View, StyleSheet, Alert } from 'react-native';
import { auth, database } from '../firebase/firebase';

const SignupScreen = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = () => {
    console.log('clicked');
    auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        database.ref().child(`users/${res.user.uid}`).set({
          username,
        });
        console.log(res.user.uid);
      })
      .catch(err => {
        Alert.alert(
          "Error",
          err.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: true }
        );
      });
  }

  return (
    <View>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button title="Sign Up" onPress={() => handleSignUp()}/>
    </View> 
  )
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 5,
    fontSize: 20
  }
})

export default SignupScreen;