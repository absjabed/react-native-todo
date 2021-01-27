import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen'
import AddNewScreen from '../screens/AddNewScreen'
const Stack = createStackNavigator();

export class StackNavigation extends Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        title: 'Home', //Set Header Title
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

export default StackNavigation
