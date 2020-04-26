import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, Picker, TouchableOpacity, Dimensions } from 'react-native';
import {screenWidth} from './Common/CommonFunction'

export default class ListScreen extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            requestId: ''
        }
        this.editProfile = this.editProfile.bind(this)
        this.logOut = this.logOut.bind(this)
        this.searchRequest = this.searchRequest.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    editProfile(){
        if (this.props.userInfo){
            const account= { 
            'accountId':this.props.userInfo.id, 
            'accountPhoneNumber':this.props.userInfo.phoneNumber,                      
            'accountName':this.props.userInfo.name,
            'accountDob':this.props.userInfo.dob,
            'accountAddress':this.props.userInfo.address,
            'accountPassword':this.props.userInfo.password,
            'accountActive':this.props.userInfo.active,
            'accountEmail':this.props.userInfo.email,
            'accountRole':this.props.userInfo.role,
            'accountGender':this.props.userInfo.gender,
            'accountImageUrl':this.props.userInfo.image,
            'accountTownCode':this.props.userInfo.townCode,
            'accountDistrictCode':this.props.userInfo.districtCode,
            }
            this.props.changeShowView?this.props.changeShowView('AccountView'):null
            this.props.changeShowView?this.props.setSelectedAccount(account):null
        }
    }

    logOut(){
        this.props.changeShowView?this.props.logOut():null
    }

    searchRequest(){
        this.props.userInfo?this.props.searchRequest(this.state.requestId):null
    }

    
    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        // console.log('event name'+name+', event value:'+value)
        this.setState({[name]: value});
    }


    render(){
    return (
        <ImageBackground  style={styles.headerContainer} 
            // source='https://i.imgur.com/jasoIoM.jpg'
            // resizeMode= 'center'
            resizeMode= 'stretch'
            >
            <View style={styles.leftArea}>
                <Image 
                    style={styles.imageIcon}
                    source={require('./../Data/Group 1.png')}>
                </Image>
                <View style={styles.leftContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{fontSize:25, fontWeight:'bold',color:'white'}}>MedTest</Text>
                    </View>
                    <View style={styles.hotlineContainer}>
                        <Text style={{fontSize:14}}>Hotline: 1900561252</Text>
                    </View>
                </View>
            </View>
            <View style={styles.middleArea}>
                {this.props.userInfo?
                <TextInput style={styles.searchInputContainer}
                placeholder={'Tìm xét nghiệm'}
                name="requestId"
                onChange={this.handleChange}
                value={this.state.requestId}
                onSubmitEditing={() => this.searchRequest()}
                >                
                </TextInput>
                :<View/>
                }
            </View>
            <View style={styles.rightArea}>
                {this.props.userInfo?
                <View style={styles.rightContainer}>
                    <TouchableOpacity style={{}} onPress={() => this.editProfile()}>
                        <Image 
                            style={{
                                width:100,
                                height:100,
                            }}
                            source={{uri:this.props.userInfo?this.props.userInfo.image:''}}>
                            
                        </Image>
                    </TouchableOpacity>
                    <View style={styles.nameContainer} >
                        <Text style={{fontSize:14,color:'white'}}>{this.props.userInfo?this.props.userInfo.name:''}</Text>
                    </View>
                    <TouchableOpacity style={styles.nameContainer} onPress={() => this.logOut()}>
                        <Text style={{fontSize:14,color:'white'}}>{this.props.userInfo?'Đăng xuất':''} </Text>
                    </TouchableOpacity>
                </View>
                :null}
            </View>

        </ImageBackground >
    );
  }
}

const headerHight=185

const styles = StyleSheet.create({
    headerContainer: {
        height:headerHight,
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#25345D',

    },
    leftArea:{
        height:headerHight,
        width:300,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',    
        backgroundColor:'',
        padding:20,
        
    },
    imageIcon:{
        width:100,
        height:100,
        // marginTop:5
    },
    leftContainer:{
        height:headerHight,
        width:180,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',    
        backgroundColor:'',
        paddingLeft:20,

    },
    titleContainer:{
        width:100,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor:'',
        marginBottom:10,
    },
    hotlineContainer:{
        height:35,
        width:150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
        borderWidth:1,
        marginTop:10,
    },
    middleArea:{
        height:headerHight,
        // flex:1,
        width: screenWidth-600,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',    
        padding:10,
        backgroundColor:''
    },
    searchInputContainer:{
        height:30,
        width:800,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:20,
        paddingLeft:20,
        marginTop:25,
    },
    rightArea:{
        height:headerHight,
        width:300,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',    
        padding:10,
        backgroundColor:'',
    },
    rightContainer:{
        height:headerHight-10,
        width:200,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',    
        padding:0,
        backgroundColor:'',
    },
    nameContainer:{
        height:30,
        width:140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
    }
});
