import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Picker, FlatList, TextInput} from 'react-native';
import TestListItem from './TestListItem'
import {getApiUrl, convertDateTimeToDate, convertDateTimeToTime} from './../Common/CommonFunction'
import appointmentList from './../../Data/appointmentList'
import districtList from './../../Data/districtList'
import userList from './../../Data/userList'

export default class TestUpdateView extends Component  {
    constructor(props) {
        super(props)
        this.state = {            
            versionSelected:'2',
            versionCreatedTime: null,
            versionCreatorName: null,
            testTypeSelected: 'none',
            testTypeSelectedForCreate: 'none',
            dataChanged: true,
            testList: [],
            testListTemp: [],
            versionList: null,
            testName: '',
            testPrice: '',
            newTestId: 1,
            error: '',
            errorList: ['','Phải chọn loại xét nghiệm','Phải điền tên xét nghiệm', 'Phải điền giá xét nghiệm'],
        };
        this.createTest = this.createTest.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.getTestList = this.getTestList.bind(this)
        this.updatePrice = this.updatePrice.bind(this)
        this.setSelectedVersion = this.setSelectedVersion.bind(this)
        this.callApiUpdateVersion = this.callApiUpdateVersion.bind(this)
    }


    componentDidMount(){
        this.callApiGetVersionList()
        this.callApiGetTestList()
    }


    componentDidUpdate  (prevProps, prevState) {        
         if (prevProps !== this.props) {
            this.setState(previousState => ({ 
                // testList: this.props.testList,
                // testListTemp: this.props.testList,
            }));
        }
    }

    callApiGetVersionList(){
        fetch(getApiUrl()+"/tests/versions/list",{
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
                let success = false
                result ? result.message? null : success=true : null;
                if (success){
                    this.setState(previousState => ({
                        versionList: result,
                        versionSelected: result[0].versionID,
                        versionCreatedTime: result[0].createdTime,
                        versionCreatorName: result[0].creatorName,
                    }));
                    // this.callApiGetTestList()
                }
            },            
            (error) => {
                console.log(error)
            }
        )  
    }


    createTest(){
        if(this.checkValid()){
            let result = []
            let index = this.state.testListTemp.length - 1;
            while (index >= 0) {
                if (this.state.testListTemp[index].testTypeID == this.state.testTypeSelectedForCreate) {
                    let testList = this.state.testListTemp[index].listTest
                    let newTest = {
                        'testID':("new"+this.state.newTestId),
                        'testName':this.state.testName,                   
                        'price':this.state.testPrice,
                        'testTypeID': this.state.testTypeSelectedForCreate,
                        'testTypeName': this.state.testListTemp[index].testTypeName,
                        }
                    testList.push(newTest)

                    // let indexTest = this.state.testListTemp[index].listTest.length -1
                    // while(indexTest >= 0){
                    //     var test = this.state.testListTemp[index].listTest[indexTest]
                    //     test['testTypeName'] = this.state.testListTemp[index].testTypeName
                    //     result.push(test)
                    //     indexTest -=1;
                    // }
                }
                index -= 1;   
            } 
        }    
    }
    
