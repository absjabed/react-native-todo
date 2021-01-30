import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, SectionList, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import IIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../styles/colors'
const screenWidth = Math.round(Dimensions.get('window').width);
import { jsonGroupByFunc } from '../utils/jsonGroupBy';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';

const Item = ({ title, navigation, isDone, time, location, colorLabel }) => (
    <View style={{...style.item, borderLeftWidth:5, borderLeftColor: colorLabel}}>
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{flex: .9}}>
            <TouchableOpacity onPress={()=> navigation.navigate("UpdateTaskScreen")}>
              <View style={{flex:1, flexDirection:'column'}}>
                  <View style={{flex:.5, paddingBottom:15}}>
                        <Text style={isDone ? {...style.title, color:'#bbbbbd'} : style.title}>{title}</Text> 
                  </View>
                  <View style={{flex:.5}}>
                      <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                      {time ? 
                          (<View style={{flexDirection:'row'}}>
                            <Icon style={{paddingRight:5}} size={15} color={isDone? '#bbbbbd':"#7b7b7f"} name='clockcircleo'/>
                            <Text style={{fontSize:10.5, color: isDone? '#bbbbbd':'#68686b'}}>{time}</Text>
                          </View>) : <></> }
                          
                          {location ? 
                          (<View style={{flexDirection:'row'}}>
                              <IIcon style={{paddingLeft:5, paddingRight:3}} size={15} color={isDone? '#bbbbbd':"#7b7b7f"} name='md-location-outline'/>
                              <Text style={{fontSize:10.5, color:isDone? '#bbbbbd':'#68686b'}}>{location}</Text>
                          </View>) : <></> }
                      </View>
                  </View>
              </View>
              </TouchableOpacity>
          </View>
          <View style={{flex: .1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
              {isDone ? (<IIcon onPress={()=> alert("This Task is Done Already, \nWanna Delete it?")} name="trash-outline" size={30} color="#c6c6c7" />) : <IIcon onPress={()=> alert("Wanna mark this task as done?")} name="checkmark" size={30} color="#c6c6c7" />}
          </View>
      </View>
      {/* <Text style={style.title}>{title}</Text> */}
    </View>
  );

export class HomeScreen extends Component {

    state={
        refreshing: false,
        SectionData: [],
        PreData:
        [
          {
              
              "iAutoId": 5,
      
              "vUserId": "absjabed",
      
              "vTodoId": "71A0F3A1-49DD-48EB-882C-04BD1C28CF54",
      
              "vTodoTitle": "Add New Todo 5",
      
              "vTodoDescription": "Adding New Todo from API",
      
              "dDate": "2021-12-28T00:00:00",
      
              "tTime": "9 - 08:30pm",
      
              "vLocation": "Starbucks",
      
              "tNotifyTime": "30 minutes",
      
              "vColorLabel": "Grenish#25be7b",
      
              "bIsDone": true,
      
              "bIsDeleted": false,
      
              "dDateOfEntry": "2021-01-28T16:27:54.167"
      
            },
      
            {
      
              "iAutoId": 3,
      
              "vUserId": "absjabed",
      
              "vTodoId": "71A0F3A1-49DD-48EB-882C-04BD1C28CF54",
      
              "vTodoTitle": "Add New Todo 3",
      
              "vTodoDescription": "Adding New Todo from API",
      
              "dDate": "2021-12-28T00:00:00",
      
              "tTime": "9 - 08:30pm",
      
              "vLocation": "",
      
              "tNotifyTime": "30 minutes",
      
              "vColorLabel": "Orange#ffa65b",
      
              "bIsDone": false,
      
              "bIsDeleted": false,
      
              "dDateOfEntry": "2021-01-28T16:27:54.167"
      
            },
            {
              
              "iAutoId": 4,
      
              "vUserId": "absjabed",
      
              "vTodoId": "405CF7A5-8C95-4DB2-97C9-D8495B3D025A",
      
              "vTodoTitle": "Automation Script Task 4",
      
              "vTodoDescription": "Automation Script needs to be prepared for system backup.",
      
              "dDate": "2021-12-24T00:00:00",
      
              "tTime": "8 - 8:30pm",
      
              "vLocation": "Restaurant",
      
              "tNotifyTime": "20 minutes",
      
              "vColorLabel": "Grenish#25be7b",
      
              "bIsDone": false,
      
              "bIsDeleted": false,
      
              "dDateOfEntry": "2021-01-28T09:56:41.14"
      
            },
      
            {
      
              "iAutoId": 2,
      
              "vUserId": "absjabed",
      
              "vTodoId": "405CF7A5-8C95-4DB2-97C9-D8495B3D025A",
      
              "vTodoTitle": "Automation Script Task 2",
      
              "vTodoDescription": "Automation Script needs to be prepared for system backup.",
      
              "dDate": "2021-12-24T00:00:00",
      
              "tTime": "8 - 08:30pm",
      
              "vLocation": "Bar & Grill",
      
              "tNotifyTime": "20 minutes",
      
              "vColorLabel": "Teal#29cfbf",
      
              "bIsDone": true,
      
              "bIsDeleted": false,
      
              "dDateOfEntry": "2021-01-28T09:56:41.14"
      
            },
            {
              
              "iAutoId": 6,
      
              "vUserId": "absjabed",
      
              "vTodoId": "71A0F3A1-49DD-48EB-882C-04BD1C28CF54",
      
              "vTodoTitle": "Add New Todo 3",
      
              "vTodoDescription": "New Task 6",
      
              "dDate": "2021-12-21T00:00:00",
      
              "tTime": "9 - 10:30pm",
      
              "vLocation": "Dhaka, BD",
      
              "tNotifyTime": "30 minutes",
      
              "vColorLabel": "Teal#29cfbf",
      
              "bIsDone": false,
      
              "bIsDeleted": false,
      
              "dDateOfEntry": "2021-01-28T16:27:54.167"
      
            }
      ]
        // [

        //   {
        
        //     "title": "TUESDAY, DECEMBER 28, 2021",
        
        //     "data": [
        
        //       {
        
        //         "iAutoId": 5,
        
        //         "vUserId": "absjabed",
        
        //         "vTodoId": "71A0F3A1-49DD-48EB-882C-04BD1C28CF54",
        
        //         "vTodoTitle": "Add New Todo 5",
        
        //         "vTodoDescription": "Adding New Todo from API",
        
        //         "dDate": "2021-12-28T00:00:00",
        
        //         "tTime": "9 - 08:30pm",
        
        //         "vLocation": "Starbucks",
        
        //         "tNotifyTime": "30 minutes",
        
        //         "vColorLabel": "Grenish#25be7b",
        
        //         "bIsDone": true,
        
        //         "bIsDeleted": false,
        
        //         "dDateOfEntry": "2021-01-28T16:27:54.167"
        
        //       },
        
        //       {
        
        //         "iAutoId": 3,
        
        //         "vUserId": "absjabed",
        
        //         "vTodoId": "71A0F3A1-49DD-48EB-882C-04BD1C28CF54",
        
        //         "vTodoTitle": "Add New Todo 3",
        
        //         "vTodoDescription": "Adding New Todo from API",
        
        //         "dDate": "2021-12-28T00:00:00",
        
        //         "tTime": "9 - 08:30pm",
        
        //         "vLocation": "",
        
        //         "tNotifyTime": "30 minutes",
        
        //         "vColorLabel": "Orange#ffa65b",
        
        //         "bIsDone": false,
        
        //         "bIsDeleted": false,
        
        //         "dDateOfEntry": "2021-01-28T16:27:54.167"
        
        //       }
        
        //     ]
        
        //   },
        
        //   {
        
        //     "title": "FRIDAY, DECEMBER 24, 2021",
        
        //     "data": [
        
        //       {
        
        //         "iAutoId": 4,
        
        //         "vUserId": "absjabed",
        
        //         "vTodoId": "405CF7A5-8C95-4DB2-97C9-D8495B3D025A",
        
        //         "vTodoTitle": "Automation Script Task 4",
        
        //         "vTodoDescription": "Automation Script needs to be prepared for system backup.",
        
        //         "dDate": "2021-12-24T00:00:00",
        
        //         "tTime": "8 - 8:30pm",
        
        //         "vLocation": "Restaurant",
        
        //         "tNotifyTime": "20 minutes",
        
        //         "vColorLabel": "Grenish#25be7b",
        
        //         "bIsDone": false,
        
        //         "bIsDeleted": false,
        
        //         "dDateOfEntry": "2021-01-28T09:56:41.14"
        
        //       },
        
        //       {
        
        //         "iAutoId": 2,
        
        //         "vUserId": "absjabed",
        
        //         "vTodoId": "405CF7A5-8C95-4DB2-97C9-D8495B3D025A",
        
        //         "vTodoTitle": "Automation Script Task 2",
        
        //         "vTodoDescription": "Automation Script needs to be prepared for system backup.",
        
        //         "dDate": "2021-12-24T00:00:00",
        
        //         "tTime": "8 - 08:30pm",
        
        //         "vLocation": "Bar & Grill",
        
        //         "tNotifyTime": "20 minutes",
        
        //         "vColorLabel": "Teal#29cfbf",
        
        //         "bIsDone": true,
        
        //         "bIsDeleted": false,
        
        //         "dDateOfEntry": "2021-01-28T09:56:41.14"
        
        //       }
        
        //     ]
        
        //   },
        
        //   {
        
        //     "title": "TUESDAY, DECEMBER 21, 2021",
        
        //     "data": [
        
        //       {
        
        //         "iAutoId": 6,
        
        //         "vUserId": "absjabed",
        
        //         "vTodoId": "71A0F3A1-49DD-48EB-882C-04BD1C28CF54",
        
        //         "vTodoTitle": "Add New Todo 3",
        
        //         "vTodoDescription": "New Task 6",
        
        //         "dDate": "2021-12-21T00:00:00",
        
        //         "tTime": "9 - 10:30pm",
        
        //         "vLocation": "Dhaka, BD",
        
        //         "tNotifyTime": "30 minutes",
        
        //         "vColorLabel": "Teal#29cfbf",
        
        //         "bIsDone": false,
        
        //         "bIsDeleted": false,
        
        //         "dDateOfEntry": "2021-01-28T16:27:54.167"
        
        //       }
        
        //     ]
        
        //   }
        
        // ]

    }
    

    navigateToUpdateScreen = (item) =>{
      UpdateTaskScreen
    }

    navigateBack = () =>{
        this.props.navigation.goBack();
    }

    componentDidMount = () =>{

        var processedData = jsonGroupByFunc(this.state.PreData, 'dDate');

        this.setState({SectionData: processedData});

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
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={()=>  this.setState({refreshing: true},()=>{
                              setTimeout(()=>{
                                this.setState({refreshing: false})
                              },1500)
                            })} />}
                            keyExtractor={(item, index) => item.iAutoId + index}
                            renderItem={({ item }) => <Item title={item.vTodoTitle} navigation={this.props.navigation} time={item.tTime} location={item.vLocation} isDone={item.bIsDone} colorLabel={'#'+item.vColorLabel.split('#')[1]} />}
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
      padding: 25,
      borderBottomColor: COLORS.fadeWhite,
      borderBottomWidth: .4,
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
      fontSize: 14,
      color: '#353535'
    }
  });

export default HomeScreen
