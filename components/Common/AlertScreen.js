import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
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
        <View  style={styles.container}>
            <View style={styles.alertContainer}>
                <View style={styles.textContainer}>
                    <Text style={{fontSize:25}}>{this.props.title?this.props.title:'Cập nhập thông tin'}</Text>
                    <Text>{this.props.content?this.props.content:'Bạn có muốn cập nhật thông tin không ?'}</Text>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.onCancel?this.props.onCancel():null}>
                        <Text style={{color:'white'}}>Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.onConfirm?this.props.onConfirm():null}>
                        <Text style={{color:'white'}}>Xác nhận</Text>
                    </TouchableOpacity> 
                </View>
            </View>
            

        </View >
    );
  }
}

const centerHeight=600

const styles = StyleSheet.create({
    container: {
        height: centerHeight,
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f6f6',
    },
    alertContainer:{
        height: 250,
        width: 700,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius:5,
        backgroundColor:'white',
        paddingTop: 20,
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 35,
    },
    textContainer:{
        height: 90,
        width: 700,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'white',
    },
    rowText:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize:17,
        backgroundColor:''
    },
    buttonArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button:{
        height:50,
        width:200,
        backgroundColor:'#25345D',
        borderRadius:5,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
