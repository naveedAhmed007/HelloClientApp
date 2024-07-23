// components/CustomDrawerContent.js
import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../Utils/Colors';
import images from '../Utils/images';
import {CustomFonts} from '../Utils/CustomFonts';
import {useDispatch} from 'react-redux';
import {setLogin} from '../Redux/AuthReducer/authSlice';

function CustomDrawerContent(props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // alert('asdas')
    dispatch(setLogin(false));
  };
  const IconSize= moderateScale(25)
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <TouchableOpacity
          onPress={props.navigation.closeDrawer}
          style={{
            alignSelf: 'flex-end',
            marginRight: moderateScale(15),
            borderRadius: 50,
            backgroundColor: Colors.screenClr,
            marginTop: 10,
            padding: moderateScale(5),
          }}>
          <Ionicons name="close-outline" size={30} color={Colors.primaryClr} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Profile')}
          style={styles.container}>
          <View style={styles.iconContainer}>
            <AntDesign
              name="user"
              size={IconSize}
              color={Colors.primaryClr}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Dialer')}
          style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="phone-dial"
              size={IconSize}
              color={Colors.primaryClr}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Dialer</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Transfer')}
          style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="transfer"
              size={IconSize}
              color={Colors.primaryClr}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Transfer</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate('TransferHistory')}
          style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="clipboard-list-outline"
              size={IconSize}
              color={Colors.primaryClr}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Transfer History</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CallLogs')}
          style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="call-made"
              size={IconSize}
              color={Colors.primaryClr}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Call logs</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Notifications')}
          style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="bell-badge-outline"
              size={IconSize}
              color={Colors.primaryClr}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Notifications</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Contact')}
          style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="contacts-outline"
              size={IconSize}
              color={Colors.primaryClr}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Contact</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.drawerContentBottom}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          style={[styles.container, {backgroundColor: 'transparent'}]}>
          <View style={styles.roundIcon}>
            <Icon name="question" size={24} color={Colors.primaryClr} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, {color: '#808080'}]}>
              Help & Support
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Login')}
          style={[styles.container, {backgroundColor: 'transparent'}]}>
          <View style={styles.roundIcon}>
            <Ionicons
              name="settings-sharp"
              size={20}
              color={Colors.primaryClr}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, {color: '#808080'}]}>
              Settings & Privacy
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{borderWidth: 0.2, borderColor: '#808080'}}></View>
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={[styles.container, {backgroundColor: 'transparent'}]}>
          <View
            style={[
              styles.roundIcon,
              {backgroundColor: 'transparent', transform: [{rotate: '90deg'}]},
            ]}>
            <AntDesign name="login" size={20} color={Colors.secondaryClr} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text, {color: Colors.secondaryClr}]}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    // borderWidth:1
    // overflow:'hidden'
    // backgroundColor: 'red',
  },
  drawerContentBottom: {
    // borderWidth: 1,
    justifyContent: 'flex-end',
    height: moderateScale(300),
    // overflow:'hidden',
    justifyContent: 'flex-end',
    paddingHorizontal: moderateScale(5),
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: CustomFonts.Bold,
    color: Colors.black,
    // marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScale(50),
    backgroundColor: Colors.screenClr, // Adjust background color as needed
    marginHorizontal: moderateScale(10),
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 1,
    marginBottom: 10,
  },
  iconContainer: {
    width: 50,
    height: '100%',
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    // paddingLeft: 0,
  },
  text: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.black,
  },
  roundIcon: {
    marginRight: moderateScale(15),
    borderRadius: 50,
    backgroundColor: Colors.screenClr,
    width: moderateScale(30),
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft:moderateScale(8)
  },
});

export default CustomDrawerContent;
