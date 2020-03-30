import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PageHeader from './PageHeader'

export default class ListScreen extends Component  {
    render(){
    return (
        <View style={{flex:1}}>
            <PageHeader/>
            <View style={styles.container}>
                <Text>This is my List Screen</Text>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
