import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput} from 'react-native';
import {getApiUrl} from './../Common/CommonFunction'
import AccountListViewItem from './AccountListViewItem'

export default class AccountListScreen extends Component  {
    constructor(props) {
        super(props)
        this.state = {            
            Button1Selected: true,
            Button2Selected: false,
            Button3Selected: false,
            Button4Selected: false,
            Button4Selected: false,
            accountSelected: 'all',
            inputPhoneNumber: '',
            isSearch: false,
            userList: this.props.userList?this.props.userList:[],
            dataChanged: true,
        };
        this.menuButtonPress = this.menuButtonPress.bind(this)
        this.getAccountShowList = this.getAccountShowList.bind(this)
        this.searchUser = this.searchUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    // componentDidUpdate  (prevProps, prevState) {        
    //      if (prevProps !== this.props) {
    //         this.setState(previousState => ({ 
    //             userList: this.props.userList,
    //         }));
    //     }
    // }
    
    getAccountShowList(){
        if (this.state.isSearch){
            let result = []
            let index = this.state.userList.length - 1;
            while (index >= 0) {
                if (this.state.userList[index].phoneNumber === this.state.inputPhoneNumber) {
                    result.push(this.state.userList[index]);
                    }
                index -= 1;
            }
            return result;
        }
        if (this.state.accountSelected=='all'){
            return this.state.userList
        }
        else{
            let result = []
            let index = this.state.userList.length - 1;
            while (index >= 0) {
                if (this.state.userList[index].role === this.state.accountSelected) {
                    result.push(this.state.userList[index]);
                    }
                index -= 1;
            }        
            return result;
        }
        return this.state.userList
    }




    menuButtonPress(button){
        this.setState(previousState => ({ 
            Button1Selected: button=="1"?true:false,
            Button2Selected: button=="2"?true:false,
            Button3Selected: button=="3"?true:false,
            Button4Selected: button=="4"?true:false,
            Button5Selected: button=="5"?true:false,
            accountSelected: button=="1"? 'all': button=="2"? 'COORDINATOR': button=="3"? 'NURSE' : button=="4"? 'CUSTOMER': 'ADMIN',
            dataChanged: !this.state.dataChanged,
            isSearch: false,
        }))
    }

    
    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                userList: this.props.userList,
                dataChanged: !this.state.dataChanged,
            }));
        }
    }

    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        // console.log('event name'+name+', event value:'+value)
        this.setState({[name]: value});
    }

    searchUser(){
        // this.props.searchUser?this.props.searchUser(this.state.inputPhoneNumber):null
        this.setState(previousState => ({ 
            dataChanged: !this.state.dataChanged,
            isSearch: true,
        }))


    }

    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.articleListArea}>
            <View style={styles.accountListTopMenuArea}>
                <View style={styles.accountListTopMenuContainer}>
                    <TextInput style={styles.topMenuTextInput}
                    placeholder={'Tìm kiếm tài khoản theo số điện thoại'}
                    name="inputPhoneNumber"
                    onChange={this.handleChange}
                    value={this.state.inputPhoneNumber}
                    onSubmitEditing={() => this.searchUser()}
                    >                
                    </TextInput>
                    <TouchableOpacity 
                        style={styles.createNewAccountButton} 
                        onPress={() => this.props.changeShowView ? this.props.changeShowView('AccountCreateView'): null}
                        >
                        <Text style={{color:'white'}}>Tạo tài khoản nhân viên</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.accountListTopMenuContainer,{
                    justifyContent: 'flex-start',
                    }]}>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        borderWidth: this.state.Button1Selected ? 1:0,
                        backgroundColor: this.state.Button1Selected ? roleSelectedColor : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('1')}
                    >
                        <Text style={styles.topMenuText}>Tất cả</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        borderWidth: this.state.Button2Selected ? 1:0,
                        backgroundColor: this.state.Button2Selected ? roleSelectedColor : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('2')}
                    >
                        <Text style={styles.topMenuText}>Điều phối viên</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        borderWidth: this.state.Button3Selected ? 1:0,
                        backgroundColor: this.state.Button3Selected ? roleSelectedColor : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('3')}
                    >
                        <Text style={styles.topMenuText}>Y tá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        borderWidth: this.state.Button4Selected ? 1:0,
                        backgroundColor: this.state.Button4Selected ? roleSelectedColor : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('4')}
                    >
                        <Text style={styles.topMenuText}>Khách hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topMenuButton,{
                        borderWidth: this.state.Button5Selected ? 1:0,
                        backgroundColor: this.state.Button5Selected ? roleSelectedColor : 'white' 
                        }]}
                        onPress={() => this.menuButtonPress('5')}
                    >
                        <Text style={styles.topMenuText}>Quản trị hệ thống</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.accountListTopMenuContainer}>
                    <Text >Số lượng: {this.getAccountShowList()?this.getAccountShowList().length:'0'}</Text>
                </View>
            </View>
            <View style={styles.articleListFlatListArea}>     
                <View style={styles.articleListFlatListTitleArea}> 
                    <View style={styles.articleListFlatListTitleContainer}> 
                        <View style={styles.articleListTitleNameContainer}>                                       
                        <Text style={styles.articleListTitleText}>Tên người dùng</Text>
                        </View>
                        <View style={styles.articleListTitlePhoneContainer}>                                       
                        <Text style={styles.articleListTitleText}>Số điện thoại</Text>
                        </View>
                        <View style={styles.articleListTitleRoleContainer}>                                       
                        <Text style={styles.articleListTitleText}>Vị trí</Text>  
                        </View>
                    </View>
                </View>
                <FlatList style={styles.articleListFlatList}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                    showsVerticalScrollIndicator={false}
                    data={this.getAccountShowList()}
                    extraData={this.state.dataChanged}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                            return (
                                <View>                                
                                <AccountListViewItem
                                    accountId={item.id}         
                                    accountPhoneNumber={item.phoneNumber}                            
                                    accountName={item.name}    
                                    accountDob={item.dob}    
                                    accountAddress={item.address}
                                    accountPassword={item.password}
                                    accountActive={item.active}
                                    accountEmail={item.email}         
                                    accountRole={item.role}                            
                                    accountGender={item.gender}    
                                    accountImageUrl={item.image}    
                                    accountTownCode={item.townCode}
                                    accountDistrictCode={item.districtCode}
                                    changeShowView={this.props.changeShowView?this.props.changeShowView: null}
                                    setSelectedAccount={this.props.setSelectedAccount?this.props.setSelectedAccount: null}  
                                                                                                    
                                />   
                                </View>                             
                            );
                        }}
                    >                   
                </FlatList> 
                       
            </View>
        </View>
    );
    }
}

