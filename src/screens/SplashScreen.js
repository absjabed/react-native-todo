import React, { Component } from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {COLORS} from '../styles/colors'


export class SplashScreen extends Component {
    
  componentDidMount=()=>{
    console.log("splash did mount.")
    setTimeout(()=>{
      this.props.navigation.navigate('LoginScreen')
    },1500)
  }
    
    render() {
        return (
            <View style={style.container}>
                <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',alignItems:'center'}}>
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
    }
  });

export default SplashScreen
