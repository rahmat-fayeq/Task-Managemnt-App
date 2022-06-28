import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const CustomButton = props => {
  return (
    <Pressable
      onPress={props.onPressFunction}
      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      android_ripple={{color: '#00f'}}
      style={({pressed}) => [
        {backgroundColor: pressed ? 'green' : props.color},
        styles.button,
      ]}>
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    width: 150,
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
  },
});

export default CustomButton;
