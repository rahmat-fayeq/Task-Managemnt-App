import React from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import CustomButton from '../CustomButton';
import RNFS from 'react-native-fs';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTasks, setTaskID} from './Redux/actions';

const Camera = ({navigation, route}) => {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const {tasks} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      const filePath = data.uri;
      updatedTask(route.params.id, filePath);
      // move picture to the desired location on phone
      /* const newFilePath = RNFS.ExternalDirectoryPath + '/Test.jpg';
      RNFS.moveFile(filePath, newFilePath)
        .then(() => {
          console.log('Image moved', filePath, ' -- to -- ', newFilePath);
        })
        .catch(err => console.log(err));
      */
    } catch (error) {
      console.log(error);
    }
  };

  const updatedTask = (id, path) => {
    const index = tasks.findIndex(task => task.ID === id);

    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Image = path;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          Alert.alert('Success!', 'Task image is saved.');
          navigation.goBack();
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <View style={styles.body}>
      <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.back}
        style={styles.preview}>
        <CustomButton
          title="Capture"
          color="#1eb900"
          onPressFunction={() => captureHandle()}
        />
      </RNCamera>
    </View>
  );
};

export default Camera;
const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
