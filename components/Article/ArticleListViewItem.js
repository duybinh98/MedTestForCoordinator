import React, {Component} from 'react';
import {View, StyleSheet, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime} from './../Common/CommonFunction'


export default class ArticleListViewItem extends Component {
    constructor(props) {
        super(props)
        this.state = {            
        };
        this.onArticlePress = this.onArticlePress.bind(this)
    }
    componentDidMount(){
          
    }

    onArticlePress(){
        const article= { 
            "articleId": this.props.articleId,
            "articleTitle":this.props.articleTitle,
            "articleContent":this.props.articleContent,
            "articleShortContent":this.props.articleShortContent,
            "articleImageUrl":this.props.articleImageUrl,
            "userId":this.props.userId,
            "articleCreatedTime":this.props.articleCreatedTime,
            "creatorName": this.props.creatorName,
            }
        this.props.setSelectedArticle?this.props.setSelectedArticle(article):null
        this.props.changeShowView?this.props.changeShowView('ArticleView'):null
    }


    render(){        
        return(
            <View>            
            <TouchableOpacity 
                style={styles.articleListItem}
                onPress={() => this.onArticlePress()}
                >                                
                <View style={styles.articleImageContainer}>
                    <Image 
                        style={styles.articleImage}
                        source={{uri:this.props.articleImageUrl}}>
                    </Image>
                </View>  
                <View style={styles.articleTextContainer}>
                    <View style={styles.articleTextContentContainer}>
                        <View style={styles.articleTitleContainer}>
                        <Text style={{fontSize:17,fontWeight:'Bold'}}>{this.props.articleTitle}</Text>
                        </View>
                        <View style={[styles.articleCreateTimeContainer,{
                            borderRadius:1,
                            borderStyle: 'dashed',
                        }]}>
                        <Text style={{fontSize:15}}>{convertDateTimeToDate(this.props.articleCreatedTime)+"   "+convertDateTimeToTime(this.props.articleCreatedTime)}</Text>                                   
                        </View>
                        <View style={styles.articleShortContentContainer}>
                            <Text style={{fontSize:17}}>{this.props.articleShortContent}</Text>        
                        </View>
                    </View>
                    <View style={styles.articleTextCreatorNameContainer}>
                        <View style={styles.articleCreatorNameContainer}>
                            <Text style={{fontSize:17}}>{this.props.creatorName}</Text>
                        </View>
                    </View>
                    
                </View>     
                                   
            </TouchableOpacity>             
            </View> 
        );
    }
}
const styles = StyleSheet.create({
    articleListItem:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-400,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingBottom:2,       
        borderRadius:10,
        marginBottom:20, 
    },
    articleImageContainer:{
        margin:10,
        height:200,
        width:200,
    },
    articleImage:{
        height:200,
        width:200,
    },
    articleTextContainer:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-620,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor:'',
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:5,
        paddingTop:10,
    },
    articleTextContentContainer:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-630,
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor:''
    },
    articleTextCreatorNameContainer:{
        alignSelf: 'stretch',
        width: Dimensions.get('window').width-630,
        flexDirection: 'column',
        alignItems: 'flex-end',
        backgroundColor:'',
        paddingRight:10,
    },
    articleTitleContainer:{
        marginBottom:10,
    },
    articleCreateTimeContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        padding:2,
        marginBottom:10
    },
    articleShortContentContainer:{
    },
    articleCreatorNameContainer:{
    }

});