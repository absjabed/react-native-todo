import React, { Component } from 'react'
import { Text, View } from 'react-native'
import HomeScreen from '../screens/HomeScreen'
import AddNewScreen from '../screens/AddNewScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

export class DrawerNavigation extends Component {
    render() {
        return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Add New" component={AddNewScreen} />
            </Drawer.Navigator>
        )
    }
}

export default DrawerNavigation
