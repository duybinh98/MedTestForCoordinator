import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListScreen from './components/ListScreen'

export default function App() {
  return (
      <ListScreen/>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
