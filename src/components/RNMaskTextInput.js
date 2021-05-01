import React from 'react';
import {View, Text} from 'react-native';
import {TextInputMask} from 'react-native-masked-text'

/**Custom Masked TextBox */
const RNMaskTextInput = (props) => {
  return (
    <View
      style={{
        marginTop: 10,
        //borderColor: '#007FFF',
        borderBottomColor: '#f2f2f5',
        borderBottomWidth: 1,
      }}>
      <Text style={{fontSize:12, fontWeight:'bold', color:'#c3c3c5', letterSpacing: .3}}>{props.labelName}</Text>
      <TextInputMask
        defaultValue={props.defaultValue}
        type={props.type}
        options={props.options}
        keyboardType={props.keyboardType}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor}
        value={props.value}
        onChangeText={props.onChangeText}
        style={props.style}
        />
    </View>
  );
};

export default RNMaskTextInput;