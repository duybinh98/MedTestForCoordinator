import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime, getStateName, getStateColor} from './../Common/CommonFunction'

export default class RequestListPendingItem extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            // appointment_date: convertDateTimeToDate(this.props.appoint_date),
            // appointment_time: convertDateTimeToTime(this.props.appoint_date),
        };
    }
    componentDidMount(){
          
    }



    render(){        
        return(
            <View>            
            <TouchableOpacity 
                style={styles.requestListItem}
                // onPress={() => {
                //     this.props.navigation.dispatch(
                //         CommonActions.navigate({
                //             name: 'RequestViewScreen',
                //             params: {
                //                 requestId: this.props.requestId,
                //                 name: this.props.cust_name,
                //                 address: this.props.appoint_address,
                //                 phone: this.props.cust_phone,
                //                 dob: this.props.cust_DOB,
                //                 date: this.props.appoint_date,
                //                 selectedTest: this.props.selectedTest,   
                //                 status: this.props.req_status,
                //                 testsList: this.props.testList,
                //                 totalAmount: this.props.req_amount,
                //                 nurseName: this.props.nurse_name,
                //             },
                //         })
                //     )
                // }}
            
            >                                
                <View style={[styles.requestListTextContainer,{
                    marginTop:5,
                }]}>                    
                    <View>
                    <Text style={{fontSize:17}}>#{this.props.requestId}</Text>
                    </View>
                </View>   
                <View style={styles.requestListTextContainer}>
                    <View style={styles.requestListFirstColumnContainer}>
                    <Text style={{fontSize:17}}>{this.props.customerName}</Text>
                    </View>
                    <View style={[styles.requestListSecondColumnContainer,{
                        borderRadius:1,
                        borderStyle: 'dashed',
                    }]}>
                    <Text style={{fontSize:17}}>{convertDateTimeToDate(this.props.requestCreatedTime)+"   "+convertDateTimeToTime(this.props.requestCreatedTime)}</Text>                    
                    </View>
                    <View>
                    <Text style={{fontSize:16}}>{this.props.requestAddress+', '+this.props.requestTownName+', '+this.props.requestDistrictName}</Text>
                    </View>
                </View>     
                <View style={[styles.requestListTextContainer,{marginBottom:10}]}>
                    <View style={styles.requestListFirstColumnContainer}>
                    <Text style={{fontSize:17}}>Số điện thoại:  {this.props.customerPhoneNumber}</Text>
                    </View>
                    <View style={styles.requestListSecondColumnContainer}>
                    <Text style={{fontSize:17,color:'#0c59cf'}}>{getStateName(this.props.requestStatus)}</Text>
                    </View>
                    
                </View>                   
            </TouchableOpacity>             
            </View> 
        );
    }
}
const styles = StyleSheet.create({
    requestListItem:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-400,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom:2,       
        borderRadius:10,
        marginBottom:20, 
    },
    requestListTextContainer:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-400,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:3,
        paddingTop:3,
    },
    requestListFirstColumnContainer:{
        width:250,
    },
    requestListSecondColumnContainer:{
        width:200,
        marginLeft:20,
        marginRight:50,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
    }

});