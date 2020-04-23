import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime} from './../Common/CommonFunction'
import {getApiUrl, getStateName} from './../Common/CommonFunction'
import RequestTestCategoryItem from './RequestTestCategoryItem'
import appointmentList from './../../Data/appointmentList'
import districtList from './../../Data/districtList'
import userList from './../../Data/userList'

export default class RequestView extends Component  {
    constructor(props) {
        super(props)
        this.state = {        
            testList: this.props.testList,
        };
        this.isSelected = this.isSelected.bind(this)
        this.getLeftButtonName = this.getLeftButtonName.bind(this)
        this.getRightButtonName = this.getRightButtonName.bind(this)
        this.onLeftButtonPress = this.onLeftButtonPress.bind(this)
        this.onRightButtonPress = this.onRightButtonPress.bind(this)
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                
            }));
        }
    }
    
    isSelected(id) {
        const found = this.props.request?this.props.request.lsSelectedTest.findIndex(test => test == id) : -1;
        let result = false;
        found === -1 ? '' : result = true;
        return result;
    }

    
    onTakingSample(){
        fetch(getApiUrl()+"/requests/update/"+this.props.request.requestId, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.props.token,
                },
                body: JSON.stringify({
                    status: 'waitingforresult',
                    userID: this.props.userInfo.id,
                    note: 'Coordinator have take this request',
                }),
                })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                this.props.changeShowView('RequestListView')
            },            
            (error) => {
                console.log(error)
            }
        )  
    }

    onLostSample(){
        this.props.changeShowView('RequestLostSampleView')
    }

    onUpdateResult(){
        this.props.changeShowView('RequestUpdateResultView')
    }

    getLeftButtonName(status) {
        switch (status) {
            case 'transporting':
                return '';
                break;
            case 'waitingforresult':
                return 'Làm mất mẫu';
                break;            
            default: '';
        }
    }

    getRightButtonName(status) {
        switch (status) {
            case 'transporting':
                return 'Xác nhận lấy mẫu';
                break;
            case 'waitingforresult':
                return 'Cập nhật kết quả';
                break;            
            default: ''
        }
    }


    onLeftButtonPress(status) {
        switch (status) {
            case 'transporting':
                
                break;
            case 'waitingforresult':
                this.onLostSample();
                break;
        }
    }

    onRightButtonPress(status) {
        switch (status) {
            case 'transporting':
                this.onTakingSample();
                break;
            case 'waitingforresult':
                this.onUpdateResult();
                break;
        }
    }


    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.requestViewArea}>
            <View style={styles.requestTopMenuArea}>
                <Text style={{fontSize:25}}>Chi tiết đơn yêu cầu xét nghiệm</Text>                
            </View>
            <View style={styles.requestArea}>
                <View style={styles.requestContainer}>      
                    <View style={styles.requestRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Mã đơn xét nghiệm: </Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.request?this.props.request.requestId:''}</Text>                
                        </View>
                    </View>
                    <View style={styles.requestRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Giờ tạo:</Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.request?convertDateTimeToDate(this.props.request.requestCreatedTime)+"   "+convertDateTimeToTime(this.props.request.requestCreatedTime):''}</Text>            
                        </View>
                    </View>
                    <View style={styles.requestRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Người tạo:</Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.request?this.props.request.customerName:''}</Text>            
                        </View>
                    </View>
                    <View style={styles.requestRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Số điện thoại:</Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.request?this.props.request.customerPhoneNumber:''}</Text>            
                        </View>
                    </View>
                    <View style={styles.requestRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Địa chỉ nhận đơn: </Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.request?this.props.request.requestAddress+', '+this.props.request.requestTownName+', '+this.props.request.requestDistrictName:''}</Text>            
                        </View>
                    </View>
                    <View style={styles.requestRowContainer}>
                        <View style={styles.rowFirstContainer}>
                            <Text style={styles.rowText}>Trạng thái: </Text>                
                        </View>
                        <View style={styles.rowSecondContainer}>
                            <Text style={styles.rowText}>{this.props.request?getStateName(this.props.request.requestStatus):''}</Text>            
                        </View>
                    </View>
                    <View style={styles.requestRowContainer}>
                        <FlatList
                                style={styles.rowFlatList}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}
                                data={this.props.request?this.props.request.testList:[]}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <RequestTestCategoryItem
                                            categoryName={item.testTypeName}
                                            test={item.listTest}
                                            isSelected={this.isSelected}
                                        >
                                        </RequestTestCategoryItem>
                                    );
                                }}
                            >
                        </FlatList>
                    </View>
                    {/* <View style={[styles.requestRowContainer,{justifyContent: 'center',}]}>
                        <Image 
                            style={styles.rowImage}
                            source={{ uri: this.props.request?this.props.request.requestImageUrl:'' }}
                            >
                        </Image>
                    </View>         */}
                </View>

                <View style={styles.buttonArea}>
                    {!this.getLeftButtonName(this.props.request?this.props.request.requestStatus:'') ==''?
                    <TouchableOpacity style={styles.button} onPress={() => this.onLeftButtonPress(this.props.request?this.props.request.requestStatus:'')}>
                        <Text>{this.getLeftButtonName(this.props.request?this.props.request.requestStatus:'')}</Text>
                    </TouchableOpacity> 
                    :<View/>
                    }
                    {!this.getRightButtonName(this.props.request?this.props.request.requestStatus:'')==''?
                    <TouchableOpacity style={styles.button} onPress={() => this.onRightButtonPress(this.props.request?this.props.request.requestStatus:'')}>
                        <Text>{this.getRightButtonName(this.props.request?this.props.request.requestStatus:'')}</Text>
                    </TouchableOpacity>  
                    :<View/>
                    }
                </View>

            </View>
        </View>
    );
    }
}


const styles = StyleSheet.create({
    requestViewArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    requestTopMenuArea: {
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
    requestArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:200,
        paddingRight:200,
    },
    requestContainer:{
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
    requestRowContainer:{
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
    rowFlatList: {
        width: '100%',
        alignSelf: 'stretch',
        flex: 1,
        backgroundColor: 'white',
        // borderRadius: 10,
        marginTop: 5,
        backgroundColor:'gray'
    },
    rowImage:{
        width:400,
        height:400,
        backgroundColor:'red'
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
