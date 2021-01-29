import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';

export class HomeScreen extends Component {


    
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
            <View>
                <Text> Home Screen </Text>
            </View>
        )
    }
}

export default HomeScreen
