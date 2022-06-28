import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Alert} from 'react-native';
import CustomButton from '../CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {setName, setAge} from './Redux/actions';

const Login = ({navigation}) => {
  const {name, age} = useSelector(state => state.useReducer);
  const dispatch = useDispatch();

  console.log(name, age);

  const setData = async () => {
    if (name.length === 0) {
      Alert.alert(
        'Warning',
        'Please Enter you name',
        [{text: 'OK'}, {text: 'Cancel'}],
        {
          cancelable: true,
        },
      );
    } else {
      try {
        dispatch(setName(name));
        dispatch(setAge(age));
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={require('../../../assets/logo.jpg')} />
      <Text style={styles.text}>Redux State Management</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={value => dispatch(setName(value))}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter you Age"
        secureTextEntry={false}
        onChangeText={value => dispatch(setAge(value))}
      />
      <CustomButton color="orange" title="Login" onPressFunction={setData} />
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    with: '100%',
    height: '100%',
    backgroundColor: '#0080ff',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    margin: 20,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 80,
  },
  input: {
    backgroundColor: 'white',
    width: 300,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center',
  },
});
export default Login;
