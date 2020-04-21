import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime} from './../Common/CommonFunction'
import {getApiUrl} from './../Common/CommonFunction'
import appointmentList from './../../Data/appointmentList'
import districtList from './../../Data/districtList'
import userList from './../../Data/userList'

export default class ArticleView extends Component  {
    constructor(props) {
        super(props)
        this.state = {            
            imageUri: '',
            imageType: '',
            imageResultUri: '',
        };
        
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                
            }));
        }
    }

    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.articleViewArea}>
            
            <View style={styles.articleArea}>
                <View style={styles.articleContainer}>      
                    <View style={styles.articleRowContainer}>
                        <Text style={{fontSize:25,fontWeight:'bold'}}>{this.props.article?this.props.article.articleTitle:''}</Text>                
                    </View>
                    <View style={[styles.articleRowContainer,{borderWidth:1,borderRadius:1,borderStyle: 'dashed',width:180}]}>
                        <Text style={[styles.rowText,{flex:1,textAlign: 'center',}]}>{this.props.article?convertDateTimeToDate(this.props.article.articleCreatedTime)+"   "+convertDateTimeToTime(this.props.article.articleCreatedTime):''}</Text>
                    </View>
                    <View style={[styles.articleRowContainer,{justifyContent: 'center',}]}>
                        <Image 
                            style={styles.rowImage}
                            source={{ uri: this.props.article?this.props.article.articleImageUrl:'' }}
                            >
                            </Image>
                    </View>
                    <View style={styles.articleRowContainer}>
                        <Text style={styles.rowText}>{this.props.article?this.props.article.articleContent:''}</Text>
                    </View>
                    <View style={[styles.articleRowContainer,{justifyContent: 'flex-end',}]}>
                        <Text style={styles.rowText}>{this.props.article?this.props.article.creatorName:''}</Text>
                    </View>   
                                     
                </View>
            </View>
        </View>
    );
    }
}


const styles = StyleSheet.create({
    articleViewArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    articleTopMenuArea: {
        height:70,
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        padding:20,
        paddingLeft:200,
        marginTop:0,
        marginBottom:10,
    },
    articleArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:200,
        paddingRight:200,
    },
    articleContainer:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:5,
        backgroundColor:'white',
        marginTop:50,
        marginBottom: 50,
        paddingTop: 40,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 15,
    },
    articleRowContainer:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:'100%',
        marginBottom:30,
    },
    rowText:{
        fontSize:18,
        backgroundColor:'',
        textAlign: 'justify'
    },
    articleTypeDropDown:{
        alignSelf: 'stretch',
        padding:3,
        width: 800,
        borderRadius:5,
    },
    rowImage:{
        width:400,
        height:400,
        backgroundColor:''
    }
});
