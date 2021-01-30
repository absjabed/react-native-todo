import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen'
import LoginScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import HomeScreen from './src/screens/HomeScreen'
import AddNewScreen from './src/screens/AddNewScreen'
import UpdateTaskScreen from './src/screens/UpdateTaskScreen'
// import AuthNavigation from './src/navigation/AuthNavigation'
// import StackNavigation from './src/navigation/StackNavigation'
// import DrawerNavigation from './src/navigation/DrawerNavigation'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
              <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{
                        title: 'SplashScreen', //Set Header Title
                        //header: null,
                        headerShown: false,
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
                        headerShown: false,
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
                        headerShown: false,
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
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        title: 'Home', //Set Header Title
                        headerShown: false,
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
                    name="AddNewScreen"
                    component={AddNewScreen}
                    options={{
                        title: 'Add New', //Set Header Title
                        headerShown: false,
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
                    name="UpdateTaskScreen"
                    component={UpdateTaskScreen}
                    options={{
                        title: 'Update Task', //Set Header Title
                        headerShown: false,
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
      {/* <AuthNavigation/>
      <DrawerNavigation/>
      <StackNavigation/> */}
    </NavigationContainer>
  );
};

export default App;