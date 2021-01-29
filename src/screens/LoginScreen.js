import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, ScrollView, SafeAreaView, KeyboardAvoidingView} from 'react-native'
//import splashStyle from '../styles/ScreenStyles/splashScreen.style'
import {COLORS} from '../styles/colors'
import RNButton from '../components/RNButton'
import RNText from '../components/RNText'
import RNTextInput from '../components/RNTextInput'

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export class LoginScreen extends Component {
    state={
        username: 'userid',
        password: 'pass'
    }

    handleLogin = () =>{
        const userOb = {
          "username": this.state.username,
          "password": this.state.password
      }
      console.log(userOb)
    }

    
    render() {
        return (
            <View style={style.container}>
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',alignItems:'center'}}>
                    <Image source={require('../assets/images/icons8-checkmark-240.png')}></Image> 
                </View>
                <View style={{flex: 1}}>
                <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, flexDirection:'column', backgroundColor: 'white'}}>
        <View style={{flex: 1, flexDirection:'column', width: screenWidth*0.9}}>
              {/* <Text>USERNAME</Text> */}
              <RNTextInput
                onChangeText={(username) => this.setState({username})}
                labelName="USERNAME"
                maxLength={20}
              />
              {/* <Text>PASSWORD</Text> */}
              <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <RNTextInput
                    onChangeText={(password) => this.setState({password})}
                    labelName="PASSWORD"
                    secureTextEntry
                  />
                </View>
                <View style={{flex:1, right:0, top:0, marginTop:45, position:'absolute'}}>
                    <Text onPress={()=> console.log("forgot password")} style={{fontSize:12, fontWeight:'bold', color:'#c3c3c5'}}>Forgot Password</Text>
                </View>
              </View>
              <RNButton title="SIGN IN" style={{paddingTop:20}} customClick={this.handleLogin} />
          <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 12,textAlign: 'center',color: '#c3c3c5'}}>
              DON'T HAVE AN ACCOUNT?
            </Text>
            <Text onPress={()=> console.log("signup")} style={{fontSize: 12, textAlign: 'center',color: '#7d7d80'}}>   SIGN UP
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
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
    }
  });

export default LoginScreen
