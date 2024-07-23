import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Assuming you're using FontAwesome for icons
import Icon from 'react-native-vector-icons/AntDesign'; // Assuming you're using FontAwesome for icons
import images from '../Utils/images';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../Utils/Colors';
import CustomStatusBar from '../Utils/CustomStatusBar';

const CustomHeader = ({onPressMenu, title}) => {
  return title !== 'Home' ? (
    <View
      style={[
        styles.container,
        {height: moderateScale(50),},
      ]}>
      <View style={styles.center}>
        <TouchableOpacity
          onPress={onPressMenu}
          style={[styles.iconContainer, {}]}>
          <Image
            source={images.menu}
            style={{width: moderateScale(25), height: moderateScale(20)}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.Titile}>{title}</Text>
        </View>
      </View>
      {/* <TouchableOpacity style={styles.iconContainer}> */}
      {/* <Icon name="bell" size={24} color="white" /> */}
      {/* </TouchableOpacity> */}
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.center}>
        <TouchableOpacity onPress={onPressMenu} style={styles.iconContainer}>
          <Image
            source={images.menu}
            style={{width: moderateScale(25), height: moderateScale(20)}}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.Titile}>{title}</Text>
        </View>
      </View>
      {/* <TouchableOpacity style={styles.iconContainer}>
        <Icon name="bells" size={24} color="white" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.primaryClr,
    height: moderateScale(60),
    width: '100%',
    paddingHorizontal: moderateScale(5),
  },
  iconContainer: {
    padding: 10,
  },
  titleContainer: {
    // Add styles for the title container if needed
    marginLeft: moderateScale(10),
    marginBottom: Platform.OS === 'ios' ? 0 : moderateScale(2),
  },
  Titile: {
    fontSize: moderateScale(20),
    // fontWeight: 'bold',
    color: Colors.white,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomHeader;
