import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import {COLORS} from '../styles/colors'
import IIcon from 'react-native-vector-icons/Ionicons';//md-notifications-outline  md-location-outline https://www.npmjs.com/package/react-native-material-color-picker
import RNTextInput from '../components/RNTextInput'
import RNMaskTextInput from '../components/RNMaskTextInput'
const screenWidth = Math.round(Dimensions.get('window').width);
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';

export class AddNewScreen extends Component {

    
    state={
        title: "fullname",
        description:"email",
        date: "pass",
        fromTime:"",
        toTime:"",
        location:'',
        notifyTime: '',
        labelColor:'',
        dt:''
    }


    navigateBack = () =>{
        this.props.navigation.goBack();
    }

    componentDidMount = () =>{

        handleAndroidBackButton(this.navigateBack);
    }

    componentWillUnmount() {
        removeAndroidBackButtonHandler();
      }

    render() {
        return (
            <View style={style.container}>
                <View style={{flex:.1, width: screenWidth, flexDirection:'column'}}>
                    <View style={{flex:1, flexDirection:'row', paddingTop: 18, paddingLeft:10, paddingRight:10, justifyContent:'space-between'}}>
                        <View>
                            <Icon onPress={()=> this.props.navigation.goBack()} name="close" size={30} color="#c6c6c7" />
                        </View>
                        <View>
                            <Text style={{fontSize: 18, color:'#6a6a6e', fontWeight:'bold', letterSpacing: .5}}>Add New</Text>
                        </View>
                        <View>
                            <Icon onPress={()=> alert("Save")} name="check" size={30} color="#c6c6c7" />
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
                                    />
                                    <RNTextInput
                                        style={{color:'#66666a'}}
                                        onChangeText={(description) => this.setState({description})}
                                        labelName="DESCRIPTION"
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
                                                format: 'HH:mma'
                                            }}
                                            keyboardType="numbers-and-punctuation"
                                            placeholder={moment().format('HH:mma')}
                                            placeholderTextColor="#25be7b"
                                            value={this.state.fromTime}
                                            onChangeText={(fromTime) => this.setState({fromTime})}
                                            style={{color:'#66666a', width: screenWidth*.40}}
                                            />
                                            <RNMaskTextInput
                                            labelName="TO"
                                            type={'datetime'}
                                            options={{
                                                format: 'HH:mma'
                                            }}
                                            keyboardType="numbers-and-punctuation"
                                            placeholder={moment().format('HH:mma')}
                                            placeholderTextColor="#25be7b"
                                            value={this.state.toTime}
                                            onChangeText={(toTime) => this.setState({toTime})}
                                            style={{color:'#66666a', width: screenWidth*.40}}
                                            />
                                        </View>
                                    </View>
                                    
                                    <RNTextInput
                                        style={{color:'#66666a'}}
                                        //placeholder="e.g: May 15, 1993"
                                        onChangeText={(location) => this.setState({location})}
                                        labelName="LOCATION"
                                    />
                                    
                                    <RNTextInput
                                        style={{color:'#66666a'}}
                                        //placeholder="e.g: May 15, 1993"
                                        onChangeText={(notifyTime) => this.setState({notifyTime})}
                                        labelName="NOTIFY"
                                    />
                                    
                                    <RNTextInput
                                        style={{color:'#66666a'}}
                                        //placeholder="e.g: May 15, 1993"
                                        onChangeText={(labelColor) => this.setState({labelColor})}
                                        labelName="LABEL"
                                    />
                                    
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


export default AddNewScreen
