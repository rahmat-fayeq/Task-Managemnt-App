import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from '../CustomButton';
import {setAge, setName, increaseAge} from './Redux/actions';

const Home = ({navigation}) => {
  const {name, age} = useSelector(state => state.useReducer);
  const dispatch = useDispatch();

  console.log(name, age);

  const RemoveData = async () => {
    try {
      dispatch(setName(''));
      dispatch(setAge(0));
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Name: '{name}'</Text>
      <Text style={styles.text}>Age: '{age}'</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={value => dispatch(setName(value))}
      />

      <CustomButton title="Remove" color="red" onPressFunction={RemoveData} />
      <CustomButton
        title="IncreaseAge"
        color="green"
        onPressFunction={() => dispatch(increaseAge())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10,
    color: 'black',
  },
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#ffffff',
    width: 250,
    borderRadius: 5,
    fontSize: 24,
    marginBottom: 10,
  },
});

export default Home;
