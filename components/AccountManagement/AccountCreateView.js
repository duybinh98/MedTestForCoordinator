import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, TextInput, Picker} from 'react-native';
import {getRoleName, getApiUrl, convertDateToDateTime} from './../Common/CommonFunction'
import * as ImagePicker from 'expo-image-picker';


export default class TestListView extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            accountName:'',
            accountPhoneNumber:'',
            accountEmail:'',
            accountDob: '',
            accountGender: '',
            accountPassword: '',
            accountRePassword: '',
            districtList: this.props.districtList?this.props.districtList:[],
            townList: this.props.districtList?this.props.districtList[0].listTown:[],
            districtSelected: this.props.districtList?this.props.districtList[0].districtCode:'none',
            townSelected: this.props.districtList?this.props.districtList[0].listTown[0]?this.props.districtList[0].listTown[0].townCode:'none':'none',
            accountAddress: '',
            accountRole: '',
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            accountImage: 'https://www.kindpng.com/picc/m/10-104902_simple-user-icon-user-icon-white-png-transparent.png',
            error: '',
            errorList: ['',
                    'Tên chủ tài khoản không được bỏ trống',
                    'Số điện thoại phải có mười số',
                    'Địa chỉ email không được bỏ trống',
                    'Mật khẩu phải có ít nhất 6 kí tự',
                    'Xác nhận mật khẩu không trùng với mật khẩu ',
                    'Địa chỉ không được bỏ trống'],
        };
        this.handleChange = this.handleChange.bind(this)
        this.onDistrictChange = this.onDistrictChange.bind(this)
        this.createNumberPickerList = this.createNumberPickerList.bind(this)
        this.getNumberOfDayInMonth = this.getNumberOfDayInMonth.bind(this)
        this.createAccount = this.createAccount.bind(this)
    }


    componentDidMount(){
        this.setState(previousState => ({ 
            districtList: this.props.districtList?this.props.districtList:[],
            townList: this.props.districtList?this.props.districtList[0].listTown:[],
            districtSelected: this.props.districtList?this.props.districtList[0].districtCode:'none',
            townSelected: this.props.districtList?this.props.districtList[0].listTown[0]?this.props.districtList[0].listTown[0].townCode:'none':'none',
            accountImage: 'https://www.kindpng.com/picc/m/10-104902_simple-user-icon-user-icon-white-png-transparent.png',
            error: '',
        }));
    }

    
    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                districtList: this.props.districtList?this.props.districtList:[],
                townList: this.props.districtList?this.props.districtList[0].listTown:[],
                districtSelected: this.props.districtList?this.props.districtList[0].districtCode:'none',
                townSelected: this.props.districtList?this.props.districtList[0].listTown[0]?this.props.districtList[0].listTown[0].townCode:'none':'none',
                accountImage: 'https://www.kindpng.com/picc/m/10-104902_simple-user-icon-user-icon-white-png-transparent.png',
                error: '',
            }));
        }
    }

    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        this.setState({[name]: value});
    }

    onDistrictChange(districtId){
        this.setState({
            districtSelected:districtId,                  
        })
        let index = this.state.districtList.length - 1;
        while (index >= 0) {
            if (this.state.districtList[index].districtCode == districtId){
                this.setState({
                    townList:  this.state.districtList[index].listTown,
                    townSelected: this.state.districtList[index].listTown[0]?this.state.districtList[index].listTown[0].townCode:'none'              
                })
                index = 0;
            }
            index -= 1;
        }        
    }

    getFebDay(){        
        const year = this.state.year
        if (year % 400 == 0 ) return 29
        if (year % 100 == 0 ) return 28
        if (year % 4 == 0) return 29
        return 28
    }

    getNumberOfDayInMonth(month){
        switch (month) {
            case '1':
            case '3':
            case '5':
            case '7':
            case '8':
            case '10':
            case '12':
                return 31;
                break;
            case '4':
            case '6':
            case '9':
            case '11':
                return 30;
                break;
            case '2':
                return this.getFebDay();
                break;
            
        }   
    }

    createNumberPickerList(start,end,startToEnd){
        let result = [];
        if(startToEnd){
            for (let i = start; i <= end; i++)  (
                result.push(<Picker.Item label={i.toString()} value={i.toString()} />)
            )  
        }
        else{
            for (let i = end; i >= start; i--)  (
                result.push(<Picker.Item label={i.toString()} value={i.toString()} />)
            )  
        }
        return result
    }

    getDob(){
        let result = ''
        if(parseInt(this.state.month)<10)
            if(parseInt(this.state.day)<10) return result = '0'+this.state.day+'/0'+this.state.month+'/'+this.state.year
            else result = ''+this.state.day+'/0'+this.state.month+'/'+this.state.year
        else
            if(parseInt(this.state.day)<10) return result = '0'+this.state.day+'/'+this.state.month+'/'+this.state.year
            else result = ''+this.state.day+'/'+this.state.month+'/'+this.state.year
        return result
    }

    
    createAccount(){
        // console.log(this.state.accountRole)
        if(this.checkValid()){
            this.callApiCreateAccount()
        }
    }

    
    checkValid(){        
        if (this.state.accountName == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[1]
            }));
        if (this.state.accountPhoneNumber == '' ||  this.state.accountPhoneNumber.length<10) 
            return this.setState(previousState => ({ 
                error: this.state.errorList[2]
            }));
        
        if (this.state.accountEmail == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[3]
            }));
        if (this.state.accountPassword == '' || this.state.accountPassword.length<6) 
            return this.setState(previousState => ({ 
                error: this.state.errorList[4]
            }));
        if (this.state.accountRePassword != this.state.accountPassword) 
            return this.setState(previousState => ({ 
                error: this.state.errorList[5]
            }));
        if (this.state.accountAddress == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[6]
            }));
        this.setState(previousState => ({ 
                error: this.state.errorList[0]
        }));
        return true;
    }


    callApiCreateAccount(){
        fetch(getApiUrl()+'/users/create-employee', {
        method: 'POST',
        headers: {      
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+this.props.token,
        },
        body: JSON.stringify({
            name: this.state.accountName,
            phoneNumber: this.state.accountPhoneNumber,
            email: this.state.accountEmail,
            dob: convertDateToDateTime(this.getDob()),
            gender: this.state.accountGender,
            password: this.state.accountPassword,
            districtCode: this.state.districtSelected,
            townCode: this.state.townSelected,
            address: this.state.accountAddress,
            role: this.state.accountRole,
            image: this.state.accountImage
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result:'+JSON.stringify(result))
                let success = false
                result ? result.message? null : success=true : null;
                if (success)
                this.props.changeShowView('AccountListView')
            },
            (error) => {
                console.log('error:'+error)    
            }
        );
    }



    selectPicture = async () =>{
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
                console.log('result:'+JSON.stringify(result))
                this.setState({ accountImage: result.uri });
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
                <Text style={[styles.rowText,{fontSize:22,fontWeight:'bold',width:'100%'}]}>{"Tạo nhân viên mới: "}</Text>   
            </View>
            
            <View style={styles.accountCreateArea}>
                <View style={styles.accountCreateContainer}>
                    {/* <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>{'Ảnh đại diện: '}</Text>
                        <TouchableOpacity 
                        style={styles.addImageButton}
                        onPress={() => this.selectPicture()}
                        >
                            <Text style={{color:'white'}}>Chọn ảnh</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.imagePreviewArea}>
                        <View style={styles.accountCreateRowContainer}>
                            <Text style={styles.rowText}>{' '}</Text>
                            <TouchableOpacity onPress={() => this.selectPicture()}
                            >
                                <Image 
                                    style={styles.imagePreview}
                                    source={{ uri: this.state.accountImage}}
                                    >
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Tên nhân viên:</Text>
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập tên nhân viên'}
                            name={"accountName"}
                            onChange={this.handleChange}
                            value={this.state.accountName}
                            >                
                        </TextInput>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Số điện thoại:</Text>
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập số điện thoại của nhân viên'}
                            name="accountPhoneNumber"
                            onChange={this.handleChange}
                            value={this.state.accountPhoneNumber}
                            >                
                        </TextInput>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Địa chỉ email:</Text>
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập địa chỉ email của nhân viên'}
                            name="accountEmail"
                            onChange={this.handleChange}
                            value={this.state.accountEmail}
                            >                
                        </TextInput>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Ngày sinh: </Text>
                        <Picker
                            selectedValue={this.state.day}
                            style={[styles.accountTypeDropDown,{width:50,marginRight:15}]}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                day:itemValue,
                            })}                    
                            >
                            {this.createNumberPickerList(1,this.getNumberOfDayInMonth(this.state.month.toString()),true)}
                        </Picker>
                        <Picker
                            selectedValue={this.state.month}
                            style={[styles.accountTypeDropDown,{width:50,marginRight:15}]}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                day: this.getNumberOfDayInMonth(itemValue)<this.state.day?'1':this.state.day,
                                month:itemValue,
                            })}                    
                            >
                            {this.createNumberPickerList(1,12,true)}
                        </Picker>
                        <Picker
                            selectedValue={this.state.year}
                            style={[styles.accountTypeDropDown,{width:80}]}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                year:itemValue,
                            })}                    
                            >
                            {this.createNumberPickerList(1920,new Date().getFullYear(),false)}
                        </Picker>
                        
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Giới tính:</Text>
                        <Picker
                            selectedValue={this.state.accountGender}
                            style={styles.accountTypeDropDown}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                accountGender:itemValue,
                            })}                    
                            >
                            <Picker.Item label={'Nam'} value={'1'} />
                            <Picker.Item label={'Nữ'} value={'0'} />
                        </Picker>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Mật khẩu:</Text>
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập mật khẩu'}
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
                        <Text style={styles.rowText}>Quận/huyện:</Text>
                        <Picker
                            selectedValue={this.state.districtSelected}
                            style={styles.accountTypeDropDown}
                            onValueChange={(itemValue, itemIndex) => this.onDistrictChange(itemValue)}                    
                            >
                            {this.state.districtList?this.state.districtList.map(district => (
                            <Picker.Item label={district.districtName} value={district.districtCode} />))
                            : null }
                        </Picker>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Phường/xã:</Text>
                        <Picker
                            selectedValue={this.state.townSelected}
                            style={styles.accountTypeDropDown}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                townSelected:itemValue,
                            })}                    
                            >
                            {this.state.townList?this.state.townList.map(town => (
                            <Picker.Item label={town.townName} value={town.townCode} />
                            )): null}
                        </Picker>
                    </View>
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Địa chỉ chi tiết:</Text>
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập địa chỉ chi tiết: số nhà, đường, thôn, ..'}
                            name="accountAddress"
                            onChange={this.handleChange}
                            value={this.state.accountAddress}
                            >                
                        </TextInput>
                    </View> 
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowText}>Vị trí nhân viên:</Text>
                        <Picker
                            selectedValue={this.state.accountRole}
                            style={styles.accountTypeDropDown}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                accountRole:itemValue,
                            })}                    
                            >
                            <Picker.Item label={'Y tá'} value={'NURSE'} />
                            <Picker.Item label={'Điều phối viên'} value={'COORDINATOR'} />
                            <Picker.Item label={'Quản trị hệ thống'} value={'ADMIN'} />
                        </Picker>
                    </View> 
                    <View style={styles.accountCreateRowContainer}>
                        <Text style={styles.rowTextError}>{this.state.error}</Text>                        
                    </View>
                </View>    
            </View>
            <TouchableOpacity style={styles.accountCreateConfirmButton} onPress={()=>this.createAccount()}>
                    <Text style={{color:'white'}}>Tạo tài khoản nhân viên</Text>
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
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        padding:50,
        paddingLeft:200,
        paddingRight:200,
        marginTop:0,
        marginBottom:10,
    },    
    accountCreateArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:200,
        paddingRight:200,
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
        fontWeight:'bold'
        
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
    imagePreviewArea:{
        alignSelf: 'stretch',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        margin:0
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
    imagePreview:{
        width:200,
        height:200,
        backgroundColor:''
    },
 

});