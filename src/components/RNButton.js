import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import {COLORS} from '../styles/colors'

/**Custom Button */
export const RNButton = (props) => {
  return (
    <Pressable
      style={{...styles.button, ...props.style}}
      onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};

/**Custom Branded Button */
export const BrandButton = (props) => {
  return (
    <Pressable
      style={{...styles.button, ...props.style}}
      onPress={props.customClick}>
      <View style={styles.brandViewStyle}>
        <Icon style={{position:'absolute', left:-50}} name={props.iconName} size={props.iconSize} color={props.iconColor} />
        <Text style={styles.brandButtonText}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  brandViewStyle:{
    flex:1,
    flexDirection:'row'
  },
  brandButtonText: {
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlignVertical:'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.grenish,
    color: '#ffffff',
    padding: 10,
    height:50,
    borderRadius: 8
  },
  text: {
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlignVertical:'center'
  },
});

//export default RNButton;