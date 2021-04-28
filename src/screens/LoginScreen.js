import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Image, SafeAreaView, BackHandler} from 'react-native'
import { post } from '../utils/apiUtils';
import Toast from 'react-native-toast-message';
import ProgressDialog from '../utils/loader'
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';
import auth from '@react-native-firebase/auth';
import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager  } from 'react-native-fbsdk-next';
import {COLORS} from '../styles/colors'
import {RNButton, BrandButton} from '../components/RNButton'
import RNTextInput from '../components/RNTextInput'
const screenWidth = Math.round(Dimensions.get('window').width);

export class LoginScreen extends Component {
    state={
        username: '',
        password: '',
        loading: false,
        user_name: '',
        email:'',
        avatar_url: '',
        avatar_show: false
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

    get_Response_Info = (error, result) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
     
        //   this.setState({ 
        //       user_name: 'Welcome' + ' ' + result.name,
        //       avatar_url: result.picture.data.url,
        //       avatar_show: true
        //      });
     
          console.log('graph-result',result);
     
        }
      }

    navigateBack = () =>{
        BackHandler.exitApp();
    }

    onFacebookButtonPress = async ()=> {
        /**TODO: 1# Get your info from graph API
         * 2# store api response in localDB or Async Storage for auto login
         * 3# Register with fb info, with new api end, not need to register if already exists
         * 4# User logout will be from Async Storage and also from firebase auth
         * 5# iOS Dependencies installation with pod and setup existing libraries.
         */
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile','user_birthday','email']);
        console.log('login result', result);
        if (result.isCancelled) {
          //throw 'User cancelled the login process';
          console.log('User cancelled the login process');
        }
      /**login result {"declinedPermissions": [], "grantedPermissions": ["user_birthday", "public_profile", "user_friends", "email"], "isCancelled": false}
[Thu Apr 29 2021 24:20:28.407]  LOG      fb-cred {"providerId": "facebook.com", "secret": "", "token": "EAA4ZApkrxPg8BAJtUSNlCvEkH3M0wq0UgrmgFikI0DxJV1DzI9at3tpwAsA1bkXTIv2OxZC4Ja3pZBDSU9RfGi77ruHNSACsH3sjAZBFYZChRZB8FKZBlUR78WJWOTcJFy0TzwJvrnHUa1of4U2EPqoAAXy37oD2O1ZCDanqcZBnSpxVo45rvLb1hfLseHp4SCDCKf1UECEQNG9CCcUbAWjBIP1ACHnYQyJAoeUGxV4ZAh0sS9XZBqwR8b7YZBKTUDfjAN4ZD"}
[Thu Apr 29 2021 24:20:28.946]  LOG      graph-result {"birthday": "05/06/1984", "email": "open_iiuprxc_user@tfbnw.net", "id": "104239975152811", "name": "Open Graph Test User"}
 */
        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        const processRequest = new GraphRequest(
            '/me?fields=birthday,email,name',
            null,
            this.get_Response_Info
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(processRequest).start();
      
        if (!data) {
          //throw 'Something went wrong obtaining access token';
          console.log("Something went wrong obtaining access token");
        }
      
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        console.log('fb-cred', facebookCredential);
        // Sign-in the user with the credential
        return auth().signInWithCredential(facebookCredential);
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
                            <RNButton 
                                style={{marginTop: 25}}
                                title="Log In" 
                                customClick={this.handleLogin} 
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
                                {/* <LoginButton
                                //style={{width: "50%", marginRight:15}}
                                //permissions={['public_profile']}
                                permissions={['public_profile']}
                                onLoginFinished={
                                    (error, result) => {
                                    if (error) {
                                        console.log("login has error: " + result.error);
                                    } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                    } else {
                                        AccessToken.getCurrentAccessToken().then((data) => {
                                            console.log(data.accessToken.toString());

                                            const processRequest = new GraphRequest(
                                                '/me?fields=name,email',
                                                null,
                                                this.get_Response_Info
                                              );
                                              // Start the graph request.
                                              new GraphRequestManager().addRequest(processRequest).start();
                                        })
                                    }
                                    }
                                }
                                onLogoutFinished={() => console.log("logout.")}/> */}
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
