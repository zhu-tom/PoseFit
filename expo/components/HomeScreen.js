import React from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from '@expo/vector-icons/AntDesign'

const DATA = [
  {
    id: 1,
    name: "Squats",
    info: "Keep your feet shoulder-width apart",
    img: "squat.jpg",
    gif: "squat.gif"
  },
  {
    id: 2,
    info: "",
    name: "Pushups",
    img: "pushup.png",
    gif: "pushup.gif"
  }
];

const HomeScreen = ({ navigation }) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => navigation.navigate('Exercise', item)}
      >
        <View style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
          <Text>{item.name}</Text>
          <Icon name="right"/>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.separator}/>}
      keyExtractor={item => `${item.id}`}
    />
  );
}

const styles = StyleSheet.create({
  listItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    height: 80,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.dark,
  }
});

export default HomeScreen;