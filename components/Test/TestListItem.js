import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, TextInput} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime, getAppointmentStateName, getStateColor, componentWidth} from './../Common/CommonFunction'


export default class TestListView extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            testPrice: this.props.testPrice,
        };
        this.handleChange = this.handleChange.bind(this)
    }


    componentDidMount(){
          
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                testPrice: this.props.testPrice
            }));
        }
    }

    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        // console.log('event name'+name+', event value:'+value)
        this.props.updatePrice?this.props.updatePrice(this.props.testId,value):null
        this.setState({[name]: value});
    }


    render(){        
        return(        
            <View style={styles.testListItem}>  
                <View style={[styles.testTextContainer,{marginTop:5,}]}>  
                    <View style={styles.testListFirstColumnContainer}>
                        <Text style={{fontSize:17,fontWeight:'bold'}}>Loại Test: </Text>
                    </View>
                    <View style={styles.testListSecondColumnContainer}>
                        <Text style={{fontSize:17}}>{this.props.testTypeName}</Text>
                    </View>
                </View>                               
                <View style={styles.testTextContainer}>           
                    <View style={styles.testListFirstColumnContainer}>
                        <Text style={{fontSize:17,fontWeight:'bold'}}>Tên Test: </Text>
                    </View>
                    <View style={styles.testListSecondColumnContainer}>
                        <Text style={{fontSize:17}}>{this.props.testName}</Text>
                    </View>
                </View>   
                <View style={[styles.testTextContainer,{marginBottom:10}]}>
                    <View style={styles.testListFirstColumnContainer}>
                        <Text style={{fontSize:17,fontWeight:'bold'}}>Giá tiền: </Text>
                    </View>
                    <TextInput style={styles.rowTextInput}
                        placeholder={'nhập giá tiền (VNĐ)'}
                        name={"testPrice"}
                        onChange={this.handleChange}
                        value={this.state.testPrice.toString()}
                        >   
                    </TextInput>
                </View>                     
            </View>      
        );
    }
}

const styles = StyleSheet.create({
    testListItem:{
        alignSelf: 'stretch',
        width: componentWidth,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom:2,       
        borderRadius:10,
        marginBottom:20, 
    },
    testTextContainer:{
        alignSelf: 'stretch',
        width: componentWidth,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft:20,
        paddingRight:10,
        paddingBottom:5,
        paddingTop:5,
    },
    testListFirstColumnContainer:{
        width:100,
    },
    testListSecondColumnContainer:{
        width:500,
    },
    rowTextInput:{
        alignSelf: 'stretch',
        padding:3,
        width: 100,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:5,
        paddingLeft:10,        
    },

});