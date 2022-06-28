import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Alert,
  ToastAndroid,
  Modal,
} from 'react-native';
import CustomButton from './components/CustomButton';
import Header from './components/Header';

const App = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const onSubmitHandler = () => {
    if (name.length > 3) {
      setSubmitted(!submitted);
    } else {
      setShowWarning(true);
      // Alert.alert(
      //   'Warning',
      //   'The message must be more than 3 characters',
      //   [
      //     {
      //       text: 'Do not show me again',
      //       onPress: () => console.warn('Do not show me again pressed!'),
      //     },
      //     {text: 'Cancel', onPress: () => console.warn('Cancel pressed!')},
      //     {text: 'OK', onPress: () => console.warn('OK pressed!')},
      //   ],
      //   {cancelable: true, onDismiss: () => console.warn('Dismissed clicked!')},
      // );
      // ToastAndroid.show(
      //   'the message must be more than 3 characters',
      //   ToastAndroid.SHORT,
      //   ToastAndroid.CENTER,
      // );
    }
  };

  return (
    <View style={styles.body}>
      <Modal
        visible={showWarning}
        onRequestClose={() => setShowWarning(false)}
        transparent
        animationType="fade">
        <View style={styles.centered_view}>
          <View style={styles.warning_modal}>
            <View style={styles.warning_title}>
              <Text style={styles.text}>Warning</Text>
            </View>
            <View style={styles.warning_body}>
              <Text style={styles.text}>
                The message must be more than 3 characters
              </Text>
            </View>
            <Pressable
              onPress={() => setShowWarning(false)}
              android_ripple={{color: 'green'}}
              style={styles.warning_button}>
              <Text style={styles.text}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Header />
      <Text style={styles.text}>Please write your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g Ahmad"
        onChangeText={value => setName(value)}
        keyboardType="default"
        maxLength={10}
        editable={true}
      />
      {/* <Button
        title={submitted ? 'Submit' : 'Clear'}
        onPress={onSubmitHandler}
        color="#787888"
      /> */}
      {/* <TouchableOpacity
        onPress={onSubmitHandler}
        style={styles.button}
        activeOpacity={0.5}>
        <Text style={styles.text}>{submitted ? 'Clear' : 'Submit'}</Text>
      </TouchableOpacity> */}
      <CustomButton
        onPressFunction={onSubmitHandler}
        title={submitted ? 'Clear' : 'Submit'}
      />
      {submitted && (
        <Text style={styles.text}>Your registered as : {name} </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    width: 200,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  button: {
    width: 150,
    alignItems: 'center',
  },
  centered_view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000',
  },
  warning_title: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  warning_body: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warning_button: {
    backgroundColor: 'lightgreen',
    width: 100,
    marginLeft: 99,
    borderRadius: 7,
  },
});

export default App;
