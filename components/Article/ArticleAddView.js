import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {getApiUrl} from './../Common/CommonFunction'
import appointmentList from './../../Data/appointmentList'
import districtList from './../../Data/districtList'
import userList from './../../Data/userList'
import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker';

export default class ArticleAddView extends Component  {
    constructor(props) {
        super(props)
        this.state = {      
            imageResultUri: '',
            articleTitle: '',
            articleShortContent: '',
            articleContent: '',
            error: '',
            errorList: ['','Phải điền tiêu đề bài viết','Phải điền nội dung ngắn ngọn bài viết', 'Phải điền nội dung bài viết','Bài viết chưa có ảnh min họa'],

        };
        this.selectPicture = this.selectPicture.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.createArticle = this.createArticle.bind(this)
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                
            }));
        }
    }


    createArticle(){
        if(this.checkValid()){
            this.callApiCreateArticle()
        }
    }

    checkValid(){        
        if (this.state.articleTitle == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[1]
            }));
        if (this.state.articleShortContent == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[2]
            }));
        if (this.state.articleContent == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[3]
            }));
        if (this.state.imageResultUri == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[4]
            }));
        this.setState(previousState => ({ 
                error: this.state.errorList[0]
        }));
        return true;
        
    }

    callApiCreateArticle(){
        fetch(getApiUrl()+'/articles/create', {
        method: 'POST',
        headers: {      
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+this.props.token,
        },
        body: JSON.stringify({
            tittle: this.state.articleTitle,
            shortContent:this.state.articleShortContent,
            content: this.state.articleContent,
            image: this.state.imageResultUri,
            userID: this.props.userInfo.id
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result:'+JSON.stringify(result))
                let success = false
                result ? result.success? success=result.success : null : null;
                if (success) 
                this.props.changeShowView('ArticleListView')
            },
            (error) => {
                console.log('error:'+error)    
            }
        );
    }


    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        // console.log('event name'+name+', event value:'+value)
        this.setState({[name]: value});
    }


    selectPicture = async () =>{
        // const result = await DocumentPicker.getDocumentAsync({copyToCacheDirectory:true})
        // console.log(result)
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
                this.setState({ imageResultUri: result.uri });
            },
            (error) => {
                console.log('error:'+error)    
            }
        );
    }

    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.articleAddViewArea}>
            <View style={styles.articleAddTopMenuArea}>
                <Text style={{fontSize:25}}>Thêm bài viết: </Text>                
            </View>
            <View style={styles.articleAddArea}>
                <View style={styles.articleAddContainer}>                    
                    <View style={styles.articleAddRowContainer}>
                        <Text style={styles.rowText}>Tiêu đề: </Text>
                        <TextInput style={styles.rowTextInput}
                        placeholder={'Nhập tiêu đề'}   
                        name={"articleTitle"}
                        onChange={this.handleChange}
                        value={this.state.articleTitle}  
                        >           
                        </TextInput>
                    </View>
                    <View style={styles.articleAddRowContainer}>
                        <Text style={styles.rowText}>{'Nội dung\nngắn gọn: '}</Text>
                        <TextInput 
                            style={styles.rowTextInput}
                            multiline={true}
                            numberOfLines={4}
                            placeholder={'Nhập nội dung ngắn gọn'}
                            name={"articleShortContent"}
                            onChange={this.handleChange}
                            value={this.state.articleShortContent}  
                            >                
                        </TextInput>
                    </View>
                    <View style={styles.articleAddRowContainer}>
                        <Text style={styles.rowText}>{'Nội dung\nbài viết: '}</Text>
                        <TextInput 
                            style={styles.rowTextInput}
                            multiline={true}
                            numberOfLines={12}
                            placeholder={'Nhập nội dung '}
                            name={"articleContent"}
                            onChange={this.handleChange}
                            value={this.state.articleContent} 
                            >                
                        </TextInput>
                    </View>
                    <View style={styles.articleAddRowContainer}>
                        <Text style={styles.rowText}>{'Ảnh đính kèm: '}</Text>
                        <TouchableOpacity 
                        style={styles.addImageButton}
                        onPress={() => this.selectPicture()}
                        >
                            <Text>Chọn ảnh</Text>
                        </TouchableOpacity>
                        <Text style={[styles.rowText,{fontSize:15,width:600,paddingTop:3}]}>{' '+this.state.imageResultUri}</Text>
                    </View>
                    {this.state.imageResultUri?
                    <View style={styles.articleAddRowContainer}>
                        <Text style={styles.rowText}>{' '}</Text>
                        <Image 
                            style={styles.imagePreview}
                            source={{ uri: this.state.imageResultUri}}
                            >
                        </Image>
                    </View>
                    :null
                    }
                    <View style={styles.articleAddRowContainer}>
                        <Text style={styles.rowTextError}>{this.state.error}</Text>                        
                    </View>
                </View>
                <TouchableOpacity style={styles.articleAddConfirmButton} onPress={() => this.createArticle()}>
                    <Text>Tạo bài bài viết</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    }
}


const styles = StyleSheet.create({
    articleAddViewArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    articleAddTopMenuArea: {
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
    articleAddArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:200,
        paddingRight:200,
    },
    articleAddContainer:{
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
    articleAddRowContainer:{
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
        width:150,
        fontSize:18,
    },
    articleTypeDropDown:{
        alignSelf: 'stretch',
        padding:3,
        width: 800,
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
    articleAddConfirmButton:{
        height:50,
        width:200,
        backgroundColor:'white',
        borderRadius:5,
        borderWidth:1,
        marginBottom:50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addImageButton:{
        width: 200,
        height:30,
        borderRadius:10,
        borderWidth:1,
        backgroundColor:'#e6e6e6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePreview:{
        width:200,
        height:200,
        backgroundColor:''
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
});
