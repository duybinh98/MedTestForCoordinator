import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, Alert} from 'react-native';
import {getApiUrl,componentWidth} from './../Common/CommonFunction'
import ArticleListViewItem from './ArticleListViewItem'

export default class ArticleListScreen extends Component  {
    constructor(props) {
        super(props)
        this.state = {            
            statusSelected: 'pending',
            districtSelected: 'D0',
            articleList: this.props.articleList,
        };
        this.onArticlePress = this.onArticlePress.bind(this)
        this.onAddArticlePress = this.onAddArticlePress.bind(this)
    }

    

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                articleList: this.props.articleList,
            }));
        }
    }

    onArticlePress (){
        this.props.changeShowView ? this.props.changeShowView('ArticleView'): null
    }


    onAddArticlePress(){
        this.props.changeShowView ? this.props.changeShowView('ArticleAddView'): null
    }

    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.articleListArea}>
            <View style={styles.articleListTopMenuArea}>
                <Text style={{fontSize:25,fontWeight:'bold'}}>Bài viết mới </Text>
                <TouchableOpacity 
                    style={styles.createNewArticleButton}
                    onPress={() => this.onAddArticlePress()}
                    >
                    <Text style={{color:'white'}}>Tạo bài viết mới</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.articleListFlatListArea}>        
                <FlatList style={styles.articleListFlatList}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                    showsVerticalScrollIndicator={false}
                    data={this.state.articleList}
                    // extraData={this.state.dataChanged}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                            return (
                                <View>                                
                                <ArticleListViewItem
                                    articleId={item.id}         
                                    articleTitle={item.tittle}                            
                                    articleShortContent={item.shortContent}    
                                    articleContent={item.content}    
                                    articleImageUrl={item.image}
                                    userId={item.userID}
                                    articleCreatedTime={item.createdTime}
                                    creatorName={item.creatorName}
                                    changeShowView={this.props.changeShowView?this.props.changeShowView: null}
                                    setSelectedArticle={this.props.setSelectedArticle?this.props.setSelectedArticle: null}
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


const styles = StyleSheet.create({
    articleListArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    articleListTopMenuArea: {
        height:70,
        width:componentWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        paddingTop:20,
        paddingBottom:20,
    },
    createNewArticleButton:{
        width: 200,
        height:30,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:'#25345D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    articleListFlatListArea:{        
        width:componentWidth,
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '',
    },
    articleListFlatList:{
        width:componentWidth,
        flex:1,
        flexDirection: 'column',
        backgroundColor: '',
        paddingTop:20,
        paddingBottom:20,
    },
    

});
