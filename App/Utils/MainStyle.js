import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from './Colors';
export default MainStyle = StyleSheet.create({
  simpleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtClr: {
    color: Colors.txtClr,
  },
  simpleInputContainer: {
    width: '100%',
  },
  withIconInputContainer: {
    flexDirection: 'row',
    height: moderateScale(55),
    width: '100%',
    backgroundColor: 'white',
    borderRadius: moderateScale(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    backgroundColor: 'white',
    paddingHorizontal: moderateScale(10),
    marginBottom: moderateScale(10),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  withIconInput: {
    fontSize: moderateScale(14),
    width: '93%',
    
  },
  inputStyle: {
    width: '100%',
    height: moderateScale(55),
    borderRadius: moderateScale(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
    backgroundColor: 'white',
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(10),
    marginBottom: moderateScale(10),
    
  },
  ScreenClr: {
    backgroundColor: Colors.screenClr,
  },
  Button: {
    height: moderateScale(50),
    backgroundColor: Colors.primaryClr,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 6,
  },
  ScreenContainer: {
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: moderateScale(-10),
    backgroundColor: Colors.screenClr,
  },
});
