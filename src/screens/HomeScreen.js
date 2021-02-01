import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Alert, SectionList, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { post } from '../utils/apiUtils';
import Toast from 'react-native-toast-message';
import ProgressDialog from '../utils/loader'
import IIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../styles/colors'
const screenWidth = Math.round(Dimensions.get('window').width);
import { jsonGroupByFunc } from '../utils/jsonGroupBy';
import { handleAndroidBackButton, removeAndroidBackButtonHandler } from '../utils/backHandler.config';

const Item = ({itemObj,navigation, doneEvent, deleteEvent}) => (
    <View style={{...style.item, borderLeftWidth:5, borderLeftColor: '#'+itemObj.vColorLabel.split('#')[1]}}>
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{flex: .9}}>
            <TouchableOpacity onPress={()=> navigation.navigate("UpdateTaskScreen", itemObj)}>
              <View style={{flex:1, flexDirection:'column'}}>
                  <View style={{flex:.5, paddingBottom:15}}>
                        <Text style={itemObj.bIsDone ? {...style.title, color:'#bbbbbd'} : style.title}>{itemObj.vTodoTitle}</Text> 
                  </View>
                  <View style={{flex:.5}}>
                      <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                      {itemObj.tTime ? 
                          (<View style={{flexDirection:'row'}}>
                            <Icon style={{paddingRight:5}} size={15} color={itemObj.bIsDone? '#bbbbbd':"#7b7b7f"} name='clockcircleo'/>
                            <Text style={{fontSize:10.5, color: itemObj.bIsDone? '#bbbbbd':'#68686b'}}>{itemObj.tTime}</Text>
                          </View>) : <></> }
                          
                          {itemObj.vLocation ? 
                          (<View style={{flexDirection:'row'}}>
                              <IIcon style={{paddingLeft:5, paddingRight:3}} size={15} color={itemObj.bIsDone? '#bbbbbd':"#7b7b7f"} name='md-location-outline'/>
                              <Text style={{fontSize:10.5, color:itemObj.bIsDone? '#bbbbbd':'#68686b'}}>{itemObj.vLocation}</Text>
                          </View>) : <></> }
                      </View>
                  </View>
              </View>
              </TouchableOpacity>
          </View>
          <View style={{flex: .1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
              {itemObj.bIsDone ? 
              (<IIcon 
                  onPress={()=> deleteEvent(itemObj)} 
                  name="trash-outline" size={30} 
                  color="#c6c6c7" />) : 
                (<IIcon 
                  onPress={()=> doneEvent(itemObj)} 
                  name="checkmark" size={30} color="#c6c6c7" />)}
          </View>
      </View>
      {/* <Text style={style.title}>{title}</Text> */}
    </View>
  );

export class HomeScreen extends Component {

    state={
        refreshing: false,
        loading: false,
        userInfo: [],
        SectionData: [],
        PreData:
        [
          // {
              
          //     "iAutoId": 5,
      
          //     "vUserId": "absjabed",
      
          //     "vTodoId": "71A0F3A1-49DD-48EB-882C-04BD1C28CF54",
      
          //     "vTodoTitle": "Add New Todo 5",
      
          //     "vTodoDescription": "Adding New Todo from API",
      
          //     "dDate": "2021-12-28T00:00:00",
      
          //     "tTime": "09:00am - 08:30pm",
      
          //     "vLocation": "Starbucks",
      
          //     "tNotifyTime": "30 minutes",
      
          //     "vColorLabel": "Grenish#25be7b",
      
          //     "bIsDone": true,
      
          //     "bIsDeleted": false,
      
          //     "dDateOfEntry": "2021-01-28T16:27:54.167"
      
          //   },
      
          //   {
      
          //     "iAutoId": 3,
      
          //     "vUserId": "absjabed",
      
          //     "vTodoId": "71A0F3A1-49DD-48EB-882C-04BD1C28CF54",
      
          //     "vTodoTitle": "Add New Todo 3",
      
          //     "vTodoDescription": "Adding New Todo from API",
      
          //     "dDate": "2021-12-28T00:00:00",
      
          //     "tTime": "9:00am - 08:30pm",
      
          //     "vLocation": "",
      
          //     "tNotifyTime": "30 minutes",
      
          //     "vColorLabel": "Orange#ffa65b",
      
          //     "bIsDone": false,
      
          //     "bIsDeleted": false,
      
          //     "dDateOfEntry": "2021-01-28T16:27:54.167"
      
          //   },
          //   {
              
          //     "iAutoId": 4,
      
          //     "vUserId": "absjabed",
      
          //     "vTodoId": "405CF7A5-8C95-4DB2-97C9-D8495B3D025A",
      
          //     "vTodoTitle": "Automation Script Task 4",
      
          //     "vTodoDescription": "Automation Script needs to be prepared for system backup.",
      
          //     "dDate": "2021-12-24T00:00:00",
      
          //     "tTime": "08:00pm - 08:30pm",
      
          //     "vLocation": "Restaurant",
      
          //     "tNotifyTime": "20 minutes",
      
          //     "vColorLabel": "Grenish#25be7b",
      
          //     "bIsDone": false,
      
          //     "bIsDeleted": false,
      
          //     "dDateOfEntry": "2021-01-28T09:56:41.14"
      
          //   },
      
          //   {
      
          //     "iAutoId": 2,
      
          //     "vUserId": "absjabed",
      
          //     "vTodoId": "405CF7A5-8C95-4DB2-97C9-D8495B3D025A",
      
          //     "vTodoTitle": "Automation Script Task 2",
      
          //     "vTodoDescription": "Automation Script needs to be prepared for system backup.",
      
          //     "dDate": "2021-12-24T00:00:00",
      
          //     "tTime": "8:00am - 08:30pm",
      
          //     "vLocation": "Bar & Grill",
      
          //     "tNotifyTime": "20 minutes",
      
          //     "vColorLabel": "Reddish#dd5858",
      
          //     "bIsDone": true,
      
          //     "bIsDeleted": false,
      
          //     "dDateOfEntry": "2021-01-28T09:56:41.14"
      
          //   },
          //   {
              
          //     "iAutoId": 6,
      
          //     "vUserId": "absjabed",
      
          //     "vTodoId": "71A0F3A1-49DD-48EB-882C-04BD1C28CF54",
      
          //     "vTodoTitle": "Add New Todo 3",
      
          //     "vTodoDescription": "New Task 6",
      
          //     "dDate": "2021-12-21T00:00:00",
      
          //     "tTime": "09:00am - 10:30pm",
      
          //     "vLocation": "Dhaka, BD",
      
          //     "tNotifyTime": "30 minutes",
      
          //     "vColorLabel": "Violate#818af9",
      
          //     "bIsDone": false,
      
          //     "bIsDeleted": false,
      
          //     "dDateOfEntry": "2021-01-28T16:27:54.167"
      
          //   }
      ]

    }
    

    navigateBack = () =>{
        this.props.navigation.goBack();
    }

    componentDidMount = () =>{
        const userRcvd = this.props.route.params;

        this.setState({refreshing: true, userInfo: userRcvd},()=>{
            this.loadUserTodos();
        })

        handleAndroidBackButton(this.navigateBack);
    }

    handleTaskDelete=(obj)=>{
      var deleteReqObj ={
        "vUserId": this.state.userInfo.vUserId,
        "vTodoId": obj.vTodoId
      }
      Alert.alert(
        'Delete Task!',
        'This task already done. Do you wanna Delete it Now?',
        [
          {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
          {text: 'YES', onPress: () => this.setState({refreshing: true},()=>{

            post('/DeleteTodo', deleteReqObj)
            .then(response => {
              
              var responseData = response.data;

                if(responseData.deletedStatus.isSucceeed){
                    Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: responseData.deletedStatus.vMessage,
                        visibilityTime: 1000,
                        })
                        this.loadUserTodos();
                }else{
                  this.setState({refreshing: false}, ()=>{
                    Toast.show({
                        type: 'error',
                        text1: 'Something wrong!',
                        text2: errorMessage
                        })
                }); 
                }
    
            })
            .catch(errorMessage => {   
                this.setState({refreshing: false}, ()=>{
                    Toast.show({
                        type: 'error',
                        text1: 'Something wrong!',
                        text2: errorMessage
                        })
                }); 
            });
          })},
        ]
      );
    }

    handleTaskDone=(obj)=>{
      var doneReqObj ={
        "vUserId": this.state.userInfo.vUserId,
        "vTodoId": obj.vTodoId
      }
      Alert.alert(
        'Task Done!',
        'You want to mark this task as Done?',
        [
          {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
          {text: 'YES', onPress: () => this.setState({refreshing: true},()=>{

            post('/DoneTodo', doneReqObj)
            .then(response => {
              
              var responseData = response.data;

                if(responseData.doneStatus.isSucceeed){
                    Toast.show({
                        type: 'success',
                        position: 'bottom',
                        text1: responseData.doneStatus.vMessage,
                        visibilityTime: 1000,
                        })
                        this.loadUserTodos();
                }else{
                  this.setState({refreshing: false}, ()=>{
                    Toast.show({
                        type: 'error',
                        text1: 'Something wrong!',
                        text2: errorMessage
                        })
                }); 
                }
    
            })
            .catch(errorMessage => {   
                this.setState({refreshing: false}, ()=>{
                    Toast.show({
                        type: 'error',
                        text1: 'Something wrong!',
                        text2: errorMessage
                        })
                }); 
            });
          })},
        ]
      );
    }

    loadUserTodos=()=>{
        const userObj = {
          "VUserId": this.state.userInfo.vUserId
        }

        post('/UserTodos', userObj)
              .then(response => {
                
                var responseData = response.data;

                  this.setState({refreshing: false, PreData: responseData}, ()=>{
                  if(responseData.length > 0){
                      Toast.show({
                          type: 'success',
                          position: 'bottom',
                          text1: 'All ToDos loaded from server!.',
                          visibilityTime: 1000,
                          })

                          var processedData = jsonGroupByFunc(this.state.PreData, 'dDate');

                          this.setState({SectionData: processedData});
                  }else{
                      Toast.show({
                          type: 'info',
                          position: 'bottom',
                          text1: 'You dont have any task yet!.',
                          visibilityTime: 1000,
                          })
                  }
                  });
      
              })
              .catch(errorMessage => {   
                  this.setState({refreshing: false}, ()=>{
                      Toast.show({
                          type: 'error',
                          text1: 'Something wrong!',
                          text2: errorMessage
                          })
                  }); 
              });
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
                                this.loadUserTodos();
                              // setTimeout(()=>{
                              //   this.setState({refreshing: false})
                              // },1500)
                            })} />}
                            keyExtractor={(item, index) => item.iAutoId + index}
                            renderItem={({ item }) => <Item itemObj={item} navigation={this.props.navigation} doneEvent={this.handleTaskDone} deleteEvent={this.handleTaskDelete} />}
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
