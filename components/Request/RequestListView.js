import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList} from 'react-native';
import RequestListViewItem from './RequestListViewItem'
import {getApiUrl,componentWidth} from './../Common/CommonFunction'

export default class RequestListView extends Component  {
    constructor(props) {
        super(props)
        this.state = {            
            districtsList: this.props.districtList,
            statusSelected: 'all',
            districtSelected: 'all',
            dataChanged: true,
            testList: this.props.testList,
            requestList: this.props.requestList,
            requestShowList : this.props.requestList,
            requestCount: this.props.requestList?this.props.requestList.length:'0',
        };
        this.getRequestShowList = this.getRequestShowList.bind(this)
    }

    componentDidMount(){
        // console.log(this.props.testVersion)
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                requestList: this.props.requestList,
                districtsList: this.props.districtList,
                requestCount: this.props.requestList?this.props.requestList.length:'0', 
                dataChanged: !this.state.dataChanged
            }));
        }
    }

    
    getRequestShowList(){
        if (this.state.statusSelected=='all'){
            if (this.state.districtSelected=='all'){
                return this.state.requestList
            }
            else{
                let result = []
                let index = this.state.requestList.length - 1;
                
                while (index >= 0) {
                    if (this.state.requestList[index].requestDistrictID === this.state.districtSelected) {
                        result.push(this.state.requestList[index]);
                        }
                    index -= 1;
                }        
                return result;
            }
        }
        else{
            if (this.state.districtSelected=='all'){
                let result = []
                let index = this.state.requestList.length - 1;
                while (index >= 0) {
                    if (this.state.requestList[index].requestStatus === this.state.statusSelected) {
                        result.push(this.state.requestList[index]);
                        }
                    index -= 1;
                }        
                return result;
            }
            else{                
                let result = []
                let index = this.state.requestList.length - 1;
                while (index >= 0) {
                    if (this.state.requestList[index].requestStatus === this.state.statusSelected && this.state.requestList[index].requestDistrictID === this.state.districtSelected) {
                        result.push(this.state.requestList[index]);
                        }
                    index -= 1;
                }        
                return result;
            }
        }
        return this.state.requestList
    }



    render(){
    return (
        <View style={styles.requestListArea}>
            <View style={styles.requestListTopMenuArea}>
                <View style={styles.requestListTopMenuContainer}>
                    <Text style={{fontWeight:'bold'}}>Trạng thái: </Text>
                    <Picker
                        selectedValue={this.state.statusSelected}
                        style={[styles.requestTypeDropdown,{width:360}]}
                        onValueChange={(itemValue, itemIndex) => this.setState({
                            statusSelected:itemValue,
                            dataChanged: !this.state.dataChanged,
                        })}
                        >
                        <Picker.Item label="Tất cả" value="all" />
                        <Picker.Item label="Đang đợi y tá nhận đơn" value="pending" />
                        <Picker.Item label="Đơn đã được y tá chấp nhận" value="accepted" />
                        <Picker.Item label="Đơn đã được lấy mẫu" value="transporting" />
                        <Picker.Item label="Đang đợi kết quả" value="waitingforresult" />
                        <Picker.Item label="Đơn đã xong" value="closed" />
                        <Picker.Item label="Y tá làm mất mẫu" value="lostsample" />
                        <Picker.Item label="Điều phối viên là mất mẫu" value="coordinatorlostsample" />
                        <Picker.Item label="Đơn đã hủy" value="canceled" />
                        <Picker.Item label="Đã nhận đơn bị mất do điều phối viên" value="reaccepted" />
                        <Picker.Item label="Đang vận chuyển đơn bị mất do điều phối viên" value="retransporting" />
                        <Picker.Item label="Đang đợi lấy lại mẫu do điều phối viên làm mất" value="relostsample" />
                    </Picker>
                    <Text style={{marginLeft:200,fontWeight:'bold'}}>Quận/Huyện : </Text>
                    <Picker
                        selectedValue={this.state.districtSelected}
                        style={styles.requestTypeDropdown}
                        onValueChange={(itemValue, itemIndex) => this.setState({
                            districtSelected:itemValue,
                            dataChanged: !this.state.dataChanged,
                        })}                    
                        >
                        <Picker.Item label="Tất cả" value="all" />
                        {this.state.districtsList?this.state.districtsList.map(district => (
                            <Picker.Item label={district.districtName} value={district.districtCode} />
                        )):null}
                    </Picker>
                </View>
                <View style={styles.requestListTopMenuContainer}>
                    <Text>Số lượng: {this.getRequestShowList()?this.getRequestShowList().length:'0'}</Text>
                </View>
            </View>
            {this.getRequestShowList()?this.getRequestShowList().length>0?
            <View style={styles.requestListFlatListArea}>
                <FlatList style={styles.requestListFlatList}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                    // showsVerticalScrollIndicator={false}
                    data={this.getRequestShowList()}
                    extraData={this.state.dataChanged}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                            return (
                                <View>                                
                                <RequestListViewItem
                                    requestId={item.requestID}
                                    requestCreatedTime={item.requestCreatedTime}
                                    customerName={item.customerName}
                                    customerPhoneNumber={item.customerPhoneNumber}
                                    customerDOB={item.customerDOB}
                                    requestAddress={item.requestAddress}
                                    requestDistrictName={item.requestDistrictName}
                                    requestTownName={item.requestTownName}
                                    requestMeetingTime={item.requestMeetingTime}
                                    nurseName={item.nurseName}
                                    nurseId={item.nurseID}
                                    coordinatorId={item.coordinatorID}
                                    coordinatorName={item.coordinatorName}
                                    lsSelectedTest={item.lsSelectedTest}
                                    requestAmount={item.requestAmount}
                                    requestStatus={item.requestStatus}
                                    requestUpdatedTime={item.requestUpdatedTime}
                                    requestTestVersion={item.versionOfTest}
                                    testVersion={this.props.testVersion}
                                    testList={this.props.testList} 
                                    token={this.props.token}
                                    changeShowView={this.props.changeShowView?this.props.changeShowView: null}
                                    setSelectedRequest={this.props.setSelectedRequest?this.props.setSelectedRequest: null}         
                                />   
                                </View>                             
                            );
                        }}
                    >                   
                </FlatList>
            </View>
            :
            <View style={styles.requestListAlertContainer}>
                <Text>{'Hiện tại chưa có đơn xét nghiệm nào'}</Text>
            </View>
            :
            <View style={styles.requestListAlertContainer}>
                <Text>{'Hiện tại chưa có đơn xét nghiệm nào'}</Text>
            </View>
            }
        </View>
    );
    }
}


const styles = StyleSheet.create({
    requestListArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    requestListTopMenuArea: {
        width:componentWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
        paddingBottom:20,
        paddingTop:10,
    },
    requestListTopMenuContainer: {
        width:componentWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        paddingTop:10,
        paddingBottom:10,
    },
    requestTypeDropdown:{
        height: 35, 
        width: 300,
        borderRadius:5,
        backgroundColor: 'white',
        color:'black'
    },
    requestListFlatListArea:{        
        width:componentWidth,
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '',
    },
    requestListFlatList:{
        width:componentWidth,
        flex:1,
        flexDirection: 'column',
        backgroundColor: '',
        paddingTop:20,
        paddingBottom:20,
    },
    requestListAlertContainer: {
        width:componentWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
        paddingTop:20,
        paddingBottom:20,
    },
    

});
