import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {moderateScale} from 'react-native-size-matters';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Notifications from '../HomeStack/Notificatons/Notifications';
import Dialer from '../HomeStack/Home/Dialer';
import Profile from '../HomeStack/Home/Profile';
import Transfer from '../HomeStack/Home/Transfer';
import CallLogs from '../HomeStack/Home/CallLogs';
import Contact from '../HomeStack/Home/Contact';
import TransferHistory from '../HomeStack/Home/TransferHistory';
import NotificationDetail from '../HomeStack/Notificatons/NotificationDetail';



const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator options={{headerShown: false}}>
      <Stack.Screen
        name="Dialer"
        component={Dialer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CallLogs"
        component={CallLogs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Transfer"
        component={Transfer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TransferHistory"
        component={TransferHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NotificationDetail"
        component={NotificationDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const Notification = () => {
  return (
    <Stack.Navigator options={{headerShown: false}}>
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
