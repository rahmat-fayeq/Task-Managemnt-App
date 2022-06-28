import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import CustomButton from '../CustomButton';

const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      if (user != null) {
        let userDetails = JSON.parse(user);
        setName(userDetails.name);
        setPassword(userDetails.password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (name.length === 0) {
      Alert.alert('Warning', 'Name can not be empty.');
    } else {
      try {
        let userName = {
          name: name,
        };
        await AsyncStorage.mergeItem('user', JSON.stringify(userName));
        ToastAndroid.showWithGravity(
          'Name updated successfully!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const RemoveData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Name: '{name}'</Text>
      <Text style={styles.text}>Password: '{password}'</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={value => setName(value)}
      />
      <CustomButton title="Update" color="blue" onPressFunction={updateData} />

      <CustomButton title="Delete" color="red" onPressFunction={RemoveData} />
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
