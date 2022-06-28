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
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'Documents',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const Home = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM Users', [], (tx, results) => {
          var length = results.rows.length;
          if (length > 0) {
            var userName = results.rows.item(0).Name;
            var userPass = results.rows.item(0).Password;
            setName(userName);
            setPassword(userPass);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    if (name.length === 0) {
      Alert.alert('Warning', 'Name can not be empty.');
    } else {
      try {
        db.transaction(tx => {
          tx.executeSql(
            'Update Users SET Name=?',
            [name],
            () => {
              Alert.alert('Success!', 'Updated Successfully!');
            },
            error => {
              console.log(error);
            },
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const RemoveData = async () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Users',
          [],
          () => {
            navigation.navigate('Login');
          },
          error => {
            console.log(error);
          },
        );
      });
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
