import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import {ExerciseEnum} from '../enum';


const ExerciseScreen = ({navigation, route}) => {
  const {name, gif, info, id} = route.params;
  
  return (
    <View style={styles.container}>
      <Image source={gif} style={{height: 200, width: '100%'}}/>
      <View style={{width: '100%', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
        <Text style={styles.title}>{name}</Text>
        <Text>{info}</Text>
      </View>
      <View style={{height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button
          title="Try" 
          onPress={() => navigation.navigate("Analysis", {name, id, ex: ExerciseEnum[name]})}
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