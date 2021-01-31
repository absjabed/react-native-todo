import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../styles/colors'
import RNTextInput from '../components/RNTextInput'
const screenWidth = Math.round(Dimensions.get('window').width);
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';

export class AddNewScreen extends Component {

    
    state={
        fullName: "fullname",
        email:"email",
        password: "pass",
        birthday:""
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
                <View style={{flex:.11, width: screenWidth, flexDirection:'column'}}>
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
                                <RNTextInput
                                    style={{}}
                                    onChangeText={(fullName) => this.setState({fullName})}
                                    labelName="TITLE"
                                />
                                <RNTextInput
                                    onChangeText={(email) => this.setState({email})}
                                    labelName="DESCRIPTION"
                                    maxLength={20}
                                />
                            </View>
                            <View style={{width: screenWidth}}>
                                <RNTextInput
                                    onChangeText={(password) => this.setState({password})}
                                    labelName="DATE"
                                />
                                <RNTextInput
                                    onChangeText={(password) => this.setState({password})}
                                    labelName="FROM/TO"
                                />
                                <RNTextInput
                                    //placeholder="e.g: May 15, 1993"
                                    onChangeText={(birthday) => this.setState({birthday})}
                                    labelName="LOCATION"
                                />
                                
                                <RNTextInput
                                    //placeholder="e.g: May 15, 1993"
                                    onChangeText={(birthday) => this.setState({birthday})}
                                    labelName="NOTIFY"
                                />
                                
                                <RNTextInput
                                    //placeholder="e.g: May 15, 1993"
                                    onChangeText={(birthday) => this.setState({birthday})}
                                    labelName="LABEL"
                                />
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
    }
  });


export default AddNewScreen
