import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TextInput, Alert} from 'react-native';
import CustomButton from '../CustomButton';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'Documents',
  },
  () => {
    console.warn('DB Connected !');
  },
  error => {
    console.warn(error);
  },
);

const Login = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    createTable();
    getData();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS' +
          'Users' +
          '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Password TEXT)',
      );
    });
  };

  const getData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Users', [], (tx, results) => {
          var length = results.rows.length;
          if (length > 0) {
            navigation.navigate('Home');
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        await db.transaction(async tx => {
          // await tx.executeSql(
          //     "INSERT INTO Users(Name,Password) VALUES('"+name+"',"+password+")"
          // );
          await tx.executeSql('INSERT INTO Users(Name,Password) VALUES(?,?)', [
            name,
            password,
          ]);
        });
        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={require('../../../assets/logo.jpg')} />
      <Text style={styles.text}>SQLite Storage</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={value => setName(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={value => setPassword(value)}
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
