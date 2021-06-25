import React, { Component } from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {retrieveItem, clearStore} from '../config/asyncStorageFunc'
import {_LOGGED_IN, _USER_PAYLOAD, _LOGIN_TYPE, _ALL_TODO} from '../config/asyncStoreKey'
import {COLORS} from '../styles/colors'

/**Splash Screen for Initial Logo timeout */
export class SplashScreen extends Component {
  
  /**Life cycle function called  when component mounted */
  componentDidMount= async ()=>{

    /**retriving loggedIn flag and stored user data from async storage */
    var isLoggedIn = await retrieveItem(_LOGGED_IN);
    var userInfo = await retrieveItem(_USER_PAYLOAD);

    /**Timeout to show splash screen */
    setTimeout(()=>{

      /**If user already loggedin and local storage have user data then
       * then redirect screen to home screen or
       * redirect to login screen for new login
       */
      if(isLoggedIn && userInfo != null){
        this.props.navigation.navigate('HomeScreen', userInfo); 
      }else{
        /**Clears if there is any previous unwanted data left in local storage */
        clearStore([_LOGGED_IN, _USER_PAYLOAD, _LOGIN_TYPE]);
        this.props.navigation.navigate('LoginScreen');
      }

    },1500)
  }
    
    render() {
        return (
            <View style={style.container}>
                <View style={style.imageContainer}>
                    <Image source={require('../assets/images/icons8-checkmark-240.png')}></Image> 
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
    }
  });

export default SplashScreen
