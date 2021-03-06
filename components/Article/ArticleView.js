import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {convertDateTimeToDate, convertDateTimeToTime, componentWidth} from './../Common/CommonFunction'
import {getApiUrl} from './../Common/CommonFunction'

export default class ArticleView extends Component  {
    constructor(props) {
        super(props)
        this.state = {            
            imageUri: '',
            imageType: '',
            imageResultUri: '',
            deleteArticleApi: true,
        };
        this.onDelete = this.onDelete.bind(this)
        this.checkAdmin = this.checkAdmin.bind(this)
        
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                
            }));
        }
    }

    onDelete(){
        if (this.checkAdmin()) this.callApiDeleteArticle()
    }

    checkAdmin(){
        if (this.props.userInfo.role == 'ADMIN') return true
        return false
    }

    callApiDeleteArticle(){
        if(this.state.deleteArticleApi){
            this.setState({deleteArticleApi:false})
            fetch(getApiUrl()+"/articles/delete/"+this.props.article.articleId,{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer '+this.props.token,
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({deleteArticleApi:true})
                    // console.log(result)
                    let success = false
                    result ? result.message? result.message== "Xoá bài viết thành công!"? success=true: null : null : null;
                    if (success)
                    this.props.changeShowView('ArticleListView')
                },            
                (error) => {
                    this.setState({deleteArticleApi:true})
                    // console.log(error)
                }
            )
        }
        
    }

    render(){
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
                {this.checkAdmin()?
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.button} onPress={() => this.onDelete()} disabled={!this.state.deleteArticleApi}>
                        <Text style={{color:'white'}}>Xóa bài viết</Text>
                    </TouchableOpacity> 
                </View>
                :null}
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
        width: componentWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        paddingTop:20,
        paddingBottom:20,
        marginTop:10,
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
    },
    buttonArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
});
