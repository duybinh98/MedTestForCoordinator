import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime, getAppointmentStateName, getStateColor} from './../Common/CommonFunction'


export default class AppointmentListView extends Component {
    constructor(props) {
        super(props)
        this.state = {            
        };
        this.onAppointmentPress = this.onAppointmentPress.bind(this)
    }
    componentDidMount(){
          
    }


    onAppointmentPress(){
        const appointment= { 
            "appointmentId": this.props.appointmentId,
            "appointmentCreatedTime":this.props.appointmentCreatedTime,
            "customerName":this.props.customerName,
            "customerPhoneNumber":this.props.customerPhoneNumber,
            "customerDOB":this.props.customerDOB,
            "appointmentMeetingTime":this.props.appointmentMeetingTime,
            "appointmentStatus":this.props.appointmentStatus,
            }
            
        this.props.setSelectedAppointment?this.props.setSelectedAppointment(appointment):null
        this.props.changeShowView?this.props.changeShowView('AppointmentView'):null
    }


    render(){        
        return(
            <View>            
            <TouchableOpacity 
                style={styles.appointmentListItem}
                onPress={() => this.onAppointmentPress()}
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