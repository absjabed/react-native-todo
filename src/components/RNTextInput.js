import React from 'react';
import {View, TextInput, Text} from 'react-native';

const RNTextInput = (props) => {
  return (
    <View
      style={{
        marginTop: 10,
        //borderColor: '#007FFF',
        borderBottomColor: '#f2f2f5',
        borderBottomWidth: 1,
      }}>
      <Text style={{fontSize:12, fontWeight:'bold', color:'#c3c3c5'}}>{props.labelName}</Text>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        placeholderTextColor="#007FFF"
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
        returnKeyType={props.returnKeyType}
        numberOfLines={props.numberOfLines}
        multiline={props.multiline}
        onSubmitEditing={props.onSubmitEditing}
        style={props.style}
        blurOnSubmit={false}
        value={props.value}
      />
    </View>
  );
};

export default RNTextInput;