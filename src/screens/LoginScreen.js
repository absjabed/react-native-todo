import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, SafeAreaView, BackHandler} from 'react-native'
import { post } from '../utils/apiUtils';
import Toast from 'react-native-toast-message';
import ProgressDialog from '../utils/loader'
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';
import auth from '@react-native-firebase/auth';
import moment from 'moment'
import {AccessToken, LoginManager, GraphRequest, GraphRequestManager  } from 'react-native-fbsdk-next';
import {COLORS} from '../styles/colors'
import {SetMultiple, clearStore} from '../config/asyncStorageFunc'
import {_LOGGED_IN, _USER_PAYLOAD, _LOGIN_TYPE} from '../config/asyncStoreKey'
import {RNButton, BrandButton} from '../components/RNButton'
import RNTextInput from '../components/RNTextInput'
const screenWidth = Math.round(Dimensions.get('window').width);

export class LoginScreen extends Component {
    /**component state */
    state={
        username: '',
        password: '',
        loading: false
    }

    /** Handle login with email address*/
    handleLoginWithEmail = () =>{
        this.setState({loading: true},async ()=>{
            const userOb = {
                "VUserId": this.state.username,
                "VPassword": this.state.password
            }
             await post('/Authenticate', userOb)
              .then(response => {
      
                  this.setState({loading: false}, async ()=>{
                      var responseData = response.data;

                  if(responseData.isAuthenticated){

                    const firstPair = [_LOGGED_IN, JSON.stringify(true)];
                    const secondPair = [_LOGIN_TYPE, JSON.stringify("email")];
                    const thirdPair = [_USER_PAYLOAD, JSON.stringify(responseData.userObj)];
                    await SetMultiple([firstPair, secondPair, thirdPair]);

                      Toast.show({
                          type: 'success',
                          position: 'bottom',
                          text1: 'Successed!',
                          text2: responseData.vMessage+'👋',
                          visibilityTime: 1000,
                          })
                      this.props.navigation.navigate('HomeScreen', responseData.userObj);
                  }else{
                      await clearStore([_LOGGED_IN, _LOGIN_TYPE, _USER_PAYLOAD]);
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
                  this.setState({loading: false}, async ()=>{
                    await clearStore([_LOGGED_IN, _LOGIN_TYPE, _USER_PAYLOAD]);
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
        /**Exit app when user want to go back */
        BackHandler.exitApp();
    }

    /** Handle login with facebook login*/
    handleSignupWithFacebook = async (signupObj) =>{
        this.setState({loading: true}, async ()=>{
            
            /**Calling social login Api end */
            await post('/SocialLogin', signupObj)
                .then(response => {
        
                    this.setState({loading: false}, async ()=>{
                        var responseData = response.data;
                    if(responseData.isRegistrationSucceed && responseData.isAuthenticated){

                        /**Set Multiple value once */
                        const firstPair = [_LOGGED_IN, JSON.stringify(true)]; /**storing loggedIn flag */
                        const secondPair = [_LOGIN_TYPE, JSON.stringify("fbook")]; /**storing login type */
                        const thirdPair = [_USER_PAYLOAD, JSON.stringify(responseData.userObj)]; /**storing user object */
                        await SetMultiple([firstPair, secondPair, thirdPair]);

                        Toast.show({
                            type: 'success',
                            position: 'bottom',
                            text1: 'Successed!',
                            text2: responseData.vMessage+'👋',
                            visibilityTime: 1500,
                            })
                        /**Navigate to Home Screen...*/
                        this.props.navigation.navigate('HomeScreen', responseData.userObj);
                    }else{

                        Toast.show({
                            type: 'error',
                            position: 'bottom',
                            text1: 'Error!',
                            text2: responseData.vMessage,
                            visibilityTime: 1500,
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
        })
    }

    /**Facebook Graph Api Callback function */
    get_Response_Info = (error, result) => {
        if (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: error
                    });
          console.log('Error fetching data: ' + error.toString());
        } else {

            console.log('result', result)
          //graph-result {"birthday": "05/06/1984", "email": "open_iiuprxc_user@email.net", "id": "104239976589354", "name": "Open Graph Test User"}
         
          /**User object decorated with facebook credentials */
            const birthdayValidation = result.hasOwnProperty('birthday') ? 
                                        moment(result.birthday, "MM/DD/YYYY").format("YYYY-MM-DD") : 
                                        moment("01/01/1900", "MM/DD/YYYY").format("YYYY-MM-DD"); 
           var fbSignUpObj = {
                "VUserId": result.email,
                "VPassword": result.id,
                "VFullName": result.name,
                "DDateOfBirth": birthdayValidation
            }
            console.log('fbSignUpObj', fbSignUpObj)
            /**Handle Signup or login with facebook credentials */
            this.handleSignupWithFacebook(fbSignUpObj);
           
        }
      }

    /**On Facebook login button pressed */
    onFacebookButtonPress = async ()=> {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile','email']);
        
        //birthday_permission: 'user_birthday', 
        //login result {"declinedPermissions": [], "grantedPermissions": ["user_birthday", "public_profile", "user_friends", "email"], "isCancelled": false}

        if (result.isCancelled) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: "User cancelled the login process!"
                });
          //throw 'User cancelled the login process';
          console.log('User cancelled the login process');
          return;
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();
        console.log('data', data)
        // Start the graph request.
        const processRequest = new GraphRequest('/me?fields=birthday,email,name', null, this.get_Response_Info);
        new GraphRequestManager().addRequest(processRequest).start();
      
        if (!data) {
            Toast.show({
                type: 'error',
                text1: 'Error!',
                text2: "Something went wrong obtaining access token!"
                });
          //throw 'Something went wrong obtaining access token';
          console.log("Something went wrong obtaining access token");
          return;
        }
      
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        console.log('facebookCredential', facebookCredential)
        
        
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
      }
      

    componentDidMount = () =>{
        handleAndroidBackButton(this.navigateBack);
    }

    componentWillUnmount() {
        console.log('login screen unmounted.')
        removeAndroidBackButtonHandler();
      }
    
    render() {
        return (
            <SafeAreaView style={style.container}>
                <ProgressDialog
                loading={this.state.loading} />
                <View style={style.imageContainer}>
                    <Image source={require('../assets/images/icons8-checkmark-240.png')}></Image> 
                </View>
                <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={style.formContainerParent}>
                        <View style={style.formContainer}>
                            <RNTextInput
                                style={{height:40}}
                                onChangeText={(username) => this.setState({username})}
                                value={this.state.username}
                                labelName="USERNAME"
                                maxLength={20}
                            />
                            <View style={{flex:1}}>
                                <View style={{flex:1}}>
                                    <RNTextInput
                                    style={{height:40}}
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
                            <RNButton 
                                style={{marginTop: 25}}
                                title="Log In" 
                                customClick={this.handleLoginWithEmail} 
                            />
                            <View style={{marginTop:20, height:10, display:"flex", flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                                <Text style={{textAlign:'center', fontWeight:'bold', marginTop: 20}}>Or</Text>
                                
                                <BrandButton 
                                    iconName={"facebook"} 
                                    iconColor={"#fff"} 
                                    iconSize={30} 
                                    title="Log in with Facebook" 
                                    style={{backgroundColor: "#1877f2", width:'100%'}} 
                                    customClick={this.onFacebookButtonPress} 
                                />
                            </View>
                            <View style={style.littleMessageContainer}>
                                <Text style={style.littleMessage}>
                                DON'T HAVE AN ACCOUNT?
                                </Text>
                                <Text onPress={()=> this.props.navigation.navigate('SignUpScreen')} style={style.signinStyle}>   SIGN UP
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                </View>
            </SafeAreaView>
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
        alignItems:'center',
        marginTop: -20
    },
    formContainerParent: {
        flex: 1, 
        flexDirection:'column', 
        backgroundColor: 'white'
    },
    formContainer:{
        flex: 1, 
        flexDirection:'column', 
        width: screenWidth*0.9,
        marginTop: -20
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
        justifyContent: 'center',
        marginTop: 50
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
