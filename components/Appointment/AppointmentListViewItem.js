import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime, getAppointmentStateName, getStateColor} from './../Common/CommonFunction'


export default class AppointmentListView extends Component {
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
                style={styles.appointmentListItem}
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
                <View style={[styles.appointmentTextContainer,{
                    marginTop:5,
                }]}>                    
                    <View>
                    <Text style={{fontSize:17}}>#{this.props.appointmentId}</Text>
                    </View>
                </View>   
                <View style={styles.appointmentTextContainer}>
                    <View style={styles.appointmentListFirstColumnContainer}>
                    <Text style={{fontSize:17}}>{this.props.customerName}</Text>
                    </View>
                    <View style={[styles.appointmentListSecondColumnContainer,{
                        borderRadius:1,
                        borderStyle: 'dashed',
                    }]}>
                    <Text style={{fontSize:17}}>{convertDateTimeToDate(this.props.appointmentCreatedTime)+"   "+convertDateTimeToTime(this.props.appointmentCreatedTime)}</Text>                    
                    </View>
                    <View>
                    <Text style={{fontSize:15}}>Khung giờ hẹn: {convertDateTimeToTime(this.props.appointmentMeetingTime)}</Text>
                    </View>
                </View>     
                <View style={[styles.appointmentTextContainer,{marginBottom:10}]}>
                    <View style={styles.appointmentListFirstColumnContainer}>
                    <Text style={{fontSize:17}}>Số điện thoại:  {this.props.customerPhoneNumber}</Text>
                    </View>
                    <View style={styles.appointmentListSecondColumnContainer}>
                    <Text style={{fontSize:17,color:'#0c59cf'}}>{getAppointmentStateName(this.props.appointmentStatus)}</Text>
                    </View>
                    <View>
                    <Text style={{fontSize:15}}>Ngày hẹn: {convertDateTimeToDate(this.props.appointmentMeetingTime)}</Text>
                    </View>
                    
                </View>                   
            </TouchableOpacity>             
            </View> 
        );
    }
}
const styles = StyleSheet.create({
    appointmentListItem:{
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
    appointmentTextContainer:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-400,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:3,
        paddingTop:3,
    },
    appointmentListFirstColumnContainer:{
        width:250,
    },
    appointmentListSecondColumnContainer:{
        width:200,
        marginLeft:20,
        marginRight:50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
    }

});