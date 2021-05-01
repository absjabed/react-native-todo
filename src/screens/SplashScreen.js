import React, { Component } from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {retrieveItem, clearStore} from '../config/asyncStorageFunc'
import {_LOGGED_IN, _USER_PAYLOAD, _LOGIN_TYPE, _ALL_TODO} from '../config/asyncStoreKey'
import {COLORS} from '../styles/colors'


export class SplashScreen extends Component {
    
  componentDidMount= async ()=>{
    console.log("splash did mount.")
    var isLoggedIn = await retrieveItem(_LOGGED_IN);
    var userInfo = await retrieveItem(_USER_PAYLOAD);

    setTimeout(()=>{
      if(isLoggedIn && userInfo != null){
        this.props.navigation.navigate('HomeScreen', userInfo); 
      }else{
        clearStore([_LOGGED_IN, _USER_PAYLOAD, _LOGIN_TYPE]);
        this.props.navigation.navigate('LoginScreen');
      }
    },1500)
  }

  componentWillUnmount(){
    console.log('splash screen unmounted.')
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
