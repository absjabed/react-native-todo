import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, SafeAreaView, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import moment from 'moment'
import { post } from '../utils/apiUtils';
import ProgressDialog from '../utils/loader'
import {COLORS} from '../styles/colors'
import IIcon from 'react-native-vector-icons/Ionicons';
import RNTextInput from '../components/RNTextInput'
import RNMaskTextInput from '../components/RNMaskTextInput'
import RNPicker from '../components/RNPicker'
const screenWidth = Math.round(Dimensions.get('window').width);
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';

const colors = [
        {label: "Reddish", value: COLORS.reddish}, 
        {label: "Orange", value: COLORS.darkOrange}, 
        {label: "Green", value: COLORS.grenish}, 
        {label: "Violate", value: COLORS.violate},
        {label: "Teal", value: COLORS.teal}
    ];

export class UpdateTaskScreen extends Component {
    
    state={
        receivedObject: [],
        loading: false,
        userId:"absjabed",
        todoId: "88AEB394-F1A1-484E-A200-65581C80B32D",
        title: "Todo Task Title",
        description:"This is the description of todo task...",
        date: "2021-02-03",
        fromTime:"08:00am",
        toTime:"09:00am",
        location:'Starbucks',
        notifyTime: '20 minutes',
        labelColor:'Reddish#dd5858',
        selectedColorObj: colors[0],
        selectedColorLabel:colors[0].label,
        selectedColorValue: colors[0].value
    }


    navigateBack = () =>{
        this.props.navigation.goBack();
    }

