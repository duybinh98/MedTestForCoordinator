import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {getApiUrl, convertDateTimeToDate, convertDateTimeToTime, componentWidth} from './../Common/CommonFunction'

export default class AppointmentLostSampleView extends Component  {
    constructor(props) {
        super(props)
        this.state = {      
            reason: '',
            error: '',
            errorList: ['','Phải điền lý do từ chối'],

        };
        this.handleChange = this.handleChange.bind(this)
        this.rejectAppointment = this.rejectAppointment.bind(this)
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                
            }));
        }
    }


    rejectAppointment(){
        if(this.checkValid()){
            this.callApiRejectAppointment()
        }
    }

    checkValid(){        
        if (this.state.reason == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[1]
            }));
        this.setState(previousState => ({ 
                error: this.state.errorList[0]
        }));
        return true;
        
    }

    callApiRejectAppointment(){
        fetch(getApiUrl()+"/appointments/reject/"+this.props.appointment.appointmentId, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+this.props.token,
            },
            body: JSON.stringify({
                status: 'rejected',
                coordinatorID: this.props.userInfo.id,
                note: this.state.reason,
            }),
            })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                let success = false
                result ? result.message? null : success=true : null;
                if (success) {
                    let appointment = this.props.appointment
                    appointment.appointmentStatus = 'rejected'
                    this.props.setSelectedAppointment(appointment)
                    this.props.changeShowView('AppointmentView')
                }
            },            
            (error) => {
                console.log(error)
            }
        )  
    }


    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        // console.log('event name'+name+', event value:'+value)
        this.setState({[name]: value});
    }


    

    render(){
    return (
        <View style={styles.appointmentViewArea}>
            <View style={styles.appointmentTopMenuArea}>
                <Text style={{fontSize:25}}>Từ chối đơn hẹn: </Text>                
            </View>
            <View style={styles.appointmentArea}>
                <View style={styles.appointmentContainer}>   
                    <View style={styles.appointmentRowContainer}>
                        <Text style={styles.rowText}>Mã đơn hẹn: </Text>        
                        <Text style={styles.rowTextLong}>{this.props.appointment?this.props.appointment.appointmentId:''}</Text>      
                    </View>
                    <View style={styles.appointmentRowContainer}>
                            <Text style={styles.rowText}>Giờ tạo:</Text>      
                            <Text style={styles.rowTextLong}>{this.props.appointment?convertDateTimeToDate(this.props.appointment.appointmentCreatedTime)+"   "+convertDateTimeToTime(this.props.appointment.appointmentCreatedTime):''}</Text>
                    </View>
                    <View style={styles.appointmentRowContainer}>
                            <Text style={styles.rowText}>Người tạo:</Text> 
                            <Text style={[styles.rowTextLong,{width:300}]}>{this.props.appointment?this.props.appointment.customerName:''}</Text>
                    </View>
                    <View style={styles.appointmentRowContainer}>
                            <Text style={styles.rowText}>Số điện thoại:</Text>      
                            <Text style={styles.rowTextLong}>{this.props.appointment?this.props.appointment.customerPhoneNumber:''}</Text> 
                    </View>
                    <View style={styles.appointmentRowContainer}>
                        <Text style={styles.rowText}>{'Lý do từ chối: '}</Text>
                        <TextInput 
                            style={styles.rowTextInput}
                            multiline={true}
                            numberOfLines={4}
                            placeholder={'Điền lý do từ chối'}
                            name={"reason"}
                            onChange={this.handleChange}
                            value={this.state.reason}  
                            >                
                        </TextInput>
                    </View>
                    
                    <View style={styles.appointmentRowContainer}>
                        <Text style={styles.rowTextError}>{this.state.error}</Text>                        
                    </View>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.appointmentConfirmButton} onPress={() => this.props.changeShowView('AppointmentView')}>
                        <Text style={{color:'white'}}>Quay lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.appointmentConfirmButton} onPress={() => this.rejectAppointment()}>
                        <Text style={{color:'white'}}>Từ chối đơn hẹn</Text>
                    </TouchableOpacity>
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
    rowText:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:170,
        fontSize:18,
        fontWeight:'bold'
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
    appointmentTypeDropDown:{
        alignSelf: 'stretch',
        padding:3,
        width: 800,
        borderRadius:5,
    },
    rowTextInput:{
        alignSelf: 'stretch',
        padding:3,
        width: 800,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:5,
        paddingLeft:10,        
    },
    appointmentConfirmButton:{
        height:50,
        width:200,
        backgroundColor:'#25345D',
        borderRadius:5,
        borderWidth:1,
        marginBottom:50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addImageButton:{
        width: 200,
        height:30,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:'#e6e6e6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePreview:{
        width:200,
        height:200,
        backgroundColor:''
    },
    rowTextError:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:300,
        fontSize:13,
        color:'red',        
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
});
