import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {convertMoney} from './../Common/CommonFunction'


export default class RequestTestViewItem extends Component {
    
    componentDidMount(){
        // console.log(this.props.testID+' '+this.props.index+' '+this.props.countHide+' '+this.props.math+this.props.backgroundColor)
    }
    
    render(){
        return(
            <View style={[styles.testItem,{
                backgroundColor:this.props.backgroundColor?this.props.backgroundColor:'white',    
            }]}>
                <View style={styles.testName}>
                    <Text style={{fontSize:15,color:'#25345d'}} >{this.props.testName}</Text>
                </View>
                <View style={styles.testPrice}>
                    <Text style={{fontSize:15,color:'#25345d'}}  >{convertMoney(this.props.testPrice)}</Text>
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    testItem:{
        height:45,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //borderWidth:1,
        //borderColor:'#25345d',
    },
    testName:{
        width: 500,
        height:29,
        paddingLeft:5,
        paddingRight:5,
        paddingTop:3
    },
    testPrice:{
        width: 100,
        height:15,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom:2,
        paddingRight:10
    }

});