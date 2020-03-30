import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ListScreen extends Component  {
    render(){
    return (
        <View style={styles.headerContainer}>
            <Text>This is my List Screen</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height:200,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
