import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

/**Custom Picker */
const RNPicker = (props) => {
  return (
    <View
      style={{
        marginTop: 10,
        borderBottomColor: '#f2f2f5',
        borderBottomWidth: 1,
      }}>
      <Text style={{fontSize:12, fontWeight:'bold', color:'#c3c3c5', letterSpacing: .3}}>{props.labelName}</Text>
      <Picker
          mode={"dropdown"}
          selectedValue={props.selectedValue}
          style={{...props.style /*, borderColor:'red', borderWidth:2*/}}
          onValueChange={props.onValueChange}>
          {
              props.pickerData.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)
          }
      </Picker>
    </View>
  );
};

export default RNPicker;