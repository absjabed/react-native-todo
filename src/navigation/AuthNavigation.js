import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
const Stack = createStackNavigator();

export class AuthNavigation extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{
                        title: 'SplashScreen', //Set Header Title
                        headerStyle: {
                        backgroundColor: '#009999', //Set Header color
                        },
                        headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                        },
                    }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{
                        title: 'Login', //Set Header Title
                        headerStyle: {
                        backgroundColor: '#009999', //Set Header color
                        },
                        headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                        },
                    }}
                />
                <Stack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                    options={{
                        title: 'Sign Up', //Set Header Title
                        headerStyle: {
                        backgroundColor: '#009999', //Set Header color
                        },
                        headerTintColor: '#fff', //Set Header text color
                        headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                        },
                    }}
                />
        </Stack.Navigator>
        )
    }
}

export default AuthNavigation
