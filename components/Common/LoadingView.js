import React,{Component} from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Dimensions } from 'react-native';
import {screenWidth} from './CommonFunction'

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
            <View style={styles.textArea}>
                <Text>Hệ thống đang chạy, vui lòng đợi ...</Text>
            </View>
            

        </ImageBackground >
    );
  }
}

const centerHeight=600

const styles = StyleSheet.create({
    headerContainer: {
        height:centerHeight,
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
    },
    textArea:{
        backgroundColor:''
    }
});
