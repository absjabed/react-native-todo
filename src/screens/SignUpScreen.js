import React, { Component } from 'react'
import { Text, View, StyleSheet, Image,Dimensions, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { post } from '../utils/apiUtils';
import Toast from 'react-native-toast-message';
import ProgressDialog from '../utils/loader'
import {COLORS} from '../styles/colors'
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';
import {clearStore, SetMultiple} from '../config/asyncStorageFunc'
import {_LOGGED_IN, _USER_PAYLOAD, _LOGIN_TYPE} from '../config/asyncStoreKey'
const screenWidth = Math.round(Dimensions.get('window').width);
import {RNButton} from '../components/RNButton'
import RNMaskTextInput from '../components/RNMaskTextInput'
import RNTextInput from '../components/RNTextInput'
export class SignUpScreen extends Component {

    state={
        fullName: "",
        email:"",
        password: "",
        birthday:"",
        loading: false
    }

    /**Handling signup with normal email */
    handleSignup = async() =>{
        this.setState({loading: true}, async ()=>{
            const signupUserOb = {
                "VFullName": this.state.fullName,
                "VUserId": this.state.email,
                "VPassword": this.state.password,
                "DDateOfBirth": this.state.birthday
  
            }
            console.log(signupUserOb)
  
  
            await post('/SignUp', signupUserOb)
                .then(response => {
        
                    this.setState({loading: false}, async ()=>{
                        var responseData = response.data;
                    if(responseData.isRegistrationSucceed && responseData.isAuthenticated){

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
                        this.setState({loading: false}, async ()=>{
                            await clearStore([_LOGGED_IN, _LOGIN_TYPE, _USER_PAYLOAD]);
                            Toast.show({
                                type: 'error',
                                position: 'bottom',
                                text1: 'Error!',
                                text2: responseData.vMessage,
                                visibilityTime: 1000,
                                })
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
        })
    }


    navigateBack = () =>{
        this.props.navigation.goBack();
    }


    componentDidMount = () =>{
        handleAndroidBackButton(this.navigateBack);
    }

    componentWillUnmount() {
        console.log('signup screen unmounted.')
        removeAndroidBackButtonHandler();
      }

    render() {
        return (
            <SafeAreaView style={style.container}>
                <ProgressDialog
                loading={this.state.loading} />
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
                <View style={{flex: 3}}>
                    <View style={{flex: 1, flexDirection:'column', backgroundColor: 'white'}}>
                        <View style={{flex: 1, flexDirection:'column', width: screenWidth*0.9}}>
                            <RNTextInput
                                style={{height:40}}
                                value={this.state.fullName}
                                onChangeText={(fullName) => this.setState({fullName})}
                                labelName="FULL NAME"
                            />
                            <RNTextInput
                                style={{height:40}}
                                value={this.state.email}
                                onChangeText={(email) => this.setState({email})}
                                labelName="EMAIL"
                            />
                            <RNTextInput
                                style={{height:40}}
                                value={this.state.password}
                                onChangeText={(password) => this.setState({password})}
                                secureTextEntry
                                labelName="PASSWORD"
                            />
                            <RNMaskTextInput
                                    labelName="BIRTHDAY"
                                    type={'datetime'}
                                    options={{
                                        format: 'YYYY-MM-DD'
                                      }}
                                    placeholder="1992-02-29"
                                    placeholderTextColor="#25be7b"
                                    value={this.state.birthday}
                                    onChangeText={(birthday) => this.setState({birthday})}
                                    style={{height:40}}
                                    />
                            {/* <RNTextInput
                                value={this.state.birthday}
                                placeholder="e.g: May 15, 1993"
                                onChangeText={(birthday) => this.setState({birthday})}
                                labelName="BIRTHDAY"
                            /> */}
                            <RNButton style={{marginTop: 15}} title="Sign Up" customClick={this.handleSignup} />
                            <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 12,textAlign: 'center',color: '#c3c3c5', fontWeight:'bold'}}>
                                ALREADY HAVE AN ACCOUNT?
                                </Text>
                                <Text onPress={()=> this.props.navigation.goBack()} style={{fontSize: 12, textAlign: 'center', fontWeight:'bold', color: '#7d7d80', letterSpacing:.5}}>   SIGN IN
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
