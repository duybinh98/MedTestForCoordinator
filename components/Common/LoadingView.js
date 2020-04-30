import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import {screenWidth} from './CommonFunction'

export default class ListScreen extends Component  {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleChange = this.handleChange.bind(this)
    }


    
    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        // console.log('event name'+name+', event value:'+value)
        this.setState({[name]: value});
    }


    render(){
    return (
        <ImageBackground  style={styles.headerContainer} 
            // source='https://i.imgur.com/jasoIoM.jpg'
            // resizeMode= 'center'
            resizeMode= 'stretch'
            >
            <View style={styles.textArea}>
                <Text>Hệ thống đang chạy, vui lòng đợi ...</Text>
            </View>
            

        </ImageBackground >
    );
  }
}

const centerHeight=600

const styles = StyleSheet.create({
    headerContainer: {
        height:centerHeight,
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
    },
    textArea:{
        backgroundColor:''
    }
});
