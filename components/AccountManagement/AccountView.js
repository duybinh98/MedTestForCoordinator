import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity, TextInput, Picker} from 'react-native';
import {getRoleName, getApiUrl, convertDateToDateTime, componentWidth} from './../Common/CommonFunction'
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
            accountActive: '',
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate(),
            accountImage: 'https://www.kindpng.com/picc/m/10-104902_simple-user-icon-user-icon-white-png-transparent.png',
            error: '',
            errorList: ['','Tên chủ tài khoản không được bỏ trống','Địa chỉ email không được bỏ trống', 'Địa chỉ không được bỏ trống'],

        };
        this.handleChange = this.handleChange.bind(this)
        this.onDistrictChange = this.onDistrictChange.bind(this)
        this.createNumberPickerList = this.createNumberPickerList.bind(this)
        this.getNumberOfDayInMonth = this.getNumberOfDayInMonth.bind(this)
        this.updateAccountInformation = this.updateAccountInformation.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
        this.checkCurrentUser = this.checkCurrentUser.bind(this)
        this.checkAdmin = this.checkAdmin.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.getDob = this.getDob.bind(this)
        this.getDistrictName = this.getDistrictName.bind(this)
        this.getTownName = this.getTownName.bind(this)

    }

    componentDidMount(){
        // console.log('')
        this.setState(previousState => ({ 
            districtList: this.props.districtList?this.props.districtList:[],
            townList: this.props.districtList?this.props.districtList[0].listTown:[],
            districtSelected: this.props.account?this.props.account.accountDistrictCode:this.props.districtList?this.props.districtList[0].districtCode:'none',
            townSelected: this.props.account?this.props.account.accountTownCode:this.props.districtList?this.props.districtList[0].listTown[0]?this.props.districtList[0].listTown[0].townCode:'none':'none',
            accountName: this.props.account?this.props.account.accountName:'',
            accountPhoneNumber: this.props.account?this.props.account.accountPhoneNumber:'',
            accountEmail: this.props.account?this.props.account.accountEmail:'',
            accountDob: this.props.account?this.props.account.accountDob:'',
            accountGender: this.props.account?this.props.account.accountGender:'',
            accountRole: this.props.account?this.props.account.accountRole:'',
            accountAddress: this.props.account?this.props.account.accountAddress:'',
            accountActive: this.props.account?this.props.account.accountActive:'',
            accountImage: this.props.account?this.props.account.accountImageUrl:'https://www.kindpng.com/picc/m/10-104902_simple-user-icon-user-icon-white-png-transparent.png',
            year: this.props.account?this.props.account.accountDob? this.props.account.accountDob.substring(0,4):'2020':'2020',
            month: this.props.account?this.props.account.accountDob? parseInt(this.props.account.accountDob.substring(5,7)).toString():'2020':'2020',
            day: this.props.account?this.props.account.accountDob? parseInt(this.props.account.accountDob.substring(8,10)).toString():'2020':'2020',
            error: '',
        }));
    }
    
    componentDidUpdate  (prevProps, prevState) {        
        if (prevProps !== this.props) {
            this.setState(previousState => ({ 
            districtList: this.props.districtList?this.props.districtList:[],
            townList: this.props.districtList?this.props.districtList[0].listTown:[],
            districtSelected: this.props.account?this.props.account.accountDistrictCode:this.props.districtList?this.props.districtList[0].districtCode:'none',
            townSelected: this.props.account?this.props.account.accountTownCode:this.props.districtList?this.props.districtList[0].listTown[0]?this.props.districtList[0].listTown[0].townCode:'none':'none',
            accountName: this.props.account?this.props.account.accountName:'',
            accountPhoneNumber: this.props.account?this.props.account.accountPhoneNumber:'',
            accountEmail: this.props.account?this.props.account.accountEmail:'',
            accountDob: this.props.account?this.props.account.accountDob:'',
            accountGender: this.props.account?this.props.account.accountGender:'',
            accountRole: this.props.account?this.props.account.accountRole:'',
            accountAddress: this.props.account?this.props.account.accountAddress:'',
            accountActive: this.props.account?this.props.account.accountActive:'',
            accountImage: this.props.account?this.props.account.accountImageUrl:'https://www.kindpng.com/picc/m/10-104902_simple-user-icon-user-icon-white-png-transparent.png',
            year: this.props.account?this.props.account.accountDob? this.props.account.accountDob.substring(0,4):'2020':'2020',
            month: this.props.account?this.props.account.accountDob? parseInt(this.props.account.accountDob.substring(5,7)).toString():'2020':'2020',
            day: this.props.account?this.props.account.accountDob? parseInt(this.props.account.accountDob.substring(8,10)).toString():'2020':'2020',
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

    resetPassword(){
        console.log(this.props.account.accountId),
        console.log(this.props.userInfo.id),
        fetch(getApiUrl()+'/users/reset-password/'+this.props.account.accountId, {
        method: 'POST',
        headers: {      
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+this.props.token,
            
        },
        body: JSON.stringify({
            userProcessingID: this.props.userInfo.id
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result:'+JSON.stringify(result))
                let success = false
                result ? result.message?  success=true : null : null;
                if (success)
                    this.props.changeShowView('AccountListView')
            },
            (error) => {
                console.log('error:'+error)    
            }
        );
    }

    changePassword(){
        this.props.changeShowView('AccountChangePasswordView')
    }

    updateAccountInformation(){
        if(this.checkValid()){
            this.callApiUpdateAccountInfo()
        }
    }

    checkValid(){        
        if (this.state.accountName == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[1]
            }));
        if (this.state.accountEmail == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[2]
            }));
        if (this.state.accountAddress == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[3]
            }));
        this.setState(previousState => ({ 
                error: this.state.errorList[0]
        }));
        return true;
    }

    callApiUpdateAccountInfo(){
        fetch(getApiUrl()+'/users/update-user/'+this.props.account.accountId, {
        method: 'POST',
        headers: {      
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+this.props.token,
        },
        body: JSON.stringify({
            name: this.state.accountName,
            dob: convertDateToDateTime(this.getDob()),
            address: this.state.accountAddress,
            active: this.state.accountActive,
            email: this.state.accountEmail,
            gender: this.state.accountGender,
            townCode: this.state.townSelected,
            districtCode: this.state.districtSelected,
            image: this.state.accountImage
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result:'+JSON.stringify(result))
                let success = false
                result ? result.message? null : success=true : null;
                if (success) {
                    if (this.checkCurrentUser()) this.props.updateUserInfo(result)
                    // this.props.changeShowView('AccountListView')
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
                // console.log('result:'+JSON.stringify(result))
                this.setState({ accountImage: result.uri });
            },
            (error) => {
                console.log('error:'+error)    
            }
        );
    }

    checkCurrentUser(){
        if (this.props.account.accountId == this.props.userInfo.id) return true
        return false
    }

    checkAdmin(){
        if (this.props.userInfo.role == 'ADMIN') return true
        return false
    }

    getDistrictName(){
        let index = this.state.districtList.length - 1;
        while (index >= 0) {
            if (this.state.districtList[index].districtCode == this.state.districtSelected){
                return this.state.districtList[index].districtName
            }
            index -= 1;
        }  
        return ''
    }

    getTownName(){
        let index = this.state.districtList.length - 1;
        while (index >= 0) {
            let indexTown = this.state.districtList[index].listTown.length - 1;
            while(indexTown >=0 ){
                if (this.state.districtList[index].listTown[indexTown].townCode == this.state.townSelected){
                    return this.state.districtList[index].listTown[indexTown].townName
                }
                indexTown-=1;
            }
            index -= 1;
        }  
        return ''
    }

    render(){        
    return(        
        <View style={styles.accountViewArea}>
            <View style={styles.accountMenuArea}>
                <Text style={[styles.rowText,{fontSize:22,fontWeight:'bold',width:'100%'}]}>{"Chỉnh sửa thông tin nhân viên: "}</Text>   
            </View>
            <View style={styles.accountArea}>
                <View style={styles.accountContainer}>
                    {/* <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>{'Ảnh đại diện: '}</Text>
                        <TouchableOpacity 
                        style={styles.addImageButton}
                        onPress={() => this.selectPicture()}
                        >
                            <Text style={{color:'white'}}>Chọn ảnh</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View style={styles.imagePreviewArea}>
                        <View style={styles.accountRowContainer}>
                            <Text style={styles.rowText}>{' '}</Text>
                            <TouchableOpacity onPress={() => this.checkAdmin()?this.selectPicture():null}
                            >
                                <Image 
                                    style={styles.imagePreview}
                                    source={{ uri: this.state.accountImage}}
                                    >
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>Tên nhân viên:</Text>
                        {this.checkAdmin()?
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập tên nhân viên'}
                            name={"accountName"}
                            onChange={this.handleChange}
                            value={this.state.accountName}
                            >                
                        </TextInput>
                        :
                        <Text style={styles.rowTextLong}>{this.state.accountName}</Text>
                        }
                        
                    </View>
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>Số điện thoại:</Text>
                        <Text style={styles.rowTextLong}>{this.state.accountPhoneNumber}</Text>
                    </View>
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>Địa chỉ email:</Text>
                        {this.checkAdmin()?
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập địa chỉ email của nhân viên'}
                            name="accountEmail"
                            onChange={this.handleChange}
                            value={this.state.accountEmail}
                            >                
                        </TextInput>
                        :
                        <Text style={styles.rowTextLong}>{this.state.accountEmail}</Text>
                        }
                    </View>
                    {this.checkAdmin()?
                    <View style={styles.accountRowContainer}>
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
                            {this.createNumberPickerList(1920,2020,false)}
                        </Picker>
                    </View>
                    :
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>Ngày sinh: </Text>
                        <Text style={styles.rowTextLong}>{this.getDob()}</Text>
                    </View>
                    }
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>Giới tính:</Text>
                        {this.checkAdmin()?
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
                        :
                        <Text style={styles.rowTextLong}>{this.state.accountGender=='1'?'Nam':'Nữ'}</Text>
                        }
                        
                    </View>                   
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>Quận/huyện:</Text>
                        {this.checkAdmin()?
                        <Picker
                            selectedValue={this.state.districtSelected}
                            style={styles.accountTypeDropDown}
                            onValueChange={(itemValue, itemIndex) => this.onDistrictChange(itemValue)}                    
                            >
                            {this.state.districtList?this.state.districtList.map(district => (
                            <Picker.Item label={district.districtName} value={district.districtCode} />))
                            : null }
                        </Picker>
                        :
                        <Text style={styles.rowTextLong}>{this.getDistrictName()}</Text>
                        }
                    </View>
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>Phường/xã:</Text>
                        {this.checkAdmin()?
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
                        :
                        <Text style={styles.rowTextLong}>{this.getTownName()}</Text>
                        }
                    </View>
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>Địa chỉ chi tiết:</Text>
                        {this.checkAdmin()?
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập địa chỉ chi tiết: số nhà, đường, thôn, ..'}
                            name="accountAddress"
                            onChange={this.handleChange}
                            value={this.state.accountAddress}
                            >                
                        </TextInput>
                        :
                        <Text style={styles.rowTextLong}>{this.state.accountAddress}</Text>
                        }
                    </View> 
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>Vị trí nhân viên:</Text>
                        <Text style={styles.rowTextLong}>{getRoleName(this.state.accountRole)}</Text>
                    </View> 
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowText}>Trạng thái:</Text>
                        {this.checkAdmin()?
                        <Picker
                            selectedValue={this.state.accountActive}
                            style={styles.accountTypeDropDown}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                accountActive:itemValue,
                            })}                    
                            >
                            <Picker.Item label={'Đang hoạt động'} value={'1'} />
                            <Picker.Item label={'Bị khóa'} value={'0'} />
                        </Picker>
                        :
                        <Text style={styles.rowTextLong}>{this.state.accountActive=='1'?'Đang hoạt động':'Bị khóa'}</Text>
                        }
                    </View> 
                    <View style={styles.accountRowContainer}>
                        <Text style={styles.rowTextError}>{this.state.error}</Text>                        
                    </View>
                </View>  
                <View style={styles.buttonArea}>
                    {this.checkCurrentUser()?
                    <TouchableOpacity style={styles.button} onPress={() => this.changePassword()}>
                        <Text style={{color:'white'}}>Thay đổi mật khẩu</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => this.resetPassword()}>
                        <Text style={{color:'white'}}>Đặt lại mật khẩu</Text>
                    </TouchableOpacity>
                    }
                    {this.checkAdmin()?
                    <TouchableOpacity style={styles.button} onPress={() => this.updateAccountInformation()}>
                        <Text style={{color:'white'}}>Lưu thay đổi</Text>
                    </TouchableOpacity>
                    :
                    <View/>
                    }
                </View>  
            </View>
            
        </View>
    );
    }
}
const styles = StyleSheet.create({
    accountViewArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    accountMenuArea: {
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
    accountArea:{
        width: componentWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom:10,
    },
    accountContainer:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:5,
        backgroundColor:'white',
        marginBottom: 50,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 15,
    },
    accountRowContainer:{
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
    
    buttonArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop:10,
        paddingBottom:30,
        paddingLeft:200,
        paddingRight:200,
    },
    button:{
        height:50,
        width:200,
        backgroundColor:'#25345D',
        borderRadius:5,
        borderWidth:1,
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