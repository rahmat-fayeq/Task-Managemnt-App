import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotification from 'react-native-push-notification';

const Splash = ({navigation}) => {
  useEffect(() => {
    createChannels();
    setTimeout(() => {
      navigation.replace('My Tasks');
    }, 1000);
  }, []);

  const onMoveHandle = () => {
    navigation.navigate('My Tasks');
  };

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  return (
    <View style={styles.body}>
      <Image style={styles.logo} source={require('../../../assets/logo.jpg')} />
      <Text style={styles.text}>Rahmat To-Do App</Text>
      <View style={styles.icon}>
        <FontAwesome5
          name="arrow-right"
          size={25}
          color="white"
          onPress={onMoveHandle}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    with: '100%',
    height: '100%',
    backgroundColor: '#0080ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 20,
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: 'silver',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
});
export default Splash;