const roleSelectedColor = '#c0c0c0';

const roleSelectButtonHeight = 30;

const styles = StyleSheet.create({
    articleListArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    accountListTopMenuArea: {
        alignSelf: 'stretch',
        width:"100%",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
        paddingBottom:40,
        paddingTop:10,
    },
    accountListTopMenuContainer: {
        alignSelf: 'stretch',
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        padding:10,
        paddingLeft:190,
        paddingRight:200,
    },
    topMenuTextInput:{
        height:30,
        width:800,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:20,
        paddingLeft:20,
        marginTop:10,
    },
    topMenuButton:{
        width: (Dimensions.get('window').width-400)/5,
        height: roleSelectButtonHeight,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createNewAccountButton:{
        width: 240,
        height:30,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:'#25345D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight:200,
    },
    articleListFlatListArea:{        
        width:"100%",
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '',
    },
    articleListFlatListTitleArea:{
        alignSelf: 'stretch',
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    articleListFlatListTitleContainer:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-400,
        // width: 750,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',   
        backgroundColor:'#c0c0c0',     
    },
    articleListTitleNameContainer:{
        margin:10,
        width:350,
        alignItems: 'center',
        marginRight:150,
    },
    articleListTitlePhoneContainer:{
        margin:10,
        width:200,
        alignItems: 'center',
        marginRight:100,
    },
    articleListTitleRoleContainer:{
        margin:10,
        width:200,
        alignItems: 'center',
    },
    articleListTitleText:{
        fontSize:17, 
        fontWeight:'bold'
    },
    articleListFlatList:{
        width:"100%",
        flex:1,
        flexDirection: 'column',
        backgroundColor: '',
        paddingBottom:40,
    },

});
