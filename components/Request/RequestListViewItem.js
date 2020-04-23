import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {getApiUrl, convertDateTimeToDate, convertDateTimeToTime, getStateName, getStateColor} from './../Common/CommonFunction'

export default class RequestListPendingItem extends Component {
    constructor(props) {
        super(props)
        this.state = {            
            
        };
        this.onRequestPress = this.onRequestPress.bind(this)
    }


    componentDidMount(){
    }

    changeToRequestViewScreen(testList){
        const request= { 
            "requestId": this.props.requestId,
            "requestCreatedTime":this.props.requestCreatedTime,
            "customerName":this.props.customerName,
            "customerPhoneNumber":this.props.customerPhoneNumber,
            "customerDOB":this.props.customerDOB,
            "requestAddress":this.props.requestAddress,
            "requestDistrictName":this.props.requestDistrictName,
            "requestTownName": this.props.requestTownName,
            "requestMeetingTime": this.props.requestMeetingTime,
            "nurseName":this.props.nurseName,
            "nurseID":this.props.nurseID,
            "lsSelectedTest":this.props.lsSelectedTest,
            "requestAmount":this.props.requestAmount,
            "requestStatus":this.props.requestStatus,
            "testList":testList,
            "requestTestVersion":this.props.requestTestVersion,
            }
        this.props.setSelectedRequest?this.props.setSelectedRequest(request):null
        this.props.changeShowView?this.props.changeShowView('RequestView'):null
    }

    onRequestPress(){        
        if (this.checkVersion()) this.changeToRequestViewScreen(this.props.testList)
    }

    checkVersion(){
        if(this.props.testVersion != this.props.requestTestVersion){
            fetch(getApiUrl()+"/tests/versions/list-all-test/"+this.props.requestTestVersion,{
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.props.token,
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
                        this.changeToRequestViewScreen(result.lsTests)
                        return false
                    }
                },            
                (error) => {
                    console.log(error)
                }
            )  
        }
        else return true;
        
    }




    render(){        
        return(
            <View>            
            <TouchableOpacity 
                style={styles.requestListItem}
                onPress={() => this.onRequestPress()}
                >                                
                <View style={[styles.requestListTextContainer,{
                    marginTop:5,
                }]}>                    
                    <View>
                    <Text style={{fontSize:17}}>#{this.props.requestId}</Text>
                    </View>
                </View>   
                <View style={styles.requestListTextContainer}>
                    <View style={styles.requestListFirstColumnContainer}>
                    <Text style={{fontSize:17}}>{this.props.customerName}</Text>
                    </View>
                    <View style={[styles.requestListSecondColumnContainer,{
                        borderRadius:1,
                        borderStyle: 'dashed',
                    }]}>
                    <Text style={{fontSize:17}}>{convertDateTimeToDate(this.props.requestCreatedTime)+"   "+convertDateTimeToTime(this.props.requestCreatedTime)}</Text>                    
                    </View>
                    <View>
                    <Text style={{fontSize:16}}>{this.props.requestAddress+', '+this.props.requestTownName+', '+this.props.requestDistrictName}</Text>
                    </View>
                </View>     
                <View style={[styles.requestListTextContainer,{marginBottom:10}]}>
                    <View style={styles.requestListFirstColumnContainer}>
                    <Text style={{fontSize:17}}>Số điện thoại:  {this.props.customerPhoneNumber}</Text>
                    </View>
                    <View style={styles.requestListSecondColumnContainer}>
                    <Text style={{fontSize:17,color:'#0c59cf'}}>{getStateName(this.props.requestStatus)}</Text>
                    </View>
                    
                </View>                   
            </TouchableOpacity>             
            </View> 
        );
    }
}
const styles = StyleSheet.create({
    requestListItem:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-400,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom:2,       
        borderRadius:10,
        marginBottom:20, 
    },
    requestListTextContainer:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-400,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:3,
        paddingTop:3,
    },
    requestListFirstColumnContainer:{
        width:250,
    },
    requestListSecondColumnContainer:{
        width:230,
        marginLeft:20,
        marginRight:50,

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
    }

});