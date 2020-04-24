import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

import PageHeader from './PageHeader'
import PageFooter from './PageFooter'

import AccountListView from './AccountManagement/AccountListView'
import AccountCreateView from './AccountManagement/AccountCreateView'
import AccountView from './AccountManagement/AccountView'
import AccountChangePasswordView from './AccountManagement/AccountChangePasswordView'


import AppointmentListView from './Appointment/AppointmentListView'
import AppointmentView from './Appointment/AppointmentView'
import AppointmentRejectView from './Appointment/AppointmentRejectView'

import ArticleListView from './Article/ArticleListView'
import ArticleAddView from './Article/ArticleAddView'
import ArticleView from './Article/ArticleView'

import LoginView from './Authentication/LoginView'

import RequestListView from './Request/RequestListView'
import RequestView from './Request/RequestView'
import RequestLostSampleView from './Request/RequestLostSampleView'
import RequestUpdateResultView from './Request/RequestUpdateResultView'

import TestUpdateView from './Test/TestUpdateView'

import {getApiUrl} from './Common/CommonFunction'
import LoadingView from './Common/LoadingView'
import userList  from './../Data/userList'

export default class ListScreen extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            //screen function
            Button1Selected: true,
            Button2Selected: false,
            Button3Selected: false,
            Button4Selected: false,
            Button5Selected: false,
            dataChanged: true,
            showView: 'RequestListView',

            //authentication
            logIn: false,
            userInfo: null,
            // logIn: true,
            // userInfo: userList[0],
            token: '',
            
            //request
            requestList: null,
            requestListApi: true,
            selectedRequest: null,

            //appointment
            appointmentList: null,
            appointmentListApi: true,
            selectedAppointment: null,

            //article
            articleList: null,
            articleListApi: true,
            selectedArticle : null,

            //test
            testList: [],
            testListApi: true,
            testVersion: '',

            //account
            userList: null,
            userListApi: true,
            selectedAccount: null,

            //other data
            districtList: null,

        };
        this.loginSuccess = this.loginSuccess.bind(this)
        this.logOut = this.logOut.bind(this)
        this.searchRequest = this.searchRequest.bind(this)
        this.menuButtonPress = this.menuButtonPress.bind(this)
        this.changeShowView = this.changeShowView.bind(this)
        this.setSelectedArticle = this.setSelectedArticle.bind(this)
        this.setSelectedRequest = this.setSelectedRequest.bind(this)
        this.setSelectedAppointment = this.setSelectedAppointment.bind(this)
        this.setSelectedAccount = this.setSelectedAccount.bind(this)
        this.updateUserInfo = this.updateUserInfo.bind(this)
        this.searchUser = this.searchUser.bind(this)
        
    }

    
    componentDidMount(){
        // console.log(this.state.userInfo)
        // this.callApiRequestList()
        // this.callApiTestList()
        // this.callApiArticleList()
        // this.callApiUserList()
        // this.callApiAppointmentList()
        // this.callApiDistrictList()
        // setInterval(()=>{
        //     console.log('try again')
        //     this.callApiRequestList()
        //     this.callApiArticleList()
        //     this.callApiUserList()
        //     this.callApiAppointmentList()
        // },5000)
    }

    changeShowView(newView){
        if (newView=='RequestListView') this.menuButtonPress('1')
        if (newView=='AppointmentListView') this.menuButtonPress('2')
        if (newView=='ArticleListView') this.menuButtonPress('3')
        if (newView=='AccountListView') this.menuButtonPress('5')
        this.setState(previousState => ({ 
            showView: newView,
        }))
    }

    setSelectedArticle(_article){        
        this.setState(previousState => ({ 
            selectedArticle: _article,
        }))
    }

    setSelectedRequest(_request){        
        this.setState(previousState => ({ 
            selectedRequest: _request,
        }))
    }

    setSelectedAppointment(_appointment){    
        // console.log(_appointment)    
        this.setState(previousState => ({ 
            selectedAppointment: _appointment,
        }))
    }

    setSelectedAccount(_account){ 
        // console.log(_account)       
        this.setState(previousState => ({ 
            selectedAccount: _account,
        }))
    }

    updateUserInfo(_userInfo){
        this.setState(previousState => ({ 
            userInfo: _userInfo,
        }))
    }

    searchRequest(requestId){
        console.log(requestId)
        let request = null
        let index = this.state.requestList.length - 1;
        while (index >= 0) {
            // console.log(this.state.testListTemp[index].testTypeName+ ", "+this.state.testListTemp[index].testTypeID)
            if (this.state.requestList[index].requestID == requestId) {
                request = this.state.requestList[index]
                console.log(request)
                if(this.state.testVersion != request.versionOfTest){
                    fetch(getApiUrl()+"/tests/versions/list-all-test/"+request.versionOfTest,{
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: 'Bearer '+this.state.token,
                        }
                    })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            console.log(result)
                            let success = false
                            let list = []
                            result ? result.message? null : success=true : null;
                            if (success)
                            {
                                this.changeToRequestViewScreen(request,result.lsTests)
                                return false
                            }
                        },            
                        (error) => {
                            console.log(error)
                        }
                    )  
                }
                else this.changeToRequestViewScreen(request,this.state.testList);
            }
            index -= 1;
        }        
    }

    changeToRequestViewScreen(_request,testList){
        const request= { 
            "requestId": _request.requestID,
            "requestCreatedTime":_request.requestCreatedTime,
            "customerName":_request.customerName,
            "customerPhoneNumber":_request.customerPhoneNumber,
            "customerDOB":_request.customerDOB,
            "requestAddress":_request.requestAddress,
            "requestDistrictName":_request.requestDistrictName,
            "requestTownName": _request.requestTownName,
            "requestMeetingTime": _request.requestMeetingTime,
            "nurseName":_request.nurseName,
            "nurseID":_request.nurseID,
            "coordinatorName":_request.coordinatorName,
            "coordinatorId":_request.coordinatorID,
            "lsSelectedTest":_request.lsSelectedTest,
            "requestAmount":_request.requestAmount,
            "requestStatus":_request.requestStatus,
            "testList":testList,
            "requestTestVersion":_request.versionOfTest,
            }
        this.setSelectedRequest(request)
        this.changeShowView('RequestView')
    }

    searchUser(userPhoneNumber){
        console.log(userPhoneNumber)
        let account = null
        let index = this.state.userList.length - 1;
        while (index >= 0) {
            // console.log(this.state.testListTemp[index].testTypeName+ ", "+this.state.testListTemp[index].testTypeID)
            if (this.state.userList[index].phoneNumber == userPhoneNumber) {
                account = this.state.userList[index]
                console.log(account)
                this.changeToAccountViewScreen(account);
            }
            index -= 1;
        }   
    }

    changeToAccountViewScreen(_account){
        const account= { 
            'accountId':_account.id, 
            'accountPhoneNumber':_account.phoneNumber,                      
            'accountName':_account.name,
            'accountDob':_account.dob,
            'accountAddress':_account.address,
            'accountPassword':_account.password,
            'accountActive':_account.active,
            'accountEmail':_account.email,
            'accountRole':_account.role,
            'accountGender':_account.gender,
            'accountImageUrl':_account.image,
            'accountTownCode':_account.townCode,
            'accountDistrictCode':_account.districtCode,
            }
        this.setSelectedAccount(account)
        this.changeShowView('AccountView')

    }

    loginSuccess(_userInfo,_token){
        this.setState(previousState => ({ 
            logIn: true,
            userInfo: _userInfo,
            token: _token,
        }))
        setTimeout(() => {
            this.callApiRequestList()
            this.callApiTestList()
            this.callApiArticleList()
            this.callApiUserList()
            this.callApiAppointmentList()
            this.callApiDistrictList()
        }, 10);
    }

    logOut(){
        this.setState(previousState => ({ 
            logIn: false,
            userInfo: null,
            token: null,
        }))
    }

    menuButtonPress(button){
        if (button=="1") this.callApiRequestList()
        if (button=="2") this.callApiAppointmentList()
        if (button=="3") this.callApiArticleList()
        if (button=="5") this.callApiUserList()
        this.setState(previousState => ({ 
            Button1Selected: button=="1"?true:false,
            Button2Selected: button=="2"?true:false,
            Button3Selected: button=="3"?true:false,
            Button4Selected: button=="4"?true:false,
            Button5Selected: button=="5"?true:false,
            showView:   button=="1"? 'RequestListView': 
                        button=="2"? 'AppointmentListView': 
                        button=="3"? 'ArticleListView':  
                        button=="4"? 'TestUpdateView':  
                        button=="5"? 'AccountListView': 'RequestListView'
                        ,
            dataChanged: !this.state.dataChanged,
        }))
    }


    callApiRequestList= async () => {
        if(this.state.requestListApi){
            this.setState(previousState => ({
                requestListApi: false,
            }));
            fetch(getApiUrl()+"/requests/list-all-request",{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.state.token,
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    let success = false
                    result ? result.message? null : success=true : null;
                    if (success)
                    this.setState(previousState => ({
                        requestList: result,
                        requestListApi: true,
                    }));
                },            
                (error) => {
                    console.log(error)
                }
            )
        }
    }

    callApiAppointmentList= async () =>  {
        if(this.state.appointmentListApi){
            this.setState(previousState => ({
                appointmentListApi: false,
            }));
            fetch(getApiUrl()+"/appointments/list",{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.state.token,
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    let success = false
                    result ? result.message? null : success=true : null;
                    if (success)
                    this.setState(previousState => ({
                        appointmentList: result,
                        appointmentListApi: true,
                    }));
                },            
                (error) => {
                    console.log(error)
                }
            )
        }
        
    }

    callApiArticleList= async () =>  {
        if(this.state.articleListApi){
            this.setState(previousState => ({
                articleListApi: true,
            }));
            fetch(getApiUrl()+"/articles/list")
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result)
                    let success = false
                    result ? result.message? null : success=true : null;
                    if (success)
                    this.setState(previousState => ({
                        articleList: result,
                        articleListApi: true,
                    }));
                },            
                (error) => {
                    console.log(error)
                }
            )
        }
        
    }

    callApiUserList= async () =>  {
        if(this.state.userListApi){
            this.setState(previousState => ({
                userListApi: false,
            }));
            fetch(getApiUrl()+"/users/list-all-user",{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.state.token,
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    let success = false
                    result ? result.message? null : success=true : null;
                    if (success)
                    this.setState(previousState => ({
                        userList: result,
                        userListApi: true,
                    }));
                },            
                (error) => {
                    console.log(error)
                }
            )
        }
        
    }
    
    callApiTestList = async () => {
        if(this.state.testListApi){
            this.setState(previousState => ({
                testListApi: false,
            }));
            fetch(getApiUrl()+"/tests/versions/lastest-version-test/",{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.state.token,
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    let success = false
                    result ? result.message? null : success=true : null;
                    if (success)
                    this.setState(previousState => ({
                        testList: result.lsTests,
                        testVersion: result.versionID,
                        testListApi: true,
                    }));
                },
                (error) => {
                    console.log(error)
                }
            )  
        }
    }

    callApiDistrictList = async () => {
        fetch(getApiUrl()+"/management/districts/district-town-list")
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result)
                let success = false
                result ? result.message? null : success=true : null;
                if (success)
                this.setState(previousState => ({
                    districtList: result,
                }));
            },            
            (error) => {
                console.log(error)
            }
        )  
    }

    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={{flex:1}}>
            <PageHeader userInfo={this.state.userInfo?this.state.userInfo:null} changeShowView={this.state.userInfo?this.changeShowView:null}  setSelectedAccount={this.state.userInfo?this.setSelectedAccount:null} logOut={this.state.userInfo?this.logOut:null} searchRequest={this.searchRequest}/>
            { !this.state.logIn ?
            <LoginView loginSuccess={this.loginSuccess}/>
            :
            <View style={styles.listAreaContainer}>
                <View style={styles.topMenu}>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        width: this.state.userInfo.role=='COORDINATOR'? WIDTH/4 : WIDTH/parseFloat(5) ,
                        borderWidth: this.state.Button1Selected ? 1:0,
                        backgroundColor: this.state.Button1Selected ? '#a8c6fa' : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('1')}
                    >
                        <Text style={styles.topMenuText}>Yêu cầu xét nghiệm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        width: this.state.userInfo.role=='COORDINATOR'? WIDTH/4 : WIDTH/parseFloat(5) ,
                        borderWidth: this.state.Button2Selected ? 1:0,
                        backgroundColor: this.state.Button2Selected ? '#a8c6fa' : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('2')}
                    >
                        <Text style={styles.topMenuText}>Cuộc Hẹn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        width: this.state.userInfo.role=='COORDINATOR'? WIDTH/4 : WIDTH/parseFloat(5) ,
                        borderWidth: this.state.Button3Selected ? 1:0,
                        backgroundColor: this.state.Button3Selected ? '#a8c6fa' : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('3')}
                    >
                        <Text style={styles.topMenuText}>Bài đăng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        width: this.state.userInfo.role=='COORDINATOR'? WIDTH/4 : WIDTH/parseFloat(5) ,
                        borderWidth: this.state.Button4Selected ? 1:0,
                        backgroundColor: this.state.Button4Selected ? '#a8c6fa' : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('4')}
                    >
                        <Text style={styles.topMenuText}>Test</Text>
                    </TouchableOpacity>
                    {this.state.userInfo.role=='COORDINATOR'? null :
                    <TouchableOpacity style={[styles.topMenuButton,{
                        width: this.state.userInfo.role=='COORDINATOR'? 0 : WIDTH/parseFloat(5) ,
                        borderWidth: this.state.Button5Selected ? 1:0,
                        backgroundColor: this.state.Button5Selected ? '#a8c6fa' : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('5')}
                        >
                        <Text style={styles.topMenuText}>Quản lý tài khoản</Text>
                    </TouchableOpacity>
                    }
                </View>                
                <View style={{width:'100%',flex:1,backgroundColor:''}}>
                {
                    this.state.showView == 'RequestListView'? this.state.requestListApi?
                    <RequestListView requestList={this.state.requestList} testVersion={this.state.testVersion} changeShowView={this.changeShowView} setSelectedRequest={this.setSelectedRequest} districtList={this.state.districtList} token={this.state.token}/>: <LoadingView  />
                    : this.state.showView == 'AppointmentListView'? this.state.appointmentListApi?
                    <AppointmentListView appointmentList={this.state.appointmentList} changeShowView={this.changeShowView} setSelectedAppointment={this.setSelectedAppointment} districtList={this.state.districtList}/>: <LoadingView  />
                    : this.state.showView == 'ArticleListView'? this.state.articleListApi?
                    <ArticleListView  articleList={this.state.articleList} changeShowView={this.changeShowView} setSelectedArticle={this.setSelectedArticle}/>: <LoadingView  />
                    : this.state.showView == 'TestUpdateView'?
                    <TestUpdateView  testList={this.state.testList} userInfo={this.state.userInfo} token={this.state.token}/>
                    : this.state.showView == 'AccountListView'? this.state.userListApi?
                    <AccountListView userList={this.state.userList}  changeShowView={this.changeShowView} setSelectedAccount={this.setSelectedAccount} searchUser={this.searchUser}/>: <LoadingView  />
                    // sub screen
                    //request
                    : this.state.showView == 'RequestView'?
                    <RequestView  request={this.state.selectedRequest} testList={this.state.testList} userInfo={this.state.userInfo} changeShowView={this.changeShowView} token={this.state.token}/>
                    : this.state.showView == 'RequestLostSampleView'?
                    <RequestLostSampleView  request={this.state.selectedRequest} userInfo={this.state.userInfo} changeShowView={this.changeShowView} token={this.state.token}/>
                    : this.state.showView == 'RequestUpdateResultView'?
                    <RequestUpdateResultView  request={this.state.selectedRequest} userInfo={this.state.userInfo} changeShowView={this.changeShowView} token={this.state.token}/>
                    //appointment
                    : this.state.showView == 'AppointmentView'?
                    <AppointmentView  appointment={this.state.selectedAppointment} userInfo={this.state.userInfo} changeShowView={this.changeShowView} token={this.state.token}/>
                    : this.state.showView == 'AppointmentRejectView'?
                    <AppointmentRejectView appointment={this.state.selectedAppointment} userInfo={this.state.userInfo} changeShowView={this.changeShowView} token={this.state.token}/>
                    //article
                    : this.state.showView == 'ArticleAddView'?
                    <ArticleAddView   token={this.state.token}  userInfo={this.state.userInfo} changeShowView={this.changeShowView} />
                    : this.state.showView == 'ArticleView'?
                    <ArticleView  article={this.state.selectedArticle} />
                    //account
                    : this.state.showView == 'AccountCreateView'?
                    <AccountCreateView  districtList={this.state.districtList} token={this.state.token}/>
                    : this.state.showView == 'AccountView'?
                    <AccountView  districtList={this.state.districtList}  account={this.state.selectedAccount} changeShowView={this.changeShowView} token={this.state.token} userInfo={this.state.userInfo} updateUserInfo={this.updateUserInfo}/>
                    : this.state.showView == 'AccountChangePasswordView'?
                    <AccountChangePasswordView account={this.state.selectedAccount} changeShowView={this.changeShowView} token={this.state.token} userInfo={this.state.userInfo} />
                    : <View/>
                    
                }
                </View>
                <PageFooter/>
            </View>
            }
        </View>
    );
    }
}

const menuHeight= 50

const styles = StyleSheet.create({
    listAreaContainer: {
        flex: 1,
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '',
    },
    topMenu:{
        height: menuHeight,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'white'
    },
    topMenuButton:{
        width: Dimensions.get('window').width/parseFloat(5),
        height: menuHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topMenuText:{
        fontSize:18,
    }

});
