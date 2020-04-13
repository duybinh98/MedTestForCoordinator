import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import PageHeader from './PageHeader'
import LoginView from './Authentication/LoginView'
import RequestListView from './Request/RequestListView'
import AppointmentListView from './Appointment/AppointmentListView'
import ArticleListView from './Article/ArticleListView'
import ArticleAddView from './Article/ArticleAddView'
import AccountListView from './AccountManagement/AccountListView'
import TestUpdateView from './Test/TestUpdateView'
import ArticleView from './Article/ArticleView'
import {getApiUrl} from './Common/CommonFunction'
import userList  from './../Data/userList'

export default class ListScreen extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            role: 'admin',
            // role: 'admin',
            Button1Selected: true,
            Button2Selected: false,
            Button3Selected: false,
            Button4Selected: false,
            Button5Selected: false,
            dataChanged: true,
            testList: [],
            requestList: null,
            appointmentList: null,
            articlesList: null,
            userList: null,
            districtList: null,
            showView: 'RequestListView',
            logIn: false,
            customerInfo: null,
            token: null,
            selectedArticle : null,
        };
        this.loginSuccess = this.loginSuccess.bind(this)
        this.menuButtonPress = this.menuButtonPress.bind(this)
        this.changeShowView = this.changeShowView.bind(this)
        this.setSelectedArticle = this.setSelectedArticle.bind(this)
    }

    
    componentDidMount(){
        this.callApiRequestList()
        this.callApiTestList()
        this.callApiArticleList()
        this.callApiUserList()
        this.callApiAppointmentList()
        this.callApiDistrictList()
        // setInterval(()=>{
        //     console.log('try again')
        //     this.callApiRequestList()
        //     this.callApiArticleList()
        //     this.callApiUserList()
        //     this.callApiAppointmentList()
        // },5000)
    }

    changeShowView(newView){
        
        this.setState(previousState => ({ 
            showView: newView,
        }))
    }

    setSelectedArticle(_article){
        
        this.setState(previousState => ({ 
            selectedArticle: _article,
        }))
    }

    loginSuccess(_customerInfo,_token){
        this.setState(previousState => ({ 
            logIn: true,
            customerInfo: _customerInfo,
            token: _token,
        }))
    }

    menuButtonPress(button){
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
        fetch(getApiUrl()+"/requests/list-all-request")
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result)
                let success = false
                result ? result.message? null : success=true : null;
                if (success)
                this.setState(previousState => ({
                    requestList: result,
                }));
            },            
            (error) => {
                console.log(error)
            }
        )
    }

    callApiAppointmentList= async () =>  {
        fetch(getApiUrl()+"/appointments/list")
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result)
                let success = false
                result ? result.message? null : success=true : null;
                if (success)
                this.setState(previousState => ({
                    appointmentList: result,
                }));
            },            
            (error) => {
                console.log(error)
            }
        )
    }

    callApiArticleList= async () =>  {
        fetch(getApiUrl()+"/articles/list")
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result)
                let success = false
                result ? result.message? null : success=true : null;
                if (success)
                this.setState(previousState => ({
                    articlesList: result,
                }));
            },            
            (error) => {
                console.log(error)
            }
        )
    }

    callApiUserList= async () =>  {
        fetch(getApiUrl()+"/users/list-all-user")
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result)
                let success = false
                result ? result.message? null : success=true : null;
                if (success)
                this.setState(previousState => ({
                    userList: result,
                }));
            },            
            (error) => {
                console.log(error)
            }
        )
    }
    
    callApiTestList = async () => {
        fetch(getApiUrl()+"/test-types/type-test")
        .then(res => res.json())
        .then(
            (result) => {
                // console.log(result)
                let success = false
                result ? result.message? null : success=true : null;
                if (success)
                this.setState(previousState => ({
                    testList: result,
                }));
            },            
            (error) => {
                console.log(error)
            }
        )  
    }

    callApiDistrictList = async () => {
        fetch(getApiUrl()+"/management/districts/list")
        .then(res => res.json())
        .then(
            (result) => {
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
            <PageHeader userName={this.state.customerInfo?this.state.customerInfo.name:null} imageUri={this.state.customerInfo?this.state.customerInfo.image:null}/>
            { !this.state.logIn ?
            <LoginView loginSuccess={this.loginSuccess}/>
            :
            <View style={styles.listAreaContainer}>
                <View style={styles.topMenu}>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        width: this.state.role=='coordinator'? WIDTH/4 : WIDTH/5 ,
                        borderWidth: this.state.Button1Selected ? 1:0,
                        backgroundColor: this.state.Button1Selected ? '#a8c6fa' : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('1')}
                    >
                        <Text style={styles.topMenuText}>Yêu cầu xét nghiệm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        width: this.state.role=='coordinator'? WIDTH/4 : WIDTH/5 ,
                        borderWidth: this.state.Button2Selected ? 1:0,
                        backgroundColor: this.state.Button2Selected ? '#a8c6fa' : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('2')}
                    >
                        <Text style={styles.topMenuText}>Cuộc Hẹn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        width: this.state.role=='coordinator'? WIDTH/4 : WIDTH/5 ,
                        borderWidth: this.state.Button3Selected ? 1:0,
                        backgroundColor: this.state.Button3Selected ? '#a8c6fa' : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('3')}
                    >
                        <Text style={styles.topMenuText}>Bài đăng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        width: this.state.role=='coordinator'? WIDTH/4 : WIDTH/5 ,
                        borderWidth: this.state.Button4Selected ? 1:0,
                        backgroundColor: this.state.Button4Selected ? '#a8c6fa' : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('4')}
                    >
                        <Text style={styles.topMenuText}>Test</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        width: this.state.role=='coordinator'? 0 : WIDTH/5 ,
                        borderWidth: this.state.Button5Selected ? 1:0,
                        backgroundColor: this.state.Button5Selected ? '#a8c6fa' : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('5')}
                    >
                        <Text style={styles.topMenuText}>Quản lý tài khoản</Text>
                    </TouchableOpacity>
                </View>                
                <View style={{width:'100%',flex:1,backgroundColor:''}}>
                {
                    this.state.showView == 'RequestListView'? 
                    <RequestListView requestList={this.state.requestList} testList={this.state.testList} districtList={this.state.districtList}/>                    
                    // <TestUpdateView  testList={this.state.testList}/>
                    : this.state.showView == 'AppointmentListView'? 
                    <AppointmentListView appointmentList={this.state.appointmentList} districtList={this.state.districtList}/>
                    : this.state.showView == 'ArticleListView'?
                    <ArticleListView  articleList={this.state.articlesList} changeShowView={this.changeShowView} setSelectedArticle={this.setSelectedArticle}/>
                    : this.state.showView == 'TestUpdateView'?
                    <TestUpdateView  testList={this.state.testList}/>
                    : this.state.showView == 'AccountListView'?
                    <AccountListView userList={this.state.userList} />
                    : this.state.showView == 'ArticleAddView'?
                    <ArticleAddView  />
                    : this.state.showView == 'ArticleView'?
                    <ArticleView  article={this.state.selectedArticle}/>
                    : null
                    
                }
                </View>
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '',
    },
    topMenu:{
        height: menuHeight,
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor:'white'
    },
    topMenuButton:{
        width: Dimensions.get('window').width/3,
        height: menuHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topMenuText:{
        fontSize:18,
    }

});
