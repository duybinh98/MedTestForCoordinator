import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput, Dimensions} from 'react-native';
import {getApiUrl} from './../Common/CommonFunction'

export default class Login extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            phoneNumber: '',
            password:'',
            error: ' ',
            errorList: [' ','Phải điền số điện thoại', 'Phải điền mật khẩu']
        };
        this.callApiLogin = this.callApiLogin.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        
    }


    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        // console.log('event name'+name+', event value:'+value)
        this.setState({[name]: value});
    }

    login(){
        if(this.checkValid()){
            this.callApiLogin()
        }    
    }

    
    checkValid(){     
        if (this.state.phoneNumber == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[1]
            }));
        if (this.state.password == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[2]
            }));
        this.setState(previousState => ({ 
                error: this.state.errorList[0]
        }));
        return true;
        
    }

    callApiLogin(){
        fetch(getApiUrl()+"/users/coordinators/login",{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber: this.state.phoneNumber,
                password: this.state.password,
                role:'COORDINATOR'
            }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                let success = false
                result ? result.message? null : success=true : null;
                if (success) this.props.loginSuccess(result.customerInfo,result.token)
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
            <View style={styles.loginViewArea}>
                <View style={styles.titleContainer}>
                    <Text style={{fontSize:23,fontWeight:'bold'}}>Đăng nhập</Text>
                </View>
                <View style={styles.rowContainer}>    
                    <Text style={styles.rowText}>{'Số điện thoại'}</Text>
                    <TextInput 
                        style={styles.rowTextInput}
                        name={"phoneNumber"}
                        onChange={this.handleChange}
                        value={this.state.phoneNumber}
                        >                
                    </TextInput>     
                </View>
                <View style={styles.rowContainer}>    
                    <Text style={styles.rowText}>{'Mật khẩu'}</Text>
                    <TextInput 
                        style={styles.rowTextInput}
                        name={"password"}
                        onChange={this.handleChange}
                        value={this.state.password}
                        secureTextEntry={true}
                        >                
                    </TextInput>     
                </View>
                <View style={styles.rowContainer}>    
                    <Text style={styles.rowTextError}>{this.state.error}</Text>                         
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => this.login()}>
                    <Text>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    }
}

const styles = StyleSheet.create({
    loginViewArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
        paddingTop:70,
    },
    titleContainer:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding:20,
        marginBottom:20,

    },
    rowContainer:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        padding:20,
    },
    rowText:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:130,
        fontSize:18,
    },
    rowTextInput:{
        alignSelf: 'stretch',
        padding:3,
        width: 400,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:5,
        paddingLeft:10,        
    },
    loginButton:{
        height:50,
        width:200,
        backgroundColor:'white',
        borderRadius:5,
        borderWidth:1,
        marginTop:20,
        marginBottom:50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowTextError:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize:13,
        color:'red',        
    },

});
