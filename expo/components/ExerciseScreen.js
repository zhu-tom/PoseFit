import React from 'react';
import { Button, Text, View } from 'react-native';
import {ExerciseEnum} from '../enum';


const ExerciseScreen = ({navigation, route}) => {
  const {name, img, id} = route.params;
	
  return (
    <View>
      <Text>{name}</Text>
      <Button
        title="Try" 
        onPress={() => navigation.navigate("Analysis", {name, id, ex: ExerciseEnum[name]})}/>
    </View>
  );
}

export default ExerciseScreen;