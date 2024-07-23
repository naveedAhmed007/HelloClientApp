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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../Utils/Colors';
import images from '../Utils/images';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomStatusBar from '../Utils/CustomStatusBar';
import {HomeStack, Notification} from '../AllStack/AllStack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from '../CustomDrawerContent/CustomDrawerContent';
import LinearGradient from 'react-native-linear-gradient';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.secondaryClr,
        tabBarLabelStyle: {
          fontSize: moderateScale(12),
          fontWeight: '600',
        },
        // tabBarBackground:'red'
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: [
            styles.CustomTabBarStyle,
            {
              display: getRouteName(route),
            },
          ],
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={{}}>
              <AntDesign
                name={'home'}
                size={Platform.OS == 'ios' ? 25 : 27}
                color={focused ? Colors.white : Colors.secondaryClr}
              />
            </View>
          ),
        })}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={({route}) => ({
          tabBarStyle: [
            styles.CustomTabBarStyle,
            {
              display: getRouteName(route),
            },
          ],
          tabBarLabel: 'Notification',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <AntDesign
              name={'bells'}
              size={Platform.OS == 'ios' ? 25 : 27}
              color={focused ? Colors.white : Colors.secondaryClr}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};
const HandleDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: 'white',
          borderTopRightRadius: 35,
          borderBottomRightRadius: 35,
          overflow: 'hidden',
        },
        drawerType: 'front',
        gestureEnabled: true,
        headerShown: false,
      }}
      drawerContent={props => (
        <LinearGradient
          colors={['#FFFFFF', Colors.secondaryClr, Colors.secondaryClr, Colors.primaryClr]}
          style={{flex: 1}}>
          <CustomDrawerContent {...props} />
        </LinearGradient>
      )}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="Drawer"
        component={CustomBottomTab}
      />
    </Drawer.Navigator>
  );
};

const getRouteName = route => {
  if(route?.name ==='Home'){
    return 'none'
  }
  const routeName = getFocusedRouteNameFromRoute(route);
  // console.log('routeName>>>>>>>>>>>>>>>>>>>>', routeName);
  if (
    routeName?.includes('Profile') ||
    routeName?.includes('Dialer') ||
    routeName?.includes('Notifications') ||
    routeName?.includes('Challenges') ||
    routeName?.includes('ChallengeTimeLine') ||
    routeName?.includes('CommunityScreen') ||
    routeName?.includes('MessageChatScreen') ||
    routeName?.includes('BadgeAndTrophies')
  ) {
    return 'none';
  } else {
    return 'flex';
  }
};

export default HandleDrawer;

const styles = StyleSheet.create({
  CustomTabBarStyle: {
    backgroundColor: Colors.primaryClr,
    // borderTopColor: Colors.primaryClr,
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
    height: Platform.OS === 'android' ? moderateScale(53) : moderateScale(75),
    marginTop: -10,
  },
});
