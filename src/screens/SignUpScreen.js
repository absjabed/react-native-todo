import React, { Component } from 'react'
import { Text, View, StyleSheet, Image,Dimensions, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../styles/colors'
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';
const screenWidth = Math.round(Dimensions.get('window').width);
import RNButton from '../components/RNButton'
import RNTextInput from '../components/RNTextInput'
export class SignUpScreen extends Component {

    state={
        fullName: "fullname",
        email:"email",
        password: "pass",
        birthday:""
    }

    handleSignup = () =>{
        
            const signupUserOb = {
              "fullName": this.state.fullName,
              "email": this.state.email,
              "password": this.state.password,
              "birthday": this.state.birthday

          }
          console.log(signupUserOb)
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
                <View style={{flex:.3, width: screenWidth, flexDirection:'column'}}>
                    <View style={{flex:1, flexDirection:'row', paddingTop: 18, justifyContent:'center'}}>
                        <View style={{position:'absolute', left:15, top: 18, }}>
                            <Icon onPress={()=> this.props.navigation.goBack()} name="close" size={30} color="#c6c6c7" />
                        </View>
                        <View>
                            <Text style={{fontSize: 18, color:'#6a6a6e', fontWeight:'bold', letterSpacing: .5}}>Sign up</Text>
                        </View>
                    </View>
                    <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',alignItems:'center'}}>
                        <Image style={style.profileImage} source={require('../assets/images/propic.jpg')}></Image> 
                        <View style={style.imageAddBtn}>
                            <Icon onPress={()=> alert("Add an Image.")} name="plus" size={15} color={COLORS.white} />
                        </View>
                    </View>
                </View>
                <View style={{flex: .7, marginTop:60}}>
                <SafeAreaView style={{flex: 3}}>
                    <View style={{flex: 1, flexDirection:'column', backgroundColor: 'white'}}>
                        <View style={{flex: 1, flexDirection:'column', width: screenWidth*0.9}}>
                            <RNTextInput
                                onChangeText={(fullName) => this.setState({fullName})}
                                labelName="FULL NAME"
                            />
                            <RNTextInput
                                onChangeText={(email) => this.setState({email})}
                                labelName="EMAIL"
                                maxLength={20}
                            />
                            <RNTextInput
                                onChangeText={(password) => this.setState({password})}
                                labelName="PASSWORD"
                            />
                            <RNTextInput
                                placeholder="e.g: May 15, 1993"
                                onChangeText={(birthday) => this.setState({birthday})}
                                labelName="BIRTHDAY"
                            />
                            <RNButton title="Sign Up" style={{paddingTop:20}} customClick={this.handleSignup} />
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 12,textAlign: 'center',color: '#c3c3c5', fontWeight:'bold'}}>
                                ALREADY HAVE AN ACCOUNT?
                                </Text>
                                <Text onPress={()=> this.props.navigation.goBack()} style={{fontSize: 12, textAlign: 'center', fontWeight:'bold', color: '#7d7d80', letterSpacing:.5}}>   SIGN IN
                                </Text>
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
    profileImage:{
        height: 120, 
        width:120, 
        borderRadius: 70
    },
    imageAddBtn:{ 
        height:25, 
        width:25, 
        position:'absolute', 
        borderRadius:25, 
        top:-5, 
        right:140, 
        backgroundColor: COLORS.grenish, 
        justifyContent:'center', 
        alignItems:'center'
    }
  });

export default SignUpScreen
