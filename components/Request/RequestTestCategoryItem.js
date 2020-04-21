import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, Text, TextInput, ScrollView, TouchableOpacity, FlatList, Alert} from 'react-native';
import RequestTestViewItem from './RequestTestViewItem'
import {convertMoney} from './../Common/CommonFunction'


export default class RequestTestCategoryItem extends Component {
    constructor(props){
        super(props);
        this.state={        
            visible: false
        }
        this.isVisible = this.isVisible.bind(this);
    }

    isVisible(){
        let result = false;
        this.props.test.forEach(test => {
            this.props.isSelected(test.testID) == true ? result=true : '';  
        });
        return result;
    }

    render(){
        const testList = this.props.test;
        let countHide = 0;
        return(
            <View>
            {this.isVisible() ?
            <View>
                <View style={styles.testCategoryItem}  >
                    <View style={styles.testCategoryNameContainer}>
                        <Text style={{fontSize:17,color:''}} >{this.props.categoryName}</Text>
                    
                    </View>
                </View>
                <FlatList 
                    style ={styles.TestListAreaScrollView}                        
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    data={testList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                            this.props.isSelected(item.testID) ?  null : countHide+=1 ;
                            return ( 
                                <View>                                 
                                { this.props.isSelected(item.testID) ?
                                    // <View style={[styles.testItem,{
                                    //     backgroundColor:(parseInt(index)-countHide) % 2 == 0 ? '#EEE': '#FFF',    
                                    // }]}>
                                    //     <View style={styles.testName}>
                                    //         <Text style={{fontSize:15,color:'#25345d'}} >{item.testName}</Text>
                                    //     </View>
                                    //     <View style={styles.testPrice}>
                                    //         <Text style={{fontSize:15,color:'#25345d'}}  >{convertMoney(item.price)}</Text>
                                    //     </View>
                                    // </View>

                                    <RequestTestViewItem 
                                    testName={item.testName}
                                    testPrice={item.price}
                                    testID={item.testID}
                                    // backgroundColor={(parseInt(index)-countHide) % 2 === 0 ? '#EEE': '#FFF'}
                                    backgroundColor='white'
                                    countHide={countHide}
                                    index={index}
                                    math={(parseInt(index)-countHide) % 2 }
                                    /> 
                                    : null}    
                                </View>                          
                            );
                        }}
                />
            </View> 
            : null }
            </View>
        );
    }
}



const styles = StyleSheet.create({
    testCategoryItem:{
        height:50,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,
        borderColor:'#25345d',
              
    },
    TestListAreaScrollView:{
        width: '100%',
        flex:1,
        backgroundColor:'white',
        borderRadius:10,
    },
    testCategoryNameContainer:{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height:35,
        paddingLeft:5,
        paddingRight:5,   
    },
    testItem:{
        height:45,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //borderWidth:1,
        //borderColor:'#25345d',
    },
    testName:{
        width: 500,
        height:29,
        paddingLeft:5,
        paddingRight:5,
        paddingTop:3
    },
    testPrice:{
        width: 100,
        height:15,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom:2,
        paddingRight:10
    }

});