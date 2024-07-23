import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../Utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import CustomHeader from '../../CustomHeader/CustomeHeader';
import CustomStatusBar from '../../Utils/CustomStatusBar';
import {useNavigation} from '@react-navigation/native';

const Contact = () => {
  let navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1}}>
      <CustomStatusBar color={Colors.secondaryClr} />
      <CustomHeader
        title={'Contact'}
        onPressMenu={() => navigation.openDrawer()}
      />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          {/* <Image
            source={{uri: 'https://via.placeholder.com/150'}} // Replace with your logo URL or local path
            style={styles.logo}
            /> */}
            <MaterialIcons name="connect-without-contact" size={moderateScale(70)} color="white" />
        </View>
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Icon name="envelope" size={24} color="#000" />
            <Text style={styles.contactText}>contact@company.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="phone" size={24} color="#000" />
            <Text style={styles.contactText}>+1 234 567 890</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="building" size={24} color="#000" />
            <Text style={styles.contactText}>Company Name Inc.</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.secondaryClr,
  },
  logoContainer: {
    marginBottom: 30,
    borderRadius: 100, // Half of the image size for a perfect circle
    overflow: 'hidden',
    // borderWidth:1,
    width:moderateScale(150),
    height:moderateScale(150),
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.primaryClr
  },
  logo: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: 75,
  },
  contactInfo: {
    marginTop: 20,
    width: '100%',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 18,
    color: Colors.black,
  },
});

export default Contact;
