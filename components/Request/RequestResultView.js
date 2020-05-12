import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {getApiUrl, getStateName, componentWidth, convertDateTimeToDate, convertDateTimeToTime, convertMoney} from './../Common/CommonFunction'
import AlertScreen from './../Common/AlertScreen'
import RequestTestCategoryItem from './RequestTestCategoryItem'

export default class RequestView extends Component  {
    constructor(props) {
        super(props)
        this.state = {        
            resultList: [],
        };
    }

    componentDidMount(){
        if(this.props.request.requestStatus=='closed') this.callApiResultList()
    }

    componentDidUpdate  (prevProps, prevState) {        
        if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                
            }));
            if(this.props.request.requestStatus=='closed') this.callApiResultList()
        }
    }

    callApiResultList () {
        fetch(getApiUrl()+"/requests/detail/"+this.props.request.requestId+"/result",{
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
                // console.log(result)
                result ? result.message? null :
                this.setState(previousState => ({
                    resultList: result,
                })) :null
            },            
            (error) => {
                // console.log(error)
            }
        )  
    }


    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.requestViewArea}>
            <View style={styles.requestTopMenuArea}>
                <Text style={{fontSize:25}}>{"Kết quả đơn xét nghiệm "+this.props.request.requestId}</Text>                
            </View>
            <View style={styles.requestArea}>
                <View style={styles.requestContainer}>
                    {this.state.resultList.length==0?null:
                    this.state.resultList.map(result => (                        
                    <View style={styles.imagePreviewArea}>
                        {/* <View style={styles.requestRowContainer}>
                            <Text style={[styles.rowTextLong,{fontSize:15,width:600,paddingTop:3}]}>{' '+result.image}</Text>
                        </View> */}
                        <View style={styles.requestRowContainer}>
                            <Image 
                                style={styles.imagePreview}
                                source={{ uri: result.image}}
                                >
                            </Image>
                        </View>
                    </View>
                    ))
                    }
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.changeShowView('RequestView')}>
                        <Text style={{color:'white'}}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    );
    }
}


const styles = StyleSheet.create({
    requestViewArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    requestTopMenuArea: {
        height:70,
        width: componentWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        paddingTop:20,
        paddingBottom:20,
        marginTop:10,
    },
    requestArea:{
        width: componentWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    requestContainer:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:5,
        backgroundColor:'white',
        marginBottom: 50,
        paddingTop: 40,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 15,
    },
    requestRowContainer:{
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
        width:200,
        fontSize:17,
        fontWeight:'bold',
        backgroundColor:''
    },
    rowTextLong:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:500,
        fontSize:17,
    },
    buttonArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop:10,
        paddingBottom:50,
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
    imagePreview:{
        height: 1000,
        width: 1000,
        aspectRatio: 10/10,
        backgroundColor:''
    },
    buttonArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop:10,
        paddingBottom:50,
        paddingLeft:200,
        paddingRight:200,
    },
    button:{
        height:50,
        width:200,
        backgroundColor:'#25345D',
        borderRadius:5,
        borderWidth:1,
        marginBottom:50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
