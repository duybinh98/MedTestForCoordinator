import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, Picker, TouchableOpacity, Dimensions } from 'react-native';

export default class ListScreen extends Component  {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render(){
    return (
        <ImageBackground  style={styles.footerContainer} 
            // source='https://i.imgur.com/jasoIoM.jpg'
            // resizeMode= 'center'
            resizeMode= 'stretch'
            >
            <View style={styles.leftArea}>                
                <View style={styles.leftContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{fontSize:13, fontWeight:'bold',color:'white'}}>TRỤ SỞ HÀ NỘI</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:10,color:'white'}}>159 B Lê Thanh Nghị, Hai Bà Trưng, Hà Nội</Text>
                    </View>
                </View>
            </View>
            <View style={styles.middleArea}>
                <View style={styles.middleContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={{fontSize:13, fontWeight:'bold',color:'white'}}>CHỊU TRÁCH NHIỆM QUẢN LÝ NỘI DUNG</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:10,color:'white'}}>Bác sĩ Nguyễn Trần Kiên</Text>
                    </View>
                    <View style={[styles.titleContainer,{marginTop:15}]}>
                        <Text style={{fontSize:13, fontWeight:'bold',color:'white'}}>HỢP TÁC TRUYỀN THÔNG</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:10,color:'white'}}>Liên hệ: 096 159 1593</Text>
                    </View>
                    <View style={[styles.titleContainer,{marginTop:15}]}>
                        <Text style={{fontSize:13, fontWeight:'bold',color:'white'}}>LIÊN HỆ QUẢNG CÁO</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:10,color:'white'}}>medtest.default@gmail.com</Text>
                    </View>
                </View>
            </View>
            <View style={styles.rightArea}>
                
                <View style={styles.rightContainer}>
                    <Image 
                        style={styles.imageIcon}
                        source={require('./../Data/ABClinic.jpg')}>
                    </Image>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:14, fontWeight:'',color:'white'}}>© Copyright 2007 - 2020 – </Text>
                        <Text style={{fontSize:14, fontWeight:'bold',color:'white'}}>CÔNG TY CỔ PHẦN VCCORP</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:10,color:'white'}}>Tầng 17, 19, 20, 21 Tòa nhà Center Building - Hapulico Complex, Số 1 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội.</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{fontSize:10,color:'white'}}>Giấy phép số 2215/GP-TTĐT do Sở Thông tin và Truyền thông Hà Nội cấp ngày 10 tháng 4 năm 2019</Text>
                    </View>
                </View>
                
            </View>

        </ImageBackground >
    );
  }
}

const footerHeight=200
const WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    footerContainer: {
        height:footerHeight,
        width: WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#25345D',
    },
    leftArea:{
        height:footerHeight,
        width:500,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',    
        backgroundColor:'',
        padding:20,
    },
    leftContainer:{
        height:'100%',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',    
        backgroundColor:'',
        paddingLeft:100,
        paddingRight:50,

    },
    middleArea:{
        height:footerHeight,
        width: 500,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',    
        padding:20,
        backgroundColor:''
    },
    middleContainer:{
        height:'100%',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',    
        backgroundColor:'',
        paddingLeft:100,
        paddingRight:100,
    },
    searchInputContainer:{
        height:30,
        width:800,
        backgroundColor:'white',
        borderWidth:1,
        borderRadius:20,
        paddingLeft:20,
        marginTop:25,
    },
    rightArea:{
        height:footerHeight,
        width:500,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',    
        padding:10,
        backgroundColor:'',
    },
    rightContainer:{
        height:'100%',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start', 
        paddingLeft:50,
        paddingRight:100,
        backgroundColor:'',
    },
    nameContainer:{
        height:30,
        width:140,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '',
    },
    imageIcon:{
        width:50,
        height:50,
        marginTop:5
    },
    titleContainer:{
        height:20,
        width:'100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor:''
    },
    textContainer:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop:8,
    },
});
