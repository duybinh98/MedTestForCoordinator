import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {getApiUrl, getStateName, componentWidth, convertDateTimeToDate, convertDateTimeToTime, convertMoney} from './../Common/CommonFunction'
import AlertScreen from './../Common/AlertScreen'
import RequestTestCategoryItem from './RequestTestCategoryItem'

export default class RequestView extends Component  {
    constructor(props) {
        super(props)
        this.state = {        
            testList: this.props.testList,
            resultList: [],
            error: '',
            takingSampleApi: true,
            nurseDetailApi: true,
            coordinatorDetailApi: true,
        };
        this.isSelected = this.isSelected.bind(this)
        this.getLeftButtonName = this.getLeftButtonName.bind(this)
        this.getRightButtonName = this.getRightButtonName.bind(this)
        this.onLeftButtonPress = this.onLeftButtonPress.bind(this)
        this.onRightButtonPress = this.onRightButtonPress.bind(this)
        this.callApiTakingSample = this.callApiTakingSample.bind(this)
        this.callApiNurseDetail = this.callApiNurseDetail.bind(this)
        this.callApiCoordinatorDetail = this.callApiCoordinatorDetail.bind(this)
    }

    componentDidMount(){
    }

    componentDidUpdate  (prevProps, prevState) {        
        if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                
            }));
        }
    }

    callApiNurseDetail(){
        if(this.state.nurseDetailApi || this.props.request.nurseId!="Chưa có y tá nhận!"){
            this.setState({nurseDetailApi:false})
            fetch(getApiUrl()+"/users/nurses/detail/"+this.props.request.nurseId, {
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
                    this.setState({nurseDetailApi:true})
                    console.log(result)
                    let success = false
                    result ? result.message? null : success=true : null;
                    if (success) {
                        this.props.changeToAccountViewScreen(result)
                    }
                },            
                (error) => {
                    this.setState({nurseDetailApi:true})
                    console.log(error)
                }
            )  
        }
    }

    callApiCoordinatorDetail(){
        if(this.state.coordinatorDetailApi || this.props.request.nurseId!="Chưa có điều phối viên xử lý!"){
            this.setState({coordinatorDetailApi:false})
            fetch(getApiUrl()+"/users/coordinators/detail/"+this.props.request.coordinatorId, {
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
                    this.setState({coordinatorDetailApi:true})
                    console.log(result)
                    let success = false
                    result ? result.message? null : success=true : null;
                    if (success) {
                        this.props.changeToAccountViewScreen(result)
                    }
                },            
                (error) => {
                    this.setState({coordinatorDetailApi:true})
                    console.log(error)
                }
            )  
        }
    }

    isSelected(id) {
        const found = this.props.request?this.props.request.lsSelectedTest.findIndex(test => test == id) : -1;
        let result = false;
        found === -1 ? '' : result = true;
        return result;
    }

    callApiDetail(){
        fetch(getApiUrl()+"/requests/detail/"+this.props.request.requestId, {
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
                console.log(result)
                let success = false
                result ? result.message? null : success=true : null;
                if (success) {
                    // let request = this.props.request
                    // request.requestStatus = result.requestStatus
                    // this.props.setSelectedRequest(request)
                    this.props.changeToRequestViewScreen(result,this.props.request.testList)
                }
            },            
            (error) => {
                console.log(error)
            }
        )  
    }

    callApiTakingSample(){
        if(this.state.takingSampleApi){
            this.setState({takingSampleApi:false})
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
                    this.setState({takingSampleApi:true})
                    console.log(result)
                    let success = false
                    result ? result.message? null : success=true : null;
                    if (success) {
                        let request = this.props.request
                        request.requestStatus = 'waitingforresult'
                        this.props.setSelectedRequest(request)
                        this.props.changeShowView('RequestView')
                    }
                    else{
                        this.setState({error:result.message})
                        this.callApiDetail()
                    }
                    
                },            
                (error) => {
                    this.setState({takingSampleApi:true})
                    console.log(error)
                }
            )  
        }
        
    }
    
    onTakingSample(){
        this.callApiTakingSample()
        
    }

    onLostSample(){
        this.props.changeShowView('RequestLostSampleView')
    }

    onUpdateResult(){
        this.props.changeShowView('RequestUpdateResultView')
    }

    onViewResult(){
        this.props.changeShowView('RequestResultView')
    }

    getLeftButtonName(status) {
        switch (status) {
            case 'transporting':
            case 'retransporting':
                return '';
                break;
            case 'waitingforresult':
                return 'Làm mất mẫu';
                break;  
            case 'closed':
                return '';
                break;          
            default: '';
        }
    }

    getRightButtonName(status) {
        switch (status) {
            case 'transporting':
            case 'retransporting':
                return 'Xác nhận lấy mẫu';
                break;
            case 'waitingforresult':
                return 'Cập nhật kết quả';
                break;          
            case 'closed':
                return 'Xem kết quả';
                break;    
            default: ''
        }
    }

    onLeftButtonPress(status) {
        switch (status) {
            case 'transporting':
            case 'retransporting':
                
                break;
            case 'waitingforresult':
                this.onLostSample();
                break;
            case 'closed':
            
                break;
        }
    }

    onRightButtonPress(status) {
        switch (status) {
            case 'transporting':
            case 'retransporting':
                this.onTakingSample();
                break;
            case 'waitingforresult':
                this.onUpdateResult();
                break;
            case 'closed':
                this.onViewResult();
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
                            <Text style={styles.rowText}>Mã đơn xét nghiệm: </Text>      
                            <Text style={styles.rowTextLong}>{this.props.request?this.props.request.requestId:''}</Text> 
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Giờ tạo:</Text>   
                            <Text style={styles.rowTextLong}>{this.props.request?convertDateTimeToDate(this.props.request.requestCreatedTime)+"   "+convertDateTimeToTime(this.props.request.requestCreatedTime):''}</Text>
                        
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Người tạo:</Text>   
                            <Text style={styles.rowTextLong}>{this.props.request?this.props.request.customerName:''}</Text>    
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Số điện thoại:</Text>    
                            <Text style={styles.rowTextLong}>{this.props.request?this.props.request.customerPhoneNumber:''}</Text> 
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Địa chỉ nhận đơn: </Text>    
                            <Text style={styles.rowTextLong}>{this.props.request?this.props.request.requestAddress+', '+this.props.request.requestTownName+', '+this.props.request.requestDistrictName:''}</Text>
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Y tá nhận đơn: </Text> 
                            <TouchableOpacity onPress={() => this.callApiNurseDetail()} disabled={!this.state.nurseDetailApi}>   
                            <Text style={styles.rowTextLong}>{this.props.request?this.props.request.nurseName:''}</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Điều phối viên: </Text>    
                            <TouchableOpacity onPress={() => this.callApiCoordinatorDetail()} disabled={!this.state.coordinatorDetailApi}>   
                            <Text style={styles.rowTextLong}>{this.props.request?this.props.request.coordinatorName:''}</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Trạng thái: </Text>
                            <Text style={styles.rowTextLong}>{this.props.request?getStateName(this.props.request.requestStatus):''}</Text>
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Cập nhật gần nhất: </Text>
                            <Text style={styles.rowTextLong}>{this.props.request?convertDateTimeToDate(this.props.request.requestUpdatedTime)+"   "+convertDateTimeToTime(this.props.request.requestUpdatedTime):''}</Text>
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Tổng tiền: </Text>
                            <Text style={styles.rowTextLong}>{this.props.request?convertMoney(this.props.request.requestAmount)+'đ':''}</Text>
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
                    <View style={[styles.requestRowContainer,{justifyContent:'center'}]}>
                            <Text style={styles.rowError}>{this.state.error}</Text>
                    </View>
                </View>
                <View style={styles.buttonArea}>
                    {!this.getLeftButtonName(this.props.request?this.props.request.requestStatus:'') ==''?
                    <TouchableOpacity style={styles.button} onPress={() => this.onLeftButtonPress(this.props.request?this.props.request.requestStatus:'')}>
                        <Text style={{color:'white'}}>{this.getLeftButtonName(this.props.request?this.props.request.requestStatus:'')}</Text>
                    </TouchableOpacity> 
                    :<View/>
                    }
                    {!this.getRightButtonName(this.props.request?this.props.request.requestStatus:'')==''?
                    <TouchableOpacity style={styles.button} onPress={() => this.onRightButtonPress(this.props.request?this.props.request.requestStatus:'')} disabled={!this.state.takingSampleApi}>
                        <Text style={{color:'white'}}>{this.getRightButtonName(this.props.request?this.props.request.requestStatus:'')}</Text>
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
        width: componentWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        paddingTop:20,
        paddingBottom:20,
        marginTop:10,
    },
    requestArea:{
        width: componentWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    requestContainer:{
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
    requestRowContainer:{
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
    },
    rowError:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:15,
        color:'red'
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
        backgroundColor:'#25345D',
        borderRadius:5,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePreviewArea:{
        alignSelf: 'stretch',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin:0
    },
    imagePreview:{
        height: 800,
        width: 800,
        aspectRatio: 10/10,
        backgroundColor:''
    },
});
