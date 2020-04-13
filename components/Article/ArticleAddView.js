import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput, Image} from 'react-native';
import {getApiUrl} from './../Common/CommonFunction'
import appointmentList from './../../Data/appointmentList'
import districtList from './../../Data/districtList'
import userList from './../../Data/userList'
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';

export default class ArticleAddView extends Component  {
    constructor(props) {
        super(props)
        this.state = {            
            imageUri: '',
            imageType: '',
            imageResultUri: '',
        };
        this.selectPicture = this.selectPicture.bind(this)
    }

    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                
            }));
        }
    }


    selectPicture = async () =>{
        const { cancelled, uri, width, height, type } = await ImagePicker.launchImageLibraryAsync()
        console.log(cancelled)
        if (!cancelled) {
            console.log(uri)
            this.setState({ imageUri: uri });
            const data = new FormData();
            data.append('file', {
                uri: this.state.imageUri,
                // type: 'image/jpeg', 
                // name: 'testPhotoName'
            });
            this.callApiUploadImage(data)
        } 

    }

    
    callApiUploadImage  = async (_data) => {
        
        fetch(getApiUrl()+'/uploadFile', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: _data,
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log('result:'+result)
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
                        placeholder={'Nhập tiêu đề'}>                
                        </TextInput>
                    </View>
                    <View style={styles.articleAddRowContainer}>
                        <Text style={styles.rowText}>{'Nội dung\nngắn gọn: '}</Text>
                        <TextInput 
                            style={styles.rowTextInput}
                            multiline={true}
                            numberOfLines={4}
                            placeholder={'nhập nội dung ngắn gọn'}>                
                        </TextInput>
                    </View>
                    <View style={styles.articleAddRowContainer}>
                        <Text style={styles.rowText}>{'Nội dung\nbài viết: '}</Text>
                        <TextInput 
                            style={styles.rowTextInput}
                            multiline={true}
                            numberOfLines={12}
                            placeholder={'nhập nội dung '}>                
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
                        <Text style={styles.rowText}>{'Ảnh Uri: '+this.state.imageResultUri}</Text>
                    </View>
                    <View style={styles.articleAddRowContainer}>
                        <Image 
                            style={{width:100,height:100,backgroundColor:'red'}}
                            source={{ uri: this.state.imageUri }}
                            >
                            </Image>
                    </View>
                </View>
                <TouchableOpacity style={styles.articleAddConfirmButton}>
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
});
