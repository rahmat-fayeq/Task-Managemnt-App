import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
const Header = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>React Native Project</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default Header;
