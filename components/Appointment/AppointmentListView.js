import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList} from 'react-native';
import {getApiUrl, componentWidth} from './../Common/CommonFunction'
import AppointmentListViewItem from './AppointmentListViewItem'

export default class AppointmentListView extends Component  {
    constructor(props) {
        super(props)
        this.state = {            
            districtsList: this.props.districtList,
            statusSelected: 'all',
            districtSelected: 'all',
            dataChanged: true,
            testsList: this.props.testsList,
            appointmentList: this.props.appointmentList,
        };
        this.getAppointmentShowList = this.getAppointmentShowList.bind(this)
    }


    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                appointmentList: this.props.appointmentList,
                districtsList: this.props.districtList,
                dataChanged: !this.state.dataChanged
            }));
        }
    }

    

    getAppointmentShowList(){
        if (this.state.statusSelected=='all'){
            if (this.state.districtSelected=='all'){
                return this.state.appointmentList
            }
            else{
                let result = []
                let index = this.state.appointmentList.length - 1;
                while (index >= 0) {
                    if (this.state.appointmentList[index].requestDistrictID === this.state.districtSelected) {
                        result.push(this.state.appointmentList[index]);
                        }
                    index -= 1;
                }        
                return result;
            }
        }
        else{
            if (this.state.districtSelected=='all'){
                let result = []
                let index = this.state.appointmentList.length - 1;
                while (index >= 0) {
                    if (this.state.appointmentList[index].appointment_status === this.state.statusSelected) {
                        result.push(this.state.appointmentList[index]);
                        }
                    index -= 1;
                }        
                return result;
            }
            else{                
                let result = []
                let index = this.state.appointmentList.length - 1;
                while (index >= 0) {
                    if (this.state.appointmentList[index].appointment_status === this.state.statusSelected && this.state.appointmentList[index].requestDistrictID === this.state.districtSelected) {
                        result.push(this.state.appointmentList[index]);
                        }
                    index -= 1;
                }        
                return result;
            }
        }
        return this.state.appointmentList
    }



    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.appointmentListArea}>
            <View style={styles.appointmentListTopMenuArea}>
                <View style={styles.appointmentListTopMenuContainer}>
                    <Text style={{fontWeight:'bold'}}>Trạng thái: </Text>
                    <Picker
                        selectedValue={this.state.statusSelected}
                        style={[styles.appointmentTypeDropdown,{width:360}]}
                        onValueChange={(itemValue, itemIndex) => this.setState({
                            statusSelected:itemValue,
                            dataChanged: !this.state.dataChanged
                        })}
                        >
                        <Picker.Item label="Tất cả" value="all" />
                        <Picker.Item label="Đơn đang đợi xử lý" value="pending" />
                        <Picker.Item label="Đơn đã được chấp nhận" value="accepted" />
                        <Picker.Item label="Đơn đã bị từ chối" value="rejected" />
                        <Picker.Item label="Đơn đã bị hủy" value="canceled" />
                    </Picker>                    
                </View>
                <View style={styles.appointmentListTopMenuContainer}>
                    <Text>Số lượng: {this.getAppointmentShowList()?this.getAppointmentShowList().length:'0'}</Text>
                </View>
            </View>
            {this.getAppointmentShowList()?this.getAppointmentShowList().length>0?
            <View style={styles.appointmentListFlatListArea}>        
                <FlatList style={styles.appointmentListFlatList}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                    showsVerticalScrollIndicator={false}
                    data={this.getAppointmentShowList()}
                    extraData={this.state.dataChanged}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                            return (
                                <View>                                
                                <AppointmentListViewItem
                                    appointmentId={item.appointment_id}       
                                    appointmentCreatedTime={item.appointment_createdTime}                             
                                    customerName={item.appointment_customerName}
                                    customerPhoneNumber={item.appointment_phoneNumber}
                                    customerDOB={item.appointment_DOB}
                                    appointmentMeetingTime={item.appointment_meetingTime}
                                    appointmentStatus={item.appointment_status}        
                                    changeShowView={this.props.changeShowView?this.props.changeShowView: null}
                                    setSelectedAppointment={this.props.setSelectedAppointment?this.props.setSelectedAppointment: null}                                                                 
                                />   
                                </View>                             
                            );
                        }}
                    >                   
                </FlatList>        
            </View>
            :
            <View style={styles.appointmentListAlertContainer}>
                <Text>{'Hiện tại chưa có đơn xét khám nào'}</Text>
            </View>
            :
            <View style={styles.appointmentListAlertContainer}>
                <Text>{'Hiện tại chưa có đơn xét khám nào'}</Text>
            </View>
            }
        </View>
    );
    }
}


const styles = StyleSheet.create({
    appointmentListArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    appointmentListTopMenuArea: {
        width:componentWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
        paddingBottom:20,
        paddingTop:10,
    },
    appointmentListTopMenuContainer: {
        width:componentWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '',
        paddingTop:10,
        paddingBottom:10,
    },
    appointmentTypeDropdown:{
        height: 35, 
        width: 300,
        borderRadius:5,
        marginLeft:27,
    },
    appointmentListFlatListArea:{        
        width:componentWidth,
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '',
    },
    appointmentListFlatList:{
        width:componentWidth,
        flex:1,
        flexDirection: 'column',
        backgroundColor: '',
        paddingTop:20,
        paddingBottom:20,
    },
    appointmentListAlertContainer: {
        width:componentWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
        paddingTop:20,
        paddingBottom:20,
    },

});
