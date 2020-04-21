import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime} from './../Common/CommonFunction'
import {getApiUrl, getAppointmentStateName} from './../Common/CommonFunction'
import appointmentList from './../../Data/appointmentList'
import districtList from './../../Data/districtList'
import userList from './../../Data/userList'

export default class AppointmentView extends Component  {
    constructor(props) {
        super(props)
        this.state = {        
            
        };
        this.onAccept = this.onAccept.bind(this)
        this.onReject = this.onReject.bind(this)
        
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                
            }));
        }
    }
    

    
    callApiAcceptAppointment(_status){
        fetch(getApiUrl()+"/appointments/accept/"+this.props.appointment.appointmentId, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+this.props.token,
            },
            body: JSON.stringify({
                status: _status,
                coordinatorID: this.props.userInfo.id,
                note: 'ok',
            }),
            })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                // let success = false
                // result ? result.message? null : success=true : null;
                // if (success) 
                this.props.changeShowView('AppointmentListView')
            },            
            (error) => {
                console.log(error)
            }
        )  
    }

    onAccept(){
        this.callApiAcceptAppointment()
    }

    onReject(){
        this.props.changeShowView('AppointmentRejectView')
    }



    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.appointmentViewArea}>
            <View style={styles.appointmentTopMenuArea}>
                <Text style={{fontSize:25}}>Chi tiết đơn khám</Text>                
            </View>
            <View style={styles.appointmentArea}>
                <View style={styles.appointmentContainer}>      
                    <View style={styles.appointmentRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Mã đơn xét nghiệm: </Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.appointment?this.props.appointment.appointmentId:''}</Text>                
                        </View>
                    </View>
                    <View style={styles.appointmentRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Giờ tạo:</Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.appointment?convertDateTimeToDate(this.props.appointment.appointmentCreatedTime)+"   "+convertDateTimeToTime(this.props.appointment.appointmentCreatedTime):''}</Text>            
                        </View>
                    </View>
                    <View style={styles.appointmentRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Giờ hẹn:</Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.appointment?convertDateTimeToDate(this.props.appointment.appointmentMeetingTime)+"   "+convertDateTimeToTime(this.props.appointment.appointmentMeetingTime):''}</Text>            
                        </View>
                    </View>  
                    <View style={styles.appointmentRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Người tạo:</Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.appointment?this.props.appointment.customerName:''}</Text>            
                        </View>
                    </View>
                    <View style={styles.appointmentRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Số điện thoại:</Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.appointment?this.props.appointment.customerPhoneNumber:''}</Text>            
                        </View>
                    </View>                  
                    <View style={styles.appointmentRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Trạng thái: </Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.appointment?getAppointmentStateName(this.props.appointment.appointmentStatus):''}</Text>            
                        </View>
                    </View>
                </View>
                <View style={styles.buttonArea}>
                    {this.props.appointment.appointmentStatus =='pending'?
                    <TouchableOpacity style={styles.button} onPress={() => this.onReject()}>
                        <Text>Từ chối</Text>
                    </TouchableOpacity> 
                    :<View/>}
                    {this.props.appointment.appointmentStatus =='pending'?
                    <TouchableOpacity style={styles.button} onPress={() => this.onAccept()}>
                        <Text>Xác nhận</Text>
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
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        padding:20,
        paddingLeft:200,
        marginTop:10,
        marginBottom:-20,
    },
    appointmentArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:200,
        paddingRight:200,
    },
    appointmentContainer:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:5,
        backgroundColor:'white',
        marginTop:50,
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
        fontSize:18,
        backgroundColor:''
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
        backgroundColor:'#e6e6e6',
        borderRadius:5,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
