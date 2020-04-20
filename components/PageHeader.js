import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, Picker, TouchableOpacity } from 'react-native';

export default class ListScreen extends Component  {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.editProfile = this.editProfile.bind(this)
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

    render(){
    return (
        <ImageBackground  style={styles.headerContainer} 
            source='https://i.imgur.com/jasoIoM.jpg'
            // resizeMode= 'center'
            resizeMode= 'stretch'
            >
            <View style={styles.leftArea}>
                <View style={styles.titleContainer}>
                    <Text style={{fontSize:25, fontWeight:'bold',color:'white'}}>MedTest</Text>
                </View>
                <View style={styles.hotlineContainer}>
                    <Text style={{fontSize:14}}>Hotline: 1900561252</Text>
                </View>
            </View>
            <View style={styles.middleArea}>
                <TextInput style={styles.searchInputContainer}
                placeholder={'Tìm xét nghiệm'}>                
                </TextInput>
            </View>
            <View style={styles.rightArea}>
                <View style={{}}>
                    <Image 
                        style={{
                            width:100,
                            height:100,
                        }}
                        // source={{uri:'https://www.kindpng.com/picc/m/10-104902_simple-user-icon-user-icon-white-png-transparent.png'}}>
                        source={{uri:this.props.userInfo?this.props.userInfo.image:''}}>
                    </Image>
                </View>
                <TouchableOpacity style={styles.nameContainer} onPress={() => this.editProfile()}>
                    <Text style={{fontSize:14,color:'white'}}>{this.props.userInfo?this.props.userInfo.name:''}</Text>
                </TouchableOpacity>

            </View>

        </ImageBackground >
    );
  }
}

const headerHight=185

const styles = StyleSheet.create({
  headerContainer: {
    height:headerHight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#3475b3',
    
  },
  leftArea:{
    height:headerHight,
    width:200,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',    
    backgroundColor:'',
    padding:20,
  },
  titleContainer:{
    height:50,
    width:100,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor:''
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
    flex:1,
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
    marginTop:10,
  },
  rightArea:{
    height:headerHight,
    width:200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',    
    padding:10,
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
