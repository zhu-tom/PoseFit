import React from 'react';
import { Button, Text, View } from 'react-native';

const ExerciseScreen = ({navigation, route}) => {
  const {name, img, id} = route.params;
  
  return (
    <View>
      <Text>{name}</Text>
      <Button
        title="Try" 
        onPress={() => navigation.navigate("Analysis", {name, id})}/>
    </View>
  );
}

export default ExerciseScreen;