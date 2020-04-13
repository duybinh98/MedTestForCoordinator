import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput, Image, ImageBackground, Picker } from 'react-native';

export default class ListScreen extends Component  {
    render(){
    return (
        <ImageBackground  style={styles.headerContainer} 
            source='https://i.imgur.com/jasoIoM.jpg'
            // resizeMode= 'center'
            resizeMode= 'stretch'
            >
            <View style={styles.leftArea}>
                <View style={styles.titleContainer}>
                    <Text style={{fontSize:25, fontWeight:'bold',color:'white'}}>MedTest</Text>
                </View>
                <View style={styles.hotlineContainer}>
                    <Text style={{fontSize:14}}>Hotline: 1900561252</Text>
                </View>
            </View>
            <View style={styles.middleArea}>
                <TextInput style={styles.searchInputContainer}
                placeholder={'Tìm xét nghiệm'}>                
                </TextInput>
            </View>
            <View style={styles.rightArea}>
                <View style={{}}>
                    <Image 
                        style={{
                            width:100,
                            height:100,
                        }}
                        // source={{uri:'https://www.kindpng.com/picc/m/10-104902_simple-user-icon-user-icon-white-png-transparent.png'}}>
                        source={{uri:this.props.imageUri?this.props.imageUri:''}}>
                    </Image>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={{fontSize:14,color:'white'}}>{this.props.userName?this.props.userName:''}</Text>
                </View>

            </View>

        </ImageBackground >
    );
  }
}

const headerHight=185

const styles = StyleSheet.create({
  headerContainer: {
    height:headerHight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#3475b3',
    
  },
  leftArea:{
    height:headerHight,
    width:200,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',    
    backgroundColor:'',
    padding:20,
  },
  titleContainer:{
    height:50,
    width:100,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor:''
  },
  hotlineContainer:{
    height:35,
    width:150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
    borderWidth:1,
    marginTop:10,
  },
  middleArea:{
    height:headerHight,
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',    
    padding:10,
    backgroundColor:''
  },
  searchInputContainer:{
    height:30,
    width:800,
    backgroundColor:'white',
    borderWidth:1,
    borderRadius:20,
    paddingLeft:20,
    marginTop:10,
  },
  rightArea:{
    height:headerHight,
    width:200,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',    
    padding:10,
    backgroundColor:'',
  },
  nameContainer:{
    height:30,
    width:140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '',
  }
});
