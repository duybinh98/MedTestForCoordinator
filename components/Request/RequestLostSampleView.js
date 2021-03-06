import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {getApiUrl, convertDateTimeToDate, convertDateTimeToTime, componentWidth} from './../Common/CommonFunction'

export default class RequestLostSampleView extends Component  {
    constructor(props) {
        super(props)
        this.state = {      
            reason: '',
            error: '',
            errorList: ['','Phải điền lý do làm mất mẫu'],
            lostSampleApi: true,
        };
        this.handleChange = this.handleChange.bind(this)
        this.lostSample = this.lostSample.bind(this)
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
                // console.log(result)
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
                // console.log(error)
            }
        )  
    }

    lostSample(){
        if(this.checkValid()){
            this.callApiLostSample()
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

    callApiLostSample(){
        if(this.state.lostSampleApi){
            this.setState({lostSampleApi:false})
            fetch(getApiUrl()+'/requests/update/'+this.props.request.requestId, {
                method: 'POST',
                headers: {      
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.props.token,
                },
                body: JSON.stringify({
                    status: 'coordinatorlostsample',
                    userID: this.props.userInfo.id,
                    note: this.state.reason,
                }),
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({lostSampleApi:true})
                    // console.log('result:'+JSON.stringify(result))
                    let success = false
                    result ? result.message? null: success=true : null;
                    if (success) {
                        // let request = this.props.request
                        // request.requestStatus = 'coordinatorlostsample'
                        // this.props.setSelectedRequest(request)
                        // this.props.changeShowView('RequestView')
                        this.callApiDetail()
                    }
                    else{
                        this.setState({error:result.message})
                    }
                },
                (error) => {
                    this.setState({lostSampleApi:true})
                    // console.log('error:'+error)    
                }
            );
        }
        
    }


    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        // console.log('event name'+name+', event value:'+value)
        this.setState({[name]: value});
    }


    

    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.requestViewArea}>
            <View style={styles.requestTopMenuArea}>
                <Text style={{fontSize:25}}>Báo mất mẫu xét nghiệm: </Text>                
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
                        <Text style={styles.rowText}>{'Lý do mất mẫu: '}</Text>
                        <TextInput 
                            style={styles.rowTextInput}
                            multiline={true}
                            numberOfLines={4}
                            placeholder={'Điền lý do làm mất mẫu'}
                            name={"reason"}
                            onChange={this.handleChange}
                            value={this.state.reason}  
                            >                
                        </TextInput>
                    </View>
                    
                    <View style={styles.requestRowContainer}>
                        <Text style={styles.rowTextError}>{this.state.error}</Text>                        
                    </View>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.requestConfirmButton} onPress={() => this.props.changeShowView('RequestView')}>
                        <Text style={{color:'white'}}>Quay lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.requestConfirmButton} onPress={() => this.lostSample()} disabled={!this.state.lostSampleApi}>
                        <Text style={{color:'white'}}>Báo mất mẫu</Text>
                    </TouchableOpacity>
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
        fontSize:18,
        fontWeight:'bold',
    },
    rowTextLong:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:500,
        fontSize:17,
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
    requestConfirmButton:{
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
});
