import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime, getRoleName, componentWidth} from './../Common/CommonFunction'


export default class AccountListViewItem extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            // appointment_date: convertDateTimeToDate(this.props.appoint_date),
            // appointment_time: convertDateTimeToTime(this.props.appoint_date),
        };
        this.onAccountPress = this.onAccountPress.bind(this)
    }
    componentDidMount(){
          
    }


    onAccountPress(){
        const account= { 
            'accountId':this.props.accountId, 
            'accountPhoneNumber':this.props.accountPhoneNumber,                      
            'accountName':this.props.accountName,
            'accountDob':this.props.accountDob,
            'accountAddress':this.props.accountAddress,
            'accountPassword':this.props.accountPassword,
            'accountActive':this.props.accountActive,
            'accountEmail':this.props.accountEmail,
            'accountRole':this.props.accountRole,
            'accountGender':this.props.accountGender,
            'accountImageUrl':this.props.accountImageUrl,
            'accountTownCode':this.props.accountTownCode,
            'accountDistrictCode':this.props.accountDistrictCode,
            }
        // console.log(account)
        this.props.setSelectedAccount?this.props.setSelectedAccount(account):null
        this.props.changeShowView?this.props.changeShowView('AccountView'):null
    }


    render(){        
        return(
            <View>            
            <TouchableOpacity 
                style={styles.accountListItem}
                onPress={() => this.onAccountPress()}
                >
                <View style={styles.accountNameContainer}>                                       
                <Text style={{fontSize:17}}>{this.props.accountName}</Text>
                </View>
                <View style={styles.accountPhoneContainer}>                                       
                <Text style={{fontSize:17}}>{this.props.accountPhoneNumber}</Text>
                </View>
                <View style={styles.accountRoleContainer}>                                       
                <Text style={{fontSize:17}}>{getRoleName(this.props.accountRole)}</Text>  
                </View>
                     
            </TouchableOpacity>             
            </View> 
        );
    }
}


const styles = StyleSheet.create({
    accountListItem:{
        alignSelf: 'stretch',
        width: componentWidth,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom:2,  
    },
    accountNameContainer:{
        margin:10,
        width:350,
        alignItems: 'center',
        marginRight:150,
    },
    accountPhoneContainer:{
        margin:10,
        width:200,
        marginRight:100,
        alignItems: 'center',
    },
    accountRoleContainer:{
        margin:10,
        width:200,
        alignItems: 'center',
    },

});