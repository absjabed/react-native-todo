import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../styles/colors'
const screenWidth = Math.round(Dimensions.get('window').width);
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';

export class UpdateTaskScreen extends Component {


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
            <View style={style.container}>
                <View style={{flex:.3, width: screenWidth, flexDirection:'column'}}>
                    <View style={{flex:1, flexDirection:'row', paddingTop: 18, paddingLeft:10, paddingRight:10, justifyContent:'space-between'}}>
                        <View>
                            <Icon onPress={()=> this.props.navigation.goBack()} name="close" size={30} color="#c6c6c7" />
                        </View>
                        <View>
                            <Text style={{fontSize: 18, color:'#6a6a6e', fontWeight:'bold', letterSpacing: .5}}>Update Task</Text>
                        </View>
                        <View>
                            <Icon onPress={()=> alert("Save")} name="check" size={30} color="#c6c6c7" />
                        </View>
                    </View>
                </View>
            </View>
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
    }
  });


export default UpdateTaskScreen
