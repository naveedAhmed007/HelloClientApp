import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "../Utils/Colors";
import { useDispatch } from "react-redux";
import { setFromOtpScreen } from "../Redux/AuthReducer/authSlice";

const OTPInput = ({ length, onSubmit, loading, resend }) => {
  let dispatch = useDispatch()
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChangeText = (text, index) => {
    dispatch(setFromOtpScreen(true))
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Focus next input
    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
    // If all inputs are filled, submit the OTP
    // if (newOtp.every(item => item !== '')) {
    //   onSubmit(newOtp.join(''));
    // }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter OTP</Text>
      <View style={styles.otpContainer}>
        {Array(length)
          .fill()
          .map((_, index) => (
            <TextInput
              key={index}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              ref={(ref) => (inputs.current[index] = ref)}
            />
          ))}
      </View>
      <TouchableOpacity
        onPress={() => onSubmit(otp.join(""))}
        style={styles.LoginBtn}
      >
        {loading ? (
          <ActivityIndicator size={moderateScale(25)} color={Colors.white} />
        ) : (
          <Text style={styles.LoginBtnTxt}>Submit</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.infoTxt}>
        if you received any otp on you phone than please enter here
      </Text>
      {/* <TouchableOpacity onPress={() => resend()}>
        <Text style={styles.infoTxt}>
          resend
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: moderateScale(24),
    marginBottom: 20,
    color: Colors.black,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    // borderBottomWidth: 2,
    // borderBottomColor: '#000',
    width: moderateScale(40),
    height: moderateScale(40),
    fontSize: moderateScale(18),
    textAlign: "center",
    // borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    margin: 5,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    marginHorizontal: moderateScale(5),
    elevation: 3,
    color: Colors.black,
  },
  LoginBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.primaryClr,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    width: "100%",
  },
  LoginBtnTxt: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: Colors.white,
  },
  infoTxt: {
    fontSize: moderateScale(12),
    fontWeight: "500",
    color: "grey",
    marginTop: 10,
  },
});

export default OTPInput;
