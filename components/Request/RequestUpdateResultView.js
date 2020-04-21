import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {getApiUrl, convertDateTimeToDate, convertDateTimeToTime} from './../Common/CommonFunction'
import appointmentList from './../../Data/appointmentList'
import districtList from './../../Data/districtList'
import userList from './../../Data/userList'
import * as ImagePicker from 'expo-image-picker';

export default class RequestUpdateResultView extends Component  {
    constructor(props) {
        super(props)
        this.state = {      
            // imageUriList: [{'image':'https://znews-photo.zadn.vn/w1024/Uploaded/jgtnrz/2020_03_23/Rebel_4.jpeg'}],
            imageUriList: [],
            requestTitle: '',
            requestShortContent: '',
            requestContent: '',
            error: '',
            errorList: ['','Bài viết chưa có ảnh min họa'],

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

    completeUpdateResult(){
        if(this.checkValid()){
            let index = this.state.imageUriList.length - 1;
            while (index >= 0) {
                this.callApiSetResultImage(this.state.imageUriList[index].image)
                index-=1
            }
            this.callApiUpdateRequest()
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

    callApiUpdateRequest(){
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
                console.log('result:'+JSON.stringify(result))
                let success = false
                result ? result.message? null: success=result.success : null;
                if (success) 
                this.props.changeShowView('RequestListView')
            },
            (error) => {
                console.log('error:'+error)    
            }
        );
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
                // console.log('result:'+JSON.stringify(result))
                // this.callApiSetResultImage(result.uri)
                let tempList = this.state.imageUriList
                tempList.push({'image':result.uri})
                // console.log(tempList)
                this.setState({ imageUriList: tempList });   
            },
            (error) => {
                console.log('error:'+error)    
            }
        );
    }

    callApiSetResultImage(imageUri){
        fetch(getApiUrl()+'/requests/detail/results/add', {
        method: 'POST',
        headers: {      
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+this.props.token,
        },
        body: JSON.stringify({
            image: imageUri,
            userID: this.props.userInfo.id,
            requestID: this.props.request.requestId
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result:'+JSON.stringify(result))
                let success = false
                result ? result.message? null: success=true : null;   
                if(success){
                    let tempList = this.state.imageUriList
                    tempList.push({'image':result.image})
                    console.log(tempList)
                    this.setState({ imageUriList: tempList });   
                }  
                setTimeout(() => {
                    console.log(this.state.imageUriList)
                }, 2000);
                        
            },
            (error) => {
                console.log('error:'+error)    
            }
        );
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
                        <Text style={styles.rowText}>{this.props.request?this.props.request.requestId:''}</Text>      
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Giờ tạo:</Text>      
                            <Text style={styles.rowText}>{this.props.request?convertDateTimeToDate(this.props.request.requestCreatedTime)+"   "+convertDateTimeToTime(this.props.request.requestCreatedTime):''}</Text>
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Người tạo:</Text> 
                            <Text style={[styles.rowText,{width:300}]}>{this.props.request?this.props.request.customerName:''}</Text>
                    </View>
                    <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>Số điện thoại:</Text>      
                            <Text style={styles.rowText}>{this.props.request?this.props.request.customerPhoneNumber:''}</Text> 
                    </View>
                    <View style={styles.requestRowContainer}>
                        <Text style={styles.rowText}>{'Ảnh kết quả: '}</Text>
                        <TouchableOpacity 
                        style={styles.addImageButton}
                        onPress={() => this.selectPicture()}
                        >
                            <Text>Chọn ảnh</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.imageUriList.length==0?null:
                    this.state.imageUriList.map(imageUri => (                        
                    <View style={styles.imagePreviewArea}>
                        <View style={styles.requestRowContainer}>
                            <Text style={styles.rowText}>{' '}</Text>
                            <Text style={[styles.rowText,{fontSize:15,width:600,paddingTop:3}]}>{' '+imageUri.image}</Text>
                        </View>
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
                <TouchableOpacity style={styles.requestAddConfirmButton} onPress={() => this.completeUpdateResult()}>
                    <Text>Tạo bài bài viết</Text>
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
        width:170,
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
        backgroundColor:'white',
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
    imagePreviewArea:{
        alignSelf: 'stretch',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin:0
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
});
