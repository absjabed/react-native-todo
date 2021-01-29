import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../styles/colors'

const RNButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: COLORS.grenish,
    color: '#ffffff',
    padding: 10,
    marginTop: 25,
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

export default RNButton;