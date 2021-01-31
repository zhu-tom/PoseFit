import React from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from '@expo/vector-icons/AntDesign'

import squatGif from '../assets/squat.gif';
import squatImg from '../assets/squat.jpg';
import pushupGif from '../assets/pushup.gif';
import pushupImg from '../assets/pushup.png';

const DATA = [
  {
    id: 1,
    name: "Squats",
    info: "Keep your feet shoulder-width apart and get your hips to knee level bending at the waist.",
    img: squatImg,
    gif: squatGif
  },
  {
    id: 2,
    info: "Keep your feet together and body flat, bringing your chest to the ground by bringing your chest to your hands.",
    name: "Pushups",
    img: pushupImg,
    gif: pushupGif
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
          <Image source={item.img} style={{height: 80, width:100}}/>
          <Text style={{marginLeft: 10}}>{item.name}</Text>
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
    padding: 0,
    height: 80,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.dark,
  }
});

export default HomeScreen;