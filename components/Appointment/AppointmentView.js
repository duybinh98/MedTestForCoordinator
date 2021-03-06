import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime, getApiUrl, getAppointmentStateName, componentWidth} from './../Common/CommonFunction'
import AlertScreen from './../Common/AlertScreen'

export default class AppointmentView extends Component  {
    constructor(props) {
        super(props)
        this.state = {     
            error: '',
            acceptAppointmentApi: true,
        };
        this.onAccept = this.onAccept.bind(this)
        this.onReject = this.onReject.bind(this)
        this.callApiAcceptAppointment = this.callApiAcceptAppointment.bind(this)
        
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 

            }));
        }
    }
    
    callApiDetail(){
        fetch(getApiUrl()+"/appointments/detail/"+this.props.appointment.appointmentId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+this.props.token,
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result)
                let success = false
                result ? result.message? null : success=true : null;
                if (success) {
                    let appointment = this.props.appointment
                    appointment.appointmentStatus = result.appointment_status
                    this.props.setSelectedAppointment(appointment)
                }
            },            
            (error) => {
                // console.log(error)
            }
        )  
    }
    
    callApiAcceptAppointment(){
        if(this.state.acceptAppointmentApi){
            this.setState({acceptAppointmentApi:false})
            fetch(getApiUrl()+"/appointments/accept/"+this.props.appointment.appointmentId, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.props.token,
                },
                body: JSON.stringify({
                    status: 'accepted',
                    coordinatorID: this.props.userInfo.id,
                    note: 'ok',
                }),
                })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({acceptAppointmentApi:true})
                    // console.log(result)
                    let success = false
                    result ? result.message? result.message=="Xác nhận đặt cuộc hẹn thành công!" ? success=true : null : null :null;
                    if (success) {
                        let appointment = this.props.appointment
                        appointment.appointmentStatus = 'accepted'
                        this.props.setSelectedAppointment(appointment)
                        // this.props.changeShowView('AppointmentView')
                    }
                    else
                        this.setState({error: result.message})
                        this.callApiDetail()
                },            
                (error) => {
                    this.setState({acceptAppointmentApi:true})
                    // console.log(error)
                }
            )  
        }
        
    }

    onAccept(){
        this.callApiAcceptAppointment()
    }

    onReject(){
        this.props.changeShowView('AppointmentRejectView')
    }



    render(){
    return (
        <View style={styles.appointmentViewArea}>
            <View style={styles.appointmentTopMenuArea}>
                <Text style={{fontSize:25}}>Chi tiết đơn khám</Text>                
            </View>
            <View style={styles.appointmentArea}>
                <View style={styles.appointmentContainer}>      
                    <View style={styles.appointmentRowContainer}>
                            <Text style={styles.rowText}>Mã đơn xét khám: </Text> 
                            <Text style={styles.rowTextLong}>{this.props.appointment?this.props.appointment.appointmentId:''}</Text> 
                    </View>
                    <View style={styles.appointmentRowContainer}>
                            <Text style={styles.rowText}>Giờ tạo:</Text>   
                            <Text style={styles.rowTextLong}>{this.props.appointment?convertDateTimeToDate(this.props.appointment.appointmentCreatedTime)+"   "+convertDateTimeToTime(this.props.appointment.appointmentCreatedTime):''}</Text> 
                    </View>
                    <View style={styles.appointmentRowContainer}>
                            <Text style={styles.rowText}>Giờ hẹn:</Text>
                            <Text style={styles.rowTextLong}>{this.props.appointment?convertDateTimeToDate(this.props.appointment.appointmentMeetingTime)+"   "+convertDateTimeToTime(this.props.appointment.appointmentMeetingTime):''}</Text>
                    </View>  
                    <View style={styles.appointmentRowContainer}>
                            <Text style={styles.rowText}>Người tạo:</Text>
                            <Text style={styles.rowTextLong}>{this.props.appointment?this.props.appointment.customerName:''}</Text>
                    </View>
                    <View style={styles.appointmentRowContainer}>
                            <Text style={styles.rowText}>Số điện thoại:</Text>
                            <Text style={styles.rowTextLong}>{this.props.appointment?this.props.appointment.customerPhoneNumber:''}</Text>
                    </View>                  
                    <View style={styles.appointmentRowContainer}>
                            <Text style={styles.rowText}>Trạng thái: </Text>
                            <Text style={styles.rowTextLong}>{this.props.appointment?getAppointmentStateName(this.props.appointment.appointmentStatus):''}</Text>
                    </View>
                    <View style={[styles.appointmentRowContainer,{justifyContent:'center'}]}>
                            <Text style={styles.rowError}>{this.state.error}</Text>
                    </View>
                </View>
                <View style={styles.buttonArea}>
                    {this.props.appointment.appointmentStatus =='pending'?
                    <TouchableOpacity style={styles.button} onPress={() => this.onReject()}>
                        <Text style={{color:'white'}}>Từ chối</Text>
                    </TouchableOpacity> 
                    :<View/>}
                    {this.props.appointment.appointmentStatus =='pending'?
                    <TouchableOpacity style={styles.button} onPress={() => this.onAccept()} disabled={!this.state.acceptAppointmentApi}>
                        <Text style={{color:'white'}}>Xác nhận</Text>
                    </TouchableOpacity> 
                    :<View/>}
                </View>
            </View>
        </View>
    );
    }
}


const styles = StyleSheet.create({
    appointmentViewArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    appointmentTopMenuArea: {
        height:70,
        width: componentWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        paddingTop:20,
        paddingBottom:20,
        marginTop:10,
    },
    appointmentArea:{
        width: componentWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    appointmentContainer:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:5,
        backgroundColor:'white',
        marginBottom: 50,
        paddingTop: 40,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 15,
    },
    appointmentRowContainer:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:'100%',
        marginBottom:30,
    },
    rowFirstContainer:{
        width:200,
    },
    rowSecondContainer:{
        width:'100%',
    },
    rowText:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:200,
        fontSize:17,
        fontWeight:'bold',
        backgroundColor:''
    },
    rowTextLong:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:500,
        fontSize:17,
        backgroundColor:''
    },
    rowError:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:15,
        color:'red'
    },
    buttonArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop:10,
        paddingBottom:50,
        paddingLeft:200,
        paddingRight:200,
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
