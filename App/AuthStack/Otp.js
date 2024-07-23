import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale} from 'react-native-size-matters';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomHeader from '../CustomHeader/CustomeHeader';
import CustomStatusBar from '../Utils/CustomStatusBar';
import {Colors} from '../Utils/Colors';
import {CountryPicker} from 'react-native-country-codes-picker';
import OTPInput from './OTPInput';

function Otp() {
  let navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('+291'); // default to US country code
  const [isPickerVisible, setPickerVisible] = useState(false);
  const handleDial = () => {
    alert(countryCode + phoneNumber);
  };
  const handleDrawer = () => {
    navigation.openDrawer();
  };
  const handleSubmit = otp => {
    alert(`Entered OTP is: ${otp}`);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        bounces={false}
        contentContainerStyle={styles.ScrollStyle}
        keyboardShouldPersistTaps="handled">
        <CustomStatusBar color={Colors.secondaryClr} />
        {/* <Text style={styles.heading}>OTP</Text> */}
        <OTPInput length={4} onSubmit={handleSubmit} />
        {/* <TouchableOpacity onPress={() => handleDial()} style={styles.LoginBtn}>
           <Text style={styles.LoginBtnTxt}>Login</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.LoginBtnTxt}>Back to Login</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d1d1',
    paddingTop: 50,
    // paddingHorizontal: 20,
  },
  ScrollStyle: {
    flexGrow: 1,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: moderateScale(50),
  },
  heading: {
    fontSize: moderateScale(28),
    color: Colors.black,
    fontWeight: '600',
    alignSelf: 'center',
    marginVertical: 30,
  },
  LoginBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.primaryClr,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  LoginBtnTxt: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.black,
    marginBottom: moderateScale(30),
    alignSelf: 'center',
  },

  dialerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  countryCodeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#156082',
    borderRadius: 5,
  },
  countryCodeText: {
    color: '#fff',
    fontSize: 18,
  },
  phoneNumberInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: moderateScale(18),
  },
  dialPadContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
