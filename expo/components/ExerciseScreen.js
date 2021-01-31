import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ExerciseScreen = ({navigation, route}) => {
  const {name, img, id} = route.params;
  
  return (
    <View style={styles.container}>
      <View style={{width: '100%', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <Text style={styles.title}>{name}</Text>

      </View>
      <View style={{height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Try" 
          onPress={() => navigation.navigate("Analysis", {name, id})}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
  }
})

export default ExerciseScreen;