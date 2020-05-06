import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {getApiUrl, convertDateTimeToDate, convertDateTimeToTime} from './../Common/CommonFunction'
import * as ImagePicker from 'expo-image-picker';

export default class RequestUpdateResultView extends Component  {
    constructor(props) {
        super(props)
        this.state = {      
            imageUriList: [],
            requestTitle: '',
            requestShortContent: '',
            requestContent: '',
            error: '',
            errorList: ['','Chưa có ảnh kết quả nào'],
            uploadImageApi: true,
            setResultImpageApi: true,
            updateRequestApi: true,

        };
        this.selectPicture = this.selectPicture.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.completeUpdateResult = this.completeUpdateResult.bind(this)
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                
            }));
        }
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

    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        // console.log('event name'+name+', event value:'+value)
        this.setState({[name]: value});
    }

    selectPicture = async () =>{
        // console.log(result)
        const result = await ImagePicker.launchImageLibraryAsync()
        console.log(result)
        if (!result.cancelled) {
            this.callApiUploadImage(result)
        }
    }

    callApiUploadImage (_data) {
        if(this.state.uploadImageApi){
            this.setState({uploadImageApi:false})
            fetch(getApiUrl()+'/uploadImage', {
                method: 'POST',
                headers: {      
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.props.token,
                },
                body: JSON.stringify({
                    "file": _data.uri
                }),
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({uploadImageApi:true})
                    // console.log('result:'+JSON.stringify(result))
                    let tempList = this.state.imageUriList
                    tempList.push({'image':result.uri})
                    // console.log(tempList)
                    this.setState({ imageUriList: tempList });   
                },
                (error) => {
                    this.setState({uploadImageApi:true})
                    console.log('error:'+error)    
                }
            );
        }
    }

    completeUpdateResult(){
        if(this.checkValid()){
            this.callApiSetResultImage()
        }
    }

    checkValid(){  
        if (this.state.imageUriList.length == 0) 
            return this.setState(previousState => ({ 
                error: this.state.errorList[1]
            }));
        this.setState(previousState => ({ 
                error: this.state.errorList[0]
        }));
        return true;
        
    }

    callApiSetResultImage(){
        if(this.state.setResultImpageApi){
            this.setState({setResultImpageApi:false})
            let imageList = []
            let index = this.state.imageUriList.length - 1;
            while (index >= 0) {
                imageList.push(this.state.imageUriList[index].image)
                index-=1
            }
            console.log(imageList)
            fetch(getApiUrl()+'/requests/detail/results/add', {
            method: 'POST',
            headers: {      
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+this.props.token,
            },
            body: JSON.stringify({
                listImage: imageList,
                userID: this.props.userInfo.id,
                requestID: this.props.request.requestId
            }),
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({setResultImpageApi:true})
                    console.log('result:'+JSON.stringify(result))
                    let success = false
                    result ? result.message? null: success=true : null;   
                    if(success){
                        this.callApiUpdateRequest()
                    }  
                    else{
                        this.setState({error:result.message})
                    }
                            
                },
                (error) => {
                    this.setState({setResultImpageApi:true})
                    console.log('error:'+error)    
                }
            );
        }
        
    }

    callApiUpdateRequest(){
        if(this.state.updateRequestApi){
            this.setState({updateRequestApi:false})
            fetch(getApiUrl()+'/requests/update/'+this.props.request.requestId, {
                method: 'POST',
                headers: {      
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.props.token,
                },
                body: JSON.stringify({
                    status: 'closed',
                    userID: this.props.userInfo.id,
                    note: 'Đã cập nhật kết quả',
                }),
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({updateRequestApi:true})
                    console.log('result:'+JSON.stringify(result))
                    let success = false
                    result ? result.message? null: success=true : null;
                    if (success) {
                        // let request = this.props.request
                        // request.requestStatus = 'closed'
                        // this.props.setSelectedRequest(request)
                        // this.props.changeShowView('RequestView')
                        this.callApiDetail()
                    }
                    
                },
                (error) => {
                    this.setState({updateRequestApi:true})
                    console.log('error:'+error)    
                }
            );
        }
        
    }


    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.requestAddViewArea}>
            <View style={styles.requestAddTopMenuArea}>
                <Text style={{fontSize:25}}>Thêm kết quả xét nghiệm: </Text>                
            </View>
            <View style={styles.requestAddArea}>
                <View style={styles.requestAddContainer}>                    
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
                        <Text style={styles.rowText}>{'Ảnh kết quả: '}</Text>
                        <TouchableOpacity 
                        style={styles.addImageButton}
                        onPress={() => this.selectPicture()}
                        disabled={!this.state.uploadImageApi}
                        >
                            <Text style={{color:'white'}}>Chọn ảnh</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.imageUriList.length==0?null:
                    this.state.imageUriList.map(imageUri => (                        
                    <View style={styles.imagePreviewArea}>
                        {/* <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>{' '}</Text>
                            <Text style={[styles.rowTextLong,{fontSize:15,width:600,paddingTop:3}]}>{' '+imageUri.image}</Text>
                        </View> */}
                        <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>{' '}</Text>
                            <Image 
                                style={styles.imagePreview}
                                source={{ uri: imageUri.image}}
                                >
                            </Image>
                        </View>
                    </View>
                    ))
                    }
                    <View style={styles.requestRowContainer}>
                        <Text style={styles.rowTextError}>{this.state.error}</Text>                        
                    </View>
                </View>
                <TouchableOpacity style={styles.requestAddConfirmButton} onPress={() => this.completeUpdateResult()} disabled={!this.state.setResultImpageApi && !this.state.updateRequestApi}>
                    <Text style={{color:'white'}}>Cập nhật kết quả</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    }
}


const styles = StyleSheet.create({
    requestAddViewArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    requestAddTopMenuArea: {
        height:70,
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        padding:20,
        paddingLeft:200,
        marginTop:0,
        marginBottom:10,
    },
    requestAddArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:200,
        paddingRight:200,
    },
    requestAddContainer:{
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
        fontSize:18,
        fontWeight:'bold'
    },
    rowTextLong:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:500,
        fontSize:18,
    },
    requestTypeDropDown:{
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
    requestAddConfirmButton:{
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
        backgroundColor:'#25345D',
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
        width:600,
        height:600,
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
});