    checkValid(){        
        if (this.state.testTypeSelectedForCreate == 'none') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[1]
            }));
        if (this.state.testName == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[2]
            }));
        if (this.state.testPrice == '') 
            return this.setState(previousState => ({ 
                error: this.state.errorList[3]
            }));
        this.setState(previousState => ({ 
                error: this.state.errorList[0]
        }));
        return true;
        
    }

    callApiUpdateVersion  = async () => {
        let result = []
        let index = this.state.testListTemp.length - 1;
        while (index >= 0) {
            let indexTest = this.state.testListTemp[index].listTest.length -1
            while(indexTest >= 0){     
                var test = this.state.testListTemp[index].listTest[indexTest]           
                result.push(test)
                indexTest -=1;
            }
            index -= 1;
        }        
        fetch(getApiUrl()+'/tests/versions/upgrade-version', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer '+this.props.token,
        },
        body: JSON.stringify({
            creatorID: this.props.userInfo.id,
            lsInputTest: result,
        }),
        })
        .then(res => res.json())
        .then(
            (result) => {
                // console.log('result:'+result)
                this.callApiGetVersionList()
                this.callApiGetTestList()
            },
            (error) => {
                console.log('error:'+error)    
            }
        );
    }

    updatePrice(testId,newPrice){
        let result = []
        let index = this.state.testListTemp.length - 1;
        while (index >= 0) {
            var testType = this.state.testListTemp[index]
            let testList = []
            let indexTest = this.state.testListTemp[index].listTest.length -1
            while(indexTest >= 0){
                var test = this.state.testListTemp[index].listTest[indexTest]
                if (test.testID == testId){
                    test.price = newPrice
                } 
                testList.push(test)               
                indexTest -=1;
            }
            testType['listTest'] = testList;
            result.push(testType)
            index -= 1;            
        }      
        // console.log(this.state.testListTemp)
    }

    handleChange(event) {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;        
        // console.log('event name'+name+', event value:'+value)
        this.setState({[name]: value});
    }

    setSelectedVersion(versionId){
        let index = this.state.versionList.length -1
        while(index >= 0){
            var version = this.state.versionList[index]
            if (version.versionID == versionId){
                this.setState({
                    versionSelected: versionId,
                    versionCreatedTime: version.createdTime,
                    versionCreatorName: version.creatorName,
                })
            }     
            index -= 1;
        }      
        this.callApiGetTestList(versionId)
        
        
    }

    callApiGetTestList(version){
        let url = ''
        if (version) url =  getApiUrl()+"/tests/versions/list-all-test/"+version
        else url =  getApiUrl()+"/tests/versions/lastest-version-test/"
        fetch(url,{
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
                console.log(result)
                let success = false
                let list = []
                result ? result.message? null : success=true : null;
                if (success)
                {
                    this.setState(previousState => ({
                        testList: result.lsTests ,
                        testListTemp: result.lsTests ,
                    }));
                }
                else 
                this.setState(previousState => ({
                        testList: [],
                        testListTemp: [],
                    }));
            },            
            (error) => {
                console.log(error)
            }
        )  

    }

    getTestList(){
        if (this.state.testTypeSelected =='none'){
            let result = []
            let index = this.state.testListTemp.length - 1;
            while (index >= 0) {
                let indexTest = this.state.testListTemp[index].listTest.length -1
                while(indexTest >= 0){
                    var test = this.state.testListTemp[index].listTest[indexTest]
                    test['testTypeName'] = this.state.testListTemp[index].testTypeName
                    result.push(test)
                    indexTest -=1;
                }
                index -= 1;
            }        
            return result;
        }
        else{
            // console.log(this.state.testTypeSelected)
            let result = []
            let index = this.state.testListTemp.length - 1;
            while (index >= 0) {
                // console.log(this.state.testListTemp[index].testTypeName+ ", "+this.state.testListTemp[index].testTypeID)
                if (this.state.testListTemp[index].testTypeID == this.state.testTypeSelected) {
                    let indexTest = this.state.testListTemp[index].listTest.length -1
                    while(indexTest >= 0){
                        var test = this.state.testListTemp[index].listTest[indexTest]
                        test['testTypeName'] = this.state.testListTemp[index].testTypeName
                        result.push(test)
                        indexTest -=1;
                    }
                }
                index -= 1;
            }        
            return result;
        }
        return this.state.testList
    }

    render(){
    const WIDTH = Dimensions.get('window').width
    return (
        <View style={styles.testUpdateViewArea}>
            <View style={styles.testUpdateMenuArea}>
                <Picker
                    selectedValue={this.state.versionSelected}
                    style={styles.versionDropdown}
                    onValueChange={(itemValue, itemIndex) => this.setSelectedVersion(itemValue)}                    
                    >
                    {this.state.versionList?this.state.versionList.map(version => (
                        <Picker.Item label={version.versionID} value={version.versionID} key={version.versionID}/>
                    )):null}
                </Picker> 
                <Text style={[styles.rowText,{width:250}]}>{"Cập nhật: "+(this.state.versionCreatedTime?convertDateTimeToDate(this.state.versionCreatedTime)+"   "+convertDateTimeToTime(this.state.versionCreatedTime):'')}</Text>   
                <Text style={[styles.rowText,{width:300}]}>{"Người cập nhật: "+(this.state.versionCreatorName?this.state.versionCreatorName:'')}</Text>  
                <TouchableOpacity style={styles.testUpdateConfirmButton} onPress={() => this.callApiUpdateVersion()}>
                    <Text>Cập nhật</Text>
                </TouchableOpacity>  
            </View>
            
            <View style={styles.testUpdateArea}>
                <View style={styles.testUpdateContainer}>
                    <View style={styles.testUpdateRowContainer}>
                        <Text style={styles.rowText}>Loại test: </Text>
                        <Picker
                            selectedValue={this.state.testTypeSelectedForCreate}
                            style={styles.testTypeDropDown}
                            onValueChange={(itemValue, itemIndex) => this.setState({
                                testTypeSelectedForCreate:itemValue,
                            })}                    
                            >
                            <Picker.Item label="Chọn loại xét nghiệm" value="none" key='none'/>
                            {this.state.testList?this.state.testList.map(testType => (
                                <Picker.Item label={testType.testTypeName} value={testType.testTypeID} key={testType.testTypeID}/>
                            )):null}
                        </Picker>
                        <TouchableOpacity style={styles.createTestButton} onPress={() => this.createTest()}>
                            <Text>Tạo bài test</Text>
                        </TouchableOpacity>   
                    </View>
                    <View style={styles.testUpdateRowContainer}>
                        <Text style={styles.rowText}>Tên test:</Text>
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập tên bài test'}
                            name={"testName"}
                            onChange={this.handleChange}
                            value={this.state.testName}
                            >                
                        </TextInput>
                    </View>
                    <View style={styles.testUpdateRowContainer}>
                        <Text style={styles.rowText}>Giá tiền:</Text>
                        <TextInput style={styles.rowTextInput}
                            placeholder={'Nhập giá tiền (VNĐ)'}
                            name="testPrice"
                            onChange={this.handleChange}
                            value={this.state.testPrice}
                            >                
                        </TextInput>
                    </View>
                    <View style={styles.testUpdateRowContainer}>
                        <Text style={styles.rowTextError}>{this.state.error}</Text>                        
                    </View>
                </View>    
            </View>

            <View style={styles.testUpdateMenuArea}>
                <Picker
                    selectedValue={this.state.testTypeSelected}
                    style={styles.testTypeDropDown}
                    onValueChange={(itemValue, itemIndex) => this.setState({
                        testTypeSelected:itemValue,
                        dataChanged: !this.state.dataChanged,
                    })}                    
                    >
                    <Picker.Item label="Chọn loại xét nghiệm" value="none" key='none'/>
                    {this.state.testList?this.state.testList.map(testType => (
                        <Picker.Item label={testType.testTypeName} value={testType.testTypeID} key={testType.testTypeID}/>
                    )):null}
                </Picker>
                
                <Text style={[styles.rowText,{width:500}]}>Số lượng: {this.getTestList()?this.getTestList().length:'0'}</Text>
                
            </View>

            <View style={styles.testListFlatListArea}>        
                <FlatList style={styles.testListFlatList}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                    showsVerticalScrollIndicator={false}
                    data={this.getTestList()}
                    extraData={this.state.dataChanged}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => {
                            return (
                                <View>                                
                                <TestListItem
                                    testId={item.testID}       
                                    testName={item.testName}                             
                                    testPrice={item.price}
                                    testTypeId={item.testTypeID}  
                                    testTypeName={item.testTypeName}  
                                    updatePrice={this.updatePrice}                                                                   
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
    testUpdateViewArea: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f7f6f6',
    },
    testUpdateMenuArea: {
        height:70,
        width:"100%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '',
        padding:20,
        paddingLeft:200,
        paddingRight:200,
        marginTop:0,
        marginBottom:10,
    },
    versionDropdown:{
        alignSelf: 'stretch',
        padding:3,
        width: 200,
        borderRadius:5,
        marginRight:30,
    },
    testUpdateArea:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft:200,
        paddingRight:200,
        marginBottom:10,
    },
    testUpdateContainer:{
        alignSelf: 'stretch',
        width:'100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius:5,
        backgroundColor:'white',
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 0,
    },
    testUpdateRowContainer:{
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
        fontSize:17,
        paddingTop:3,
        
    },
    rowTextError:{
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width:150,
        fontSize:13,
        color:'red',        
    },
    testTypeDropDown:{
        alignSelf: 'stretch',
        padding:3,
        width: 500,
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
    testUpdateConfirmButton:{
        height:30,
        width:200,
        backgroundColor:'#e6e6e6',
        borderRadius:5,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:50,
    },
    createTestButton:{
        height:30,
        width:200,
        backgroundColor:'#e6e6e6',
        borderRadius:5,
        borderWidth:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:100,
    },
    testListFlatListArea:{        
        width:"100%",
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '',
    },
    testListFlatList:{
        width:"100%",
        flex:1,
        flexDirection: 'column',
        backgroundColor: '',
        padding:20,
    },

});
