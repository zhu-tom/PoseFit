import React from 'react';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from '@expo'

const DATA = [
  {
    id: 1,
    name: "Jumping Jacks",
    img: "",
  },
  {
    id: 2,
    name: "Squats",
    img: ""
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
    height: 100,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.dark,
  }
});

export default HomeScreen;