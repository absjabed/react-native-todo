import React from 'react';
import {Text, StyleSheet} from 'react-native';

/**Custom TextBox */
const RNText = (props) => {
  return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: '#c6c6c7',//'#111825',
    fontSize: 25,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});

export default RNText;