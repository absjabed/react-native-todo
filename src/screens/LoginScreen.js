import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, SafeAreaView, BackHandler} from 'react-native'
import { post } from '../utils/apiUtils';
import Toast from 'react-native-toast-message';
import ProgressDialog from '../utils/loader'
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';
import {COLORS} from '../styles/colors'
import RNButton from '../components/RNButton'
import RNTextInput from '../components/RNTextInput'
const screenWidth = Math.round(Dimensions.get('window').width);

export class LoginScreen extends Component {
    state={
        username: '',
        password: '',
        loading: false,
    }

    handleLogin = () =>{
        this.setState({loading: true},()=>{
            const userOb = {
                "VUserId": this.state.username,
                "VPassword": this.state.password
            }
              post('/Authenticate', userOb)
              .then(response => {
      
                  this.setState({loading: false}, ()=>{
                      var responseData = response.data;
                  if(responseData.isAuthenticated){
                      Toast.show({
                          type: 'success',
                          position: 'bottom',
                          text1: 'Successed!',
                          text2: responseData.vMessage+'👋',
                          visibilityTime: 1000,
                          })
                      this.props.navigation.navigate('HomeScreen', responseData.userObj);
                  }else{
                      Toast.show({
                          type: 'error',
                          position: 'bottom',
                          text1: 'Error!',
                          text2: responseData.vMessage,
                          visibilityTime: 1000,
                          })
                  }
                  });
      
              })
              .catch(errorMessage => {   
                  this.setState({loading: false}, ()=>{
                      Toast.show({
                          type: 'error',
                          text1: 'Error!',
                          text2: errorMessage
                          })
                  }); 
              });
        });
    }

    navigateBack = () =>{
        BackHandler.exitApp();
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
                <ProgressDialog
                loading={this.state.loading} />
                <View style={style.imageContainer}>
                    <Image source={require('../assets/images/icons8-checkmark-240.png')}></Image> 
                </View>
                <View style={{flex: 1}}>
                <SafeAreaView style={{flex: 1}}>
                    <View style={style.formContainerParent}>
                        <View style={style.formContainer}>
                            <RNTextInput
                                onChangeText={(username) => this.setState({username})}
                                value={this.state.username}
                                labelName="USERNAME"
                                maxLength={20}
                            />
                            <View style={{flex:1}}>
                                <View style={{flex:1}}>
                                    <RNTextInput
                                    value={this.state.password}
                                    onChangeText={(password) => this.setState({password})}
                                    labelName="PASSWORD"
                                    secureTextEntry
                                />
                                </View>
                                <View style={style.forgotPasswordView}>
                                    <Text onPress={()=> alert("Forgot Password!")} style={style.forgotPasswordTxt}>Forgot Password</Text>
                                </View>
                            </View>
                            <RNButton title="Sign In" style={{paddingTop:20}} customClick={this.handleLogin} />
                            <View style={style.littleMessageContainer}>
                                <Text style={style.littleMessage}>
                                DON'T HAVE AN ACCOUNT?
                                </Text>
                                <Text onPress={()=> this.props.navigation.navigate('SignUpScreen')} style={style.signinStyle}>   SIGN UP
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
    },
    imageContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    formContainerParent: {
        flex: 1, 
        flexDirection:'column', 
        backgroundColor: 'white'
    },
    formContainer:{
        flex: 1, 
        flexDirection:'column', 
        width: screenWidth*0.9
    },
    forgotPasswordView:{
        flex:1, 
        right:0, 
        top:0, 
        marginTop:45, 
        position:'absolute'
    },
    forgotPasswordTxt:{
        fontSize:12, 
        fontWeight:'bold', 
        color:'#c3c3c5',
        letterSpacing: .2
    },
    littleMessageContainer:{
        flex:1, 
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent: 'center'
    },
    littleMessage:{
        fontSize: 12,
        textAlign: 'center',
        color: '#c3c3c5',
        fontWeight:'bold'
    },
    signinStyle:{
        fontSize: 12, 
        textAlign: 'center',
        fontWeight:'bold', 
        color: '#7d7d80', 
        letterSpacing: .5
    }
  });

export default LoginScreen
