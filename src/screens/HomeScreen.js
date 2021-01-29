import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, SectionList, SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../styles/colors'
const screenWidth = Math.round(Dimensions.get('window').width);
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';

const colorArr = [COLORS.teal, COLORS.violate, COLORS.darkOrange, COLORS.grenish]
const Item = ({ title }) => (
    <View style={{...style.item,borderLeftWidth:5, borderLeftColor: colorArr[Math.floor(Math.random() * 3) + 0]}}>
      <Text style={style.title}>{title}</Text>
    </View>
  );

export class HomeScreen extends Component {

    state={
        SectionData:[
            {
              title: "TUESDAY,  MARCH 9",
              data: ["Pizza", "Burger", "Risotto"]
            },
            {
              title: "WEDNESDAY,  APRIL 29",
              data: ["French Fries", "Onion Rings", "Fried Shrimps"]
            },
            {
              title: "FRIDAY,  JANUARY 15",
              data: ["Water", "Coke", "Beer"]
            },
            {
              title: "SUNDAY,  FEBRUARY 22",
              data: ["Cheese Cake", "Ice Cream"]
            }
          ],

    }
    

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
                            <Icon onPress={()=> alert("Nav Menu")} name="bars" size={30} color="#c6c6c7" />
                        </View>
                        <View>
                            <Text style={{fontSize: 18, color:'#6a6a6e', fontWeight:'bold', letterSpacing: .5}}>Home</Text>
                        </View>
                        <View>
                            <Icon onPress={()=> this.props.navigation.navigate("AddNewScreen")} name="plus" size={30} color="#c6c6c7" />
                        </View>
                    </View>
                </View>
                <View style={{flex: 3.5, width: screenWidth}}>
                        <SafeAreaView style={{
                                    flex: 1,
                                    //paddingTop:5,
                                    backgroundColor:COLORS.darkWhite,
                                    marginHorizontal: 2
                                }}>
                            <SectionList
                            sections={this.state.SectionData}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) => <Item title={item} />}
                            renderSectionHeader={({ section: { title } }) => (
                                <Text style={style.header}>{title}</Text>
                            )}
                            />
                        </SafeAreaView>
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
    },
    sectionContainer: {
        flex: 3,
        //backgroundColor:'red',
        marginHorizontal: 10
      },
    item: {
      backgroundColor: "#fff",
      padding: 30,
      borderBottomColor: COLORS.fadeWhite,
      borderBottomWidth: StyleSheet.hairlineWidth,
      //marginVertical: 8
    },
    header: {
      fontSize: 12,
      letterSpacing: .5,
      backgroundColor: COLORS.darkWhite,
      color: COLORS.fadeWhite,
      paddingTop:20,
      paddingLeft: 15,
      paddingBottom:20,
    },
    title: {
      fontSize: 21,
      color: '#808083'
    }
  });

export default HomeScreen
