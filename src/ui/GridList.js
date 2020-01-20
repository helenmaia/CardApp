import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList
} from 'react-native';

const GridList = (props) => {
  return (
    <>
      <FlatList
        contentContainerStyle={styles.grid}
        numColumns={3}
        data={props.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          console.log(item);
          return <Text style={styles.item}>{item}</Text>
        }
        }
      />
      <Text>Ingredientes</Text>
    </>
  )
}

var styles = StyleSheet.create({
  item: {
    backgroundColor: 'grey',
    margin: 5,
    width: 90,
    padding: 8,
    color: 'white'
  },
  grid: {
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center'
  }
})

export default GridList;