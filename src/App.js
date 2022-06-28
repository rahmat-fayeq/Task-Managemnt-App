import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Splash from './components/ToDoScreens/Splash';
import ToDo from './components/ToDoScreens/ToDo';
import Done from './components/ToDoScreens/Done';
import Camera from './components/ToDoScreens/Camera';
import Task from './components/ToDoScreens/Task';
import {Provider} from 'react-redux';
import {Store} from './components/ToDoScreens/Redux/store';

const Tab = createBottomTabNavigator();
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name == 'To-Do') {
            iconName = 'clipboard-list';
            size = focused ? 25 : 20;
          } else if (route.name == 'Done') {
            iconName = 'clipboard-check';
            size = focused ? 25 : 20;
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: '#0080ff',
        tabBarInactiveTintColor: '#777777',
        tabBarLabelStyle: [
          {
            fontSize: 15,
            fontWeight: '700',
          },
        ],
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}>
      <Tab.Screen
        name="To-Do"
        component={ToDo}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Done" component={Done} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Splash">
          <RootStack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <RootStack.Screen name="My Tasks" component={HomeTabs} />
          <RootStack.Screen name="Task" component={Task} />
          <RootStack.Screen name="Camera" component={Camera} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