    UpdateTask = () =>{

        var colName = colors.filter(x => x.value === this.state.selectedColorValue)[0].label;
        var todoObj = 
        {
            "vUserId": this.state.receivedObject.vUserId,
            "vTodoId":this.state.receivedObject.vTodoId,
            "vTodoTitle": this.state.title,
            "vTodoDescription": this.state.description,
            "dDate": this.state.date,
            "tTime": this.state.fromTime+" - "+this.state.toTime,
            "vLocation": this.state.location,
            "tNotifyTime": this.state.notifyTime,
            "vColorLabel": colName+this.state.selectedColorValue
        }
        console.log(todoObj)
        Alert.alert(
            'Update Task!',
            'Do you want to update this task it Now?',
            [
              {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
              {text: 'YES', onPress: () => this.setState({loading: true},()=>{
    
                post('/UpdateTodo', todoObj)
                .then(response => {
                  
                  var responseData = response.data;
    
                    if(responseData.updatedStatus.isSucceeed){
                        Toast.show({
                            type: 'success',
                            position: 'bottom',
                            text1: responseData.updatedStatus.vMessage,
                            visibilityTime: 1000,
                            })
                            this.props.navigation.goBack();
                    }else{
                      this.setState({loading: false}, ()=>{
                        Toast.show({
                            type: 'error',
                            text1: 'Something wrong!',
                            text2: responseData.updatedStatus.vMessage,
                            })
                    }); 
                    }
        
                })
                .catch(errorMessage => {   
                    this.setState({loading: false}, ()=>{
                        Toast.show({
                            type: 'error',
                            text1: 'Something wrong!',
                            text2: errorMessage
                            })
                    }); 
                });
              })},
            ]
          );
    }

    componentDidMount = () =>{
        const todoRcvd = this.props.route.params;
        console.log('#'+todoRcvd.vColorLabel.split('#')[1]);
        //var colorObj = colors.filter(x=> x.label === )Teal#29cfbf
        this.setState({
            receivedObject: todoRcvd,
            userId: todoRcvd.vUserId,
            title: todoRcvd.vTodoTitle,
            description:todoRcvd.vTodoDescription,
            todoId: todoRcvd.vTodoId,
            date: todoRcvd.dDate,
            fromTime:todoRcvd.tTime.split(' - ')[0],
            toTime:todoRcvd.tTime.split(' - ')[1],
            location:todoRcvd.vLocation,
            notifyTime: todoRcvd.tNotifyTime,
            labelColor:todoRcvd.vColorLabel,
            selectedColorObj: colors.filter(x => x.value === ('#'+todoRcvd.vColorLabel.split('#')[1]))[0],
            selectedColorLabel:colors.filter(x => x.value === ('#'+todoRcvd.vColorLabel.split('#')[1]))[0].label,
            selectedColorValue: colors.filter(x => x.value === ('#'+todoRcvd.vColorLabel.split('#')[1]))[0].value

        },()=>{

            //console.log('todoReceived', this.state.receivedObject)
        })
        handleAndroidBackButton(this.navigateBack);
        //setTimeout(() => this.setState({ oldColor: '#fdd835' }), 1000);
    }

    changeColor = colorRgb => this.setState({ oldColor: colorRgb },()=> console.log(colorRgb))

    componentWillUnmount() {
        removeAndroidBackButtonHandler();
      }

    render() {
        return (
            <View style={style.container}>
                <ProgressDialog
                loading={this.state.loading} />
                <View style={{flex:.1, width: screenWidth, flexDirection:'column'}}>
                    <View style={{flex:1, flexDirection:'row', paddingTop: 18, paddingLeft:10, paddingRight:10, justifyContent:'space-between'}}>
                        <View>
                            <Icon onPress={()=> this.props.navigation.goBack()} name="close" size={30} color="#c6c6c7" />
                        </View>
                        <View>
                            <Text style={{fontSize: 18, color:'#6a6a6e', fontWeight:'bold', letterSpacing: .5}}>Update Task</Text>
                        </View>
                        <View>
                            <Icon onPress={()=> this.UpdateTask()} name="check" size={30} color="#c6c6c7" />
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                <SafeAreaView style={{flex: 3}}>
                    <View style={{flex: 1, flexDirection:'column', backgroundColor: 'white'}}>
                        <View style={{flex: 1, flexDirection:'column', width: screenWidth}}>
                            <View style={{backgroundColor:'#f8f8f9',width: screenWidth}}>
                                <View style={{marginLeft: 20, marginRight:20}}>
                                    <RNTextInput
                                        style={{color:'#66666a'}}
                                        onChangeText={(title) => this.setState({title})}
                                        labelName="TITLE"
                                        value = {this.state.title}
                                    />
                                    <RNTextInput
                                        style={{color:'#66666a'}}
                                        onChangeText={(description) => this.setState({description})}
                                        labelName="DESCRIPTION"
                                        value = {this.state.description}
                                    />
                                </View>
                            </View>
                            <View style={{width: screenWidth}}>
                                <View style={{marginLeft: 20, marginRight:20}}>
                                    
                                <RNMaskTextInput
                                    labelName="DATE"
                                    type={'datetime'}
                                    options={{
                                        format: 'YYYY-MM-DD'
                                      }}
                                    placeholder={moment().format('YYYY-MM-DD')}
                                    placeholderTextColor="#25be7b"
                                    value={this.state.date}
                                    onChangeText={(date) => this.setState({date})}
                                    style={{color:'#66666a'}}
                                    />
                                    <View >
                                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                            <RNMaskTextInput
                                            labelName="FROM"
                                            type={'datetime'}
                                            options={{
                                                format: 'HH:mm'
                                            }}
                                            keyboardType="numbers-and-punctuation"
                                            placeholder={moment().format('HH:mm')}
                                            placeholderTextColor="#25be7b"
                                            // {fromTime : moment(fromTime, 'HH:mma').format('HH:mma')}
                                            value={this.state.fromTime}
                                            onChangeText={(fromTime) => this.setState({fromTime})}
                                            style={{color:'#66666a', width: screenWidth*.40}}
                                            />
                                            <RNMaskTextInput
                                            labelName="TO"
                                            type={'datetime'}
                                            options={{
                                                format: 'HH:mm'
                                            }}
                                            keyboardType="numbers-and-punctuation"
                                            placeholder={moment().format('HH:mm')}
                                            placeholderTextColor="#25be7b"
                                            value={this.state.toTime}
                                            onChangeText={(toTime) => this.setState({toTime})}
                                            style={{color:'#66666a', width: screenWidth*.40}}
                                            />
                                        </View>
                                    </View>
                                    
                                    <View>
                                            <RNTextInput
                                            style={{color:'#66666a'}}
                                            //placeholder="e.g: May 15, 1993"
                                            onChangeText={(location) => this.setState({location})}
                                            labelName="LOCATION"
                                            value = {this.state.location}
                                            />
                                            <IIcon style={{position:'absolute', right:0, bottom: 0, marginBottom: 10}} size={20} color={"#7b7b7f"} name='md-location-outline'/>
                                    </View>

                                    <View>
                                            <RNTextInput
                                                style={{color:'#66666a', fontSize: 14}}
                                                //placeholder="e.g: May 15, 1993"
                                                onChangeText={(notifyTime) => this.setState({notifyTime})}
                                                value = {this.state.notifyTime}
                                                labelName="NOTIFY"
                                            />
                                            <IIcon style={{position:'absolute', right:0, bottom: 0, marginBottom: 10}} size={20} color={"#7b7b7f"} name='md-notifications-outline'/>
                                    </View>
                                    
                                    <View >
                                        <RNPicker
                                            labelName="LABEL"
                                            selectedValue={this.state.selectedColorValue}
                                            style={{height: 50, width: screenWidth*45, color:'#66666a'}}
                                            pickerData = {colors}
                                            onValueChange={(item, itemIndex) =>
                                                //console.log(item)
                                                this.setState({selectedColorValue: item})
                                            }/>
                                        <Icon style={{position:'absolute', right:0, bottom: 0, marginBottom: 10}} size={25} color={this.state.selectedColorValue} name='appstore1'/>
                                    </View>
                                    
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
                </View>
            </View>
        )
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    textInputStype :{
        // height: 50,
        // width: '100%',
        // borderColor: 'gray',
        // borderWidth: 1
        marginTop: 10,
        //borderColor: '#007FFF',
        borderBottomColor: '#f2f2f5',
        borderBottomWidth: 1,
      }
  });


export default UpdateTaskScreen

