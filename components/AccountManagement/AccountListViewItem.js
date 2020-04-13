import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime, getAppointmentStateName, getStateColor} from './../Common/CommonFunction'


export default class AccountListViewItem extends Component {
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
                style={styles.accountListItem}
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
                <View style={styles.accountNameContainer}>                                       
                <Text style={{fontSize:17}}>{this.props.accountName}</Text>
                </View>
                <View style={styles.accountPhoneContainer}>                                       
                <Text style={{fontSize:17}}>{this.props.accountPhoneNumber}</Text>
                </View>
                <View style={styles.accountRoleContainer}>                                       
                <Text style={{fontSize:17}}>{this.props.accountRole}</Text>  
                </View>
                     
            </TouchableOpacity>             
            </View> 
        );
    }
}
const styles = StyleSheet.create({
    accountListItem:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-400,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom:2,  
    },
    accountNameContainer:{
        margin:10,
        width:350,
        alignItems: 'center',
        marginRight:150,
    },
    accountPhoneContainer:{
        margin:10,
        width:200,
        marginRight:100,
        alignItems: 'center',
    },
    accountRoleContainer:{
        margin:10,
        width:200,
        alignItems: 'center',
    },

});