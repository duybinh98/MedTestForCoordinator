import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, TextInput, Picker} from 'react-native';
import {getRoleName, getApiUrl, convertDateToDateTime,componentWidth} from './../Common/CommonFunction'
// import DatePicker from 'react-native-date-picker'


export default class TestListView extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            accountName:'',
            accountPhoneNumber:'',    
            accountOldPassword: '',        
            accountPassword: '',
            accountRePassword: '',            
            error: '',
            errorList: ['',
                    'Mật khẩu cũ phải có ít nhất 6 kí tự',
                    'Mật khẩu mới phải có ít nhất 6 kí tự',
                    'Xác nhận mới mật khẩu không trùng với mật khẩu '],
        };
        this.handleChange = this.handleChange.bind(this)
        this.changePassword = this.changePassword.bind(this)
    }


    componentDidMount(){
        this.setState(previousState => ({ 
            accountName: this.props.account?this.props.account.accountName:'',
            accountPhoneNumber: this.props.account?this.props.account.accountPhoneNumber:'',
            error: '',
        }));
    }

    
    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                accountName: this.props.account?this.props.account.accountName:'',
                accountPhoneNumber: this.props.account?this.props.account.accountPhoneNumber:'',
                error: '',
            }));
        }
    }

    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        this.setState({[name]: value});
    }

    
    changePassword(){
        if(this.checkValid()){
            this.callApiChangePassword()
        }
    }

    checkAdmin(){
        if (this.props.userInfo.role == 'ADMIN') return true
        return false
    }
    
    checkValid(){    
        if (this.state.accountOldPassword == '' || this.state.accountOldPassword.length<6) 
            return this.setState(previousState => ({ 
                error: this.state.errorList[1]
            }));   
        if (this.state.accountPassword == '' || this.state.accountPassword.length<6) 
            return this.setState(previousState => ({ 
                error: this.state.errorList[2]
            }));
        if (this.state.accountRePassword != this.state.accountPassword) 
            return this.setState(previousState => ({ 
                error: this.state.errorList[3]
            }));
        this.setState(previousState => ({ 
                error: this.state.errorList[0]
        }));
        return true;
    }


    callApiChangePassword(){
        console.log(this.props.userInfo.id)
        let url = ''
        if (this.checkAdmin()) url = getApiUrl()+'/users/admin/change-password/'+this.props.userInfo.id
        else url = getApiUrl()+'/users/coordinators/change-password/'+this.props.userInfo.id
        fetch(url, {
        method: 'POST',
        headers: {      
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+this.props.token,
        },
        body: JSON.stringify({
            oldPassword: this.state.accountOldPassword,
            newPassword: this.state.accountPassword,
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result:'+JSON.stringify(result))
                let success = false
                result ? result.message? result.message == "Thay đổi mật khẩu thành công!"? success=true : null : null : null;
                if (success){
                    this.props.changeShowView('AccountView')
                }
                else{
                    this.setState({error:result.message})
                }
                
            },
            (error) => {
                console.log('error:'+error)    
            }
        );
    }


    render(){        
    return(        
        <View style={styles.accountCreateViewArea}>
            <View style={styles.accountCreateMenuArea}>
                <Text style={[styles.rowText,{fontSize:22,fontWeight:'bold',width:'100%'}]}>{"Thay đổi mật khẩu:"}</Text>   
            </View>
            
            <View style={styles.accountCreateArea}>
                <View style={styles.accountCreateContainer}>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Tên người dùng:</Text>
                        <Text style={styles.rowTextLong}>{this.state.accountName}</Text>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Số điện thoại:</Text>
                        <Text style={styles.rowText}>{this.state.accountPhoneNumber}</Text>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Mật khẩu cũ:</Text>
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập mật khẩu cũ'}
                            name="accountOldPassword"
                            onChange={this.handleChange}
                            value={this.state.accountOldPassword}
                            secureTextEntry={true}
                            >                
                        </TextInput>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Mật khẩu mới:</Text>
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập mật khẩu mới'}
                            name="accountPassword"
                            onChange={this.handleChange}
                            value={this.state.accountPassword}
                            secureTextEntry={true}
                            >                
                        </TextInput>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Xác nhận mật khẩu:</Text>
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Xác nhận lại mật khẩu'}
                            name="accountRePassword"
                            onChange={this.handleChange}
                            value={this.state.accountRePassword}
                            secureTextEntry={true}
                            >                
                        </TextInput>
                    </View>           
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowTextError}>{this.state.error}</Text>                        
                    </View>
                </View>    
            </View>
            <TouchableOpacity style={styles.accountCreateConfirmButton} onPress={()=>this.changePassword()}>
                    <Text style={{color:'white'}}>Đổi mật khẩu</Text>
                </TouchableOpacity>
        </View>
    );
    }
}
const styles = StyleSheet.create({
    accountCreateViewArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    accountCreateMenuArea: {
        height:70,
        width:componentWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        paddingTop:50,
        paddingBottom:50,
        marginTop:0,
        marginBottom:10,
    },    
    accountCreateArea:{
        width: componentWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom:10,
    },
    accountCreateContainer:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:5,
        backgroundColor:'white',
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 0,
    },
    accountCreateRowContainer:{
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
        fontSize:17,
        paddingTop:3,
    },
    rowTextLong:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:500,
        fontSize:17,
        paddingTop:3,
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
    accountTypeDropDown:{
        alignSelf: 'stretch',
        padding:3,
        width: 500,
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
    createTestButton:{
        height:30,
        width:200,
        backgroundColor:'#e6e6e6',
        borderRadius:5,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:100,
    },
    accountListFlatListArea:{        
        width:"100%",
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '',
    },
    accountListFlatList:{
        width:"100%",
        flex:1,
        flexDirection: 'column',
        backgroundColor: '',
        padding:20,
    },
    accountCreateConfirmButton:{
        height:50,
        width:200,
        backgroundColor:'#25345D',
        borderRadius:5,
        borderWidth:1,
        marginTop:30,
        marginBottom:50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
 

});